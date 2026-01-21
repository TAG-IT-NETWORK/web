# BIDGES Access Control System

**Last Updated:** January 2026 | **Version:** 2.0 | **Status:** NIST CSF 2.0 Compliant

BIDGES (Badge Identity & Delegation for Gated Execution System) is TAG IT Network's access control layer combining identity verification with capability-based permissions.

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

**Two-Token Model:**
- **Identity Badges** — WHO you are (soulbound, non-transferable)
- **Capability Badges** — WHAT you can do (transferable, revocable)

---

## Contract Architecture

| Contract | Standard | Purpose | Lines |
|----------|----------|---------|-------|
| **IdentityBadge.sol** | ERC-5192 | Soulbound identity tokens | ~250 |
| **CapabilityBadge.sol** | ERC-1155 | Transferable capability tokens | ~200 |
| **TAGITAccess.sol** | Facade | Unified access controller | ~210 |
| **ITAGITAccess.sol** | Interface | External integration | ~50 |

---

## Identity Badge Types

Identity badges represent verified real-world identity levels:

| Badge ID | Name | Description | Requirements |
|----------|------|-------------|--------------|
| 1 | `KYC_L1` | Basic identity verified | Email + phone |
| 2 | `KYC_L2` | Enhanced verification | Government ID |
| 3 | `KYC_L3` | Institutional/accredited | Business registration |
| 10 | `MANUFACTURER` | Verified brand/factory | Business license + audit |
| 11 | `RETAILER` | Authorized seller | Retail license |
| 20 | `GOV_MIL` | Government/military | Federal credentials |
| 21 | `LAW_ENFORCEMENT` | Police/customs | Badge verification |

### Soulbound Properties (ERC-5192)

```solidity
// Identity badges CANNOT be transferred
function transferFrom(address, address, uint256) public pure override {
    revert SoulboundToken();
}

// Check if token is locked (always true for identity)
function locked(uint256 tokenId) external pure returns (bool) {
    return true;
}
```

---

## Capability Badge Types

Capabilities grant permission to execute specific functions:

| Capability | Token ID | Function | Gas Cost |
|------------|----------|----------|----------|
| `MINTER` | `keccak256("MINTER")` | `mint()` | ~135k |
| `BINDER` | `keccak256("BINDER")` | `bindTag()` | ~191k |
| `ACTIVATOR` | `keccak256("ACTIVATOR")` | `activate()` | ~198k |
| `CLAIMER` | `keccak256("CLAIMER")` | `claim()` | ~217k |
| `FLAGGER` | `keccak256("FLAGGER")` | `flag()` | ~225k |
| `RESOLVER` | `keccak256("RESOLVER")` | `resolve()` | ~244k |
| `RECYCLER` | `keccak256("RECYCLER")` | `recycle()` | ~225k |

### Capability Properties (ERC-1155)

- **Transferable** — Can be delegated to sub-contractors
- **Revocable** — Admin can revoke at any time
- **Stackable** — Multiple capabilities per address
- **Auditable** — All grants/revokes logged on-chain

---

## Role → Capability Matrix

Standard role assignments for supply chain actors:

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

Every protected function follows this verification pattern:

```
msg.sender calls mint()
       │
       ▼
TAGITCore.requiresCapability(MINTER_CAPABILITY)
       │
       ▼
TAGITAccess.requireCapability(sender, MINTER)
       │
       ├─→ IdentityBadge.hasIdentity(sender)? ─→ ❌ Revert
       │
       └─→ CapabilityBadge.balanceOf(sender, MINTER) > 0? ─→ ❌ Revert
       │
       ▼
     ✅ Execute function
```

### Code Example

```solidity
// In TAGITCore.sol
modifier requiresCapability(bytes32 capability) {
    if (!access.hasCapability(msg.sender, capability)) {
        revert Unauthorized(msg.sender, capability);
    }
    _;
}

function mint(bytes calldata metadata) 
    external 
    requiresCapability(MINTER_CAPABILITY) 
    returns (uint256) 
{
    // ... mint logic
}
```

---

## Granting & Revoking

### Grant Capability

```solidity
// Admin grants MINTER capability to a manufacturer
access.grantCapability(
    manufacturerAddress,
    MINTER_CAPABILITY,
    1  // amount (1 = single grant)
);
```

### Revoke Capability

```solidity
// Admin revokes capability
access.revokeCapability(
    manufacturerAddress,
    MINTER_CAPABILITY
);
```

### Batch Operations

```solidity
// Grant multiple capabilities at once
access.grantCapabilities(
    manufacturerAddress,
    [MINTER_CAPABILITY, BINDER_CAPABILITY],
    [1, 1]
);
```

---

## Gas Performance

All access checks are optimized for minimal gas overhead:

| Function | Gas | Target | Status |
|----------|-----|--------|--------|
| `requireCapability()` | 9,154 | <10k | ✅ |
| `requireIdentity()` | 9,282 | <10k | ✅ |
| `hasCapability()` | 8,307 | — | ✅ |
| `hasIdentity()` | 8,359 | — | ✅ |

---

## Security Features

### NIST CSF 2.0 Compliance

| Control | Implementation | Status |
|---------|----------------|--------|
| **AC-2** Account Management | Identity badges | ✅ |
| **AC-3** Access Enforcement | Capability checks | ✅ |
| **AC-6** Least Privilege | Role-based grants | ✅ |
| **AC-7** Rate Limiting | RateLimiter contract | ✅ |
| **IR-4** Incident Response | CircuitBreaker | ✅ |
| **AU-2** Audit Events | All operations logged | ✅ |

### Circuit Breaker

Emergency pause functionality for security incidents:

```solidity
// Pause all capability checks (emergency only)
access.pause();

// Resume normal operation
access.unpause();
```

---

## Deployed Contracts

### OP Sepolia (Testnet) — NIST Verified ✅

| Contract | Address | Status |
|----------|---------|--------|
| **TAGITAccess** | `0x8611fE68f6E37238b0af84c5f2Ac2dc9012138a9` | ✅ Verified |
| **IdentityBadge** | `0x26F2E8b84664EF1ef8554e15777E8Ec6611256A6` | ✅ Verified |
| **CapabilityBadge** | `0x5e198f6Ebde4BD1e11a5566a1e81a933c40f3585` | ✅ Verified |

### OP Mainnet (Production) — Q2 2026

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

## Next Steps

- [Smart Contracts Overview](/docs/smart-contracts/overview) — Full contract architecture
- [DAO Governance](/docs/governance/dao-structure) — Multi-house voting
- [Asset Lifecycle](/docs/architecture/asset-lifecycle) — State transitions
