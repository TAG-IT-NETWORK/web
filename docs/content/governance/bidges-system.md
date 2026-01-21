# BIDGES Access Control System

**Last Updated:** January 2026 | **Version:** 2.0 | **Status:** NIST CSF 2.0 Compliant

**BIDGES** (Badge Identity & Delegation for Gated Execution System) is TAG IT Network's access control layer combining identity verification with capability-based permissions.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    TAGITAccess (Facade)                     │
├─────────────────────────────┬───────────────────────────────┤
│   IdentityBadge (WHO)       │   CapabilityBadge (WHAT)      │
│   ERC-5192 Soulbound        │   ERC-1155 Transferable       │
│   • Non-transferable        │   • Grantable/Revocable       │
│   • 1 per address           │   • Multiple per address      │
└─────────────────────────────┴───────────────────────────────┘
```

---

## Contract Architecture

| Contract | Standard | Purpose | Lines |
|----------|----------|---------|-------|
| **IdentityBadge.sol** | ERC-5192 | Soulbound identity tokens | ~250 |
| **CapabilityBadge.sol** | ERC-1155 | Transferable capability tokens | ~200 |
| **TAGITAccess.sol** | Facade | Unified access controller | ~210 |
| **ITAGITAccess.sol** | Interface | External integration | ~50 |

---

## Identity Badges (WHO)

Identity badges are **soulbound** (non-transferable) tokens that verify WHO an actor is. They're issued after KYC/verification processes.

### Badge Types

| Badge ID | Name | Description | Requirements |
|----------|------|-------------|--------------|
| 1 | `KYC_L1` | Basic identity verified | Email + phone |
| 2 | `KYC_L2` | Enhanced verification | ID document + liveness |
| 3 | `KYC_L3` | Institutional/accredited | Business registration |
| 10 | `MANUFACTURER` | Verified brand/factory | Business license + audit |
| 11 | `RETAILER` | Authorized seller | Reseller agreement |
| 20 | `GOV_MIL` | Government/military | Agency verification |
| 21 | `LAW_ENFORCEMENT` | Police/customs | Badge + department |

### Properties

- **Soulbound**: Cannot be transferred once issued
- **One per address**: Each address can hold only one identity badge
- **Upgradeable**: Can be upgraded (KYC_L1 → KYC_L2) by authorized issuers
- **Revocable**: Can be revoked for compliance violations

---

## Capability Badges (WHAT)

Capability badges are **transferable** ERC-1155 tokens that grant permission to perform specific actions in the system.

### Capability Types

| Capability | Token ID | TAGITCore Function | Gas Cost |
|------------|----------|-------------------|----------|
| `MINTER` | `keccak256("MINTER")` | `mint()` | ~135k |
| `BINDER` | `keccak256("BINDER")` | `bindTag()` | ~191k |
| `ACTIVATOR` | `keccak256("ACTIVATOR")` | `activate()` | ~198k |
| `CLAIMER` | `keccak256("CLAIMER")` | `claim()` | ~217k |
| `FLAGGER` | `keccak256("FLAGGER")` | `flag()` | ~225k |
| `RESOLVER` | `keccak256("RESOLVER")` | `resolve()` | ~244k |
| `RECYCLER` | `keccak256("RECYCLER")` | `recycle()` | ~225k |

### Properties

- **Transferable**: Can be delegated to other addresses
- **Fungible**: Multiple badges of same type have equal power
- **Balance-based**: `balanceOf(address, capabilityId) > 0` = authorized
- **Revocable**: Can be burned/revoked by admins

---

## Role → Capability Matrix

Different supply chain roles receive different capability sets:

| Role | MINT | BIND | ACTIVATE | CLAIM | FLAG | RESOLVE | RECYCLE |
|------|:----:|:----:|:--------:|:-----:|:----:|:-------:|:-------:|
| **Manufacturer** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Distributor** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Retailer** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Consumer** | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Inspector** | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Arbitrator** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Recycler** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Admin** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Access Check Flow

Every capability-gated function follows this authorization flow:

```
msg.sender calls mint()
       │
       ▼
TAGITCore.requiresCapability(MINTER_CAPABILITY)
       │
       ▼
TAGITAccess.requireCapability(sender, MINTER)
       │
       ├─→ IdentityBadge.hasIdentity(sender)? ─→ ❌ Revert: NO_IDENTITY
       │
       └─→ CapabilityBadge.balanceOf(sender, MINTER) > 0? ─→ ❌ Revert: NO_CAPABILITY
       │
       ▼
     ✅ Execute function
```

---

## Usage Examples

### Checking Access

```solidity
// Check if address has identity
bool hasId = tagitAccess.hasIdentity(userAddress);

// Check if address has specific capability
bool canMint = tagitAccess.hasCapability(userAddress, MINTER);

// Check both (recommended)
bool authorized = tagitAccess.isAuthorized(userAddress, MINTER);
```

### Granting Capabilities

```solidity
// Grant MINTER capability to a manufacturer
capabilityBadge.mint(manufacturerAddress, MINTER, 1, "");

// Grant multiple capabilities
uint256[] memory ids = [MINTER, BINDER];
uint256[] memory amounts = [1, 1];
capabilityBadge.mintBatch(manufacturerAddress, ids, amounts, "");
```

### Revoking Access

```solidity
// Revoke capability
capabilityBadge.burn(userAddress, MINTER, 1);

// Revoke identity (admin only)
identityBadge.revoke(userAddress);
```

---

## Security Features

### NIST CSF 2.0 Compliance

| Control | Implementation |
|---------|----------------|
| **AC-2** Account Management | Identity badges with KYC tiers |
| **AC-3** Access Enforcement | Capability checks on all functions |
| **AC-6** Least Privilege | Minimal capabilities per role |
| **AC-7** Rate Limiting | CircuitBreaker + RateLimiter |
| **IR-4** Incident Response | CircuitBreaker emergency pause |

### Circuit Breaker

Emergency pause mechanism for incident response:

```solidity
// Trigger circuit breaker (admin only)
tagitAccess.triggerCircuitBreaker();

// All capability checks will fail until reset
// Auto-reset after 24 hours OR manual reset by DAO
```

### Rate Limiter

Per-address rate limiting to prevent abuse:

```solidity
// Default limits
uint256 constant MINT_RATE_LIMIT = 100; // per hour
uint256 constant BIND_RATE_LIMIT = 100; // per hour
uint256 constant CLAIM_RATE_LIMIT = 50; // per hour
```

---

## Gas Performance

| Function | Gas | Target | Status |
|----------|-----|--------|--------|
| `requireCapability()` | 9,154 | <10k | ✅ |
| `requireIdentity()` | 9,282 | <10k | ✅ |
| `hasCapability()` | 8,307 | — | ✅ |
| `hasIdentity()` | 8,359 | — | ✅ |

---

## Deployed Contracts

### OP Sepolia (NIST Compliant Jan 2026) ✅

| Contract | Address | Status |
|----------|---------|--------|
| **TAGITAccess** | `0x0611FE60f6E37230bDaf04c5F2Ac2dc9012130a9` | ✅ NIST Verified |
| **IdentityBadge** | `0x26F2EBb84664EF1eF8554e15777EBEc6611256A6` | ✅ NIST Verified |
| **CapabilityBadge** | `0x5e190F6Ebde4BD1e11a5566a1e81a933cdDf3505` | ✅ NIST Verified |

### OP Mainnet (Pending Q2 2026)

| Contract | Address | Status |
|----------|---------|--------|
| TAGITAccess | — | ⬜ Post-audit |
| IdentityBadge | — | ⬜ Post-audit |
| CapabilityBadge | — | ⬜ Post-audit |

---

## Test Coverage

| Test Suite | Tests | Fuzz Runs |
|------------|-------|-----------|
| IdentityBadge.t.sol | 18 | 10,000 |
| CapabilityBadge.t.sol | 24 | 10,000 |
| TAGITAccess.t.sol | 21 | 10,000 |
| TAGITCore Integration | 9 | 70,000 |
| **Total** | **72** | **100,000** |

---

## Security Audit Results

✅ **Slither Analysis: PASSED**

- 0 Critical vulnerabilities
- 0 High severity issues  
- 0 Medium severity issues (in our code)
- All contracts follow Checks-Effects-Interactions pattern

---

## Next Steps

- [DAO Governance](/docs/governance/dao-structure) — Multi-house voting system
- [Smart Contracts](/docs/smart-contracts/access-contracts) — Full contract source
- [Integration Guide](/docs/tutorials/access-integration) — How to integrate BIDGES
