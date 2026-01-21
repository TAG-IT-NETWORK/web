# System Overview

**Last Updated:** January 2026 | **Version:** 2.0

TAG IT Network operates on a **hybrid public-private blockchain architecture** designed to balance transparency with data sovereignty requirements for defense and enterprise applications.

---

## The ORACULS Stack

The **ORACULS** (Open Registry for Authentic Custody & Universal Ledger System) stack is TAG IT Network's complete technology platform for product authentication.

```
┌─────────────────────────────────────────────────────────────────┐
│                        APPLICATIONS                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐     │
│  │ ORACULAR App │ │ Admin Console│ │ Partner Portal / POS │     │
│  └──────────────┘ └──────────────┘ └──────────────────────┘     │
├─────────────────────────────────────────────────────────────────┤
│              GATEWAY & API LAYER (tagit-services)               │
├─────────────────────────────────────────────────────────────────┤
│                    LEDGER LAYER                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │           TAGIT L2 (OP Stack + EigenDA)                   │  │
│  │  TAGITCore │ TAGITAccess │ TAGITRecovery                  │  │
│  │  TAGITGovernor │ TAGITTreasury │ TAGITPrograms            │  │
│  └───────────────────────────────────────────────────────────┘  │
│           │                   │                  │              │
│           ▼                   ▼                  ▼              │
│      Ethereum L1       Chainlink CCIP     Private Chain         │
│      (Settlement)        (Interop)      (Hyperledger Besu)      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Layer Responsibilities

| Layer | Components | Responsibility |
|-------|------------|----------------|
| **Applications** | ORACULAR App, Admin Console, APIs | User-facing interfaces, scan/verify UX |
| **Gateway** | tagit-services | Auth, API routing, AI orchestration |
| **Ledger (Public)** | TAGIT L2 (OP Stack) | Asset identity, verification, governance |
| **Settlement** | Ethereum L1 | Escrow, timelocks, security backstop |
| **Interop** | Chainlink CCIP | Cross-chain messaging, bridges |
| **Private Ledger** | Hyperledger Besu | Gov/mil data, PQC attestations |

---

## Asset Lifecycle (7 Functions)

Every physical product in TAG IT Network follows a deterministic lifecycle with 7 core functions:

```
     MANUFACTURING          │    CONSUMER     │     RECOVERY
─────────────────────────────┼─────────────────┼─────────────────
mint() → bindTag() → activate() → claim()
                                    │
                               flag() → resolve()
                                    │         │
                                    ▼         ▼
                               recycle() ◄────┘
```

### State Machine

```
NONE(0) → MINTED(1) → BOUND(2) → ACTIVATED(3) → CLAIMED(4)
                                                    │
                                              FLAGGED(5) → RECYCLED(6)
```

| State | Code | Description |
|-------|------|-------------|
| `NONE` | 0 | Asset not created |
| `MINTED` | 1 | NFT exists on-chain |
| `BOUND` | 2 | NFC tag cryptographically bound |
| `ACTIVATED` | 3 | QA passed, ready for sale |
| `CLAIMED` | 4 | Owned by consumer |
| `FLAGGED` | 5 | Lost/stolen/recalled |
| `RECYCLED` | 6 | End of life |

---

## Actor → Capability Matrix

Different actors in the supply chain have specific permissions:

| Actor | MINT | BIND | ACTIVATE | CLAIM | FLAG | RESOLVE | RECYCLE |
|-------|:----:|:----:|:--------:|:-----:|:----:|:-------:|:-------:|
| **Manufacturer** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Distributor** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Retailer** | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Consumer** | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Gov/Military** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Arbitrator** | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Recycler** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## Security Model — 5-Layer Defense in Depth

TAG IT implements defense-in-depth with five security layers:

```
LAYER 5: GOVERNANCE
  Multi-house DAO │ Timelocks │ Emergency Council │ Veto

LAYER 4: APPLICATION
  Rate Limiting │ Input Validation │ WAF │ DDoS Protection

LAYER 3: ACCESS CONTROL (BIDGES)
  Identity Badges │ Capability Gates │ ZK Proofs

LAYER 2: SMART CONTRACT
  Formal Verification │ Reentrancy Guards │ Pausable │ Audits

LAYER 1: CRYPTOGRAPHY
  ECDSA Signatures │ Keccak256 Hashes │ PQC Hybrid (Future)
```

---

## Multi-Signal Verification

Every verification check requires **5+ signals** to pass:

1. **Tag UID Match** — Hardware identifier matches bound hash
2. **Owner Wallet** — Current owner vs. scanner identity
3. **Lifecycle State** — Asset in valid state for operation
4. **Context Signals** — Geo/time/device plausibility
5. **AI Anomaly Score** — ML model detects fraud patterns

---

## Key Terminology

| Term | Definition |
|------|------------|
| **Digital Twin** | NFT representing a physical asset's on-chain identity |
| **ORACULAR** | Mobile/web app for scanning and verification |
| **ORACULS** | Complete technology stack (ORACULAR + L2 + Services) |
| **BIDGES** | Badge system for identity and capability management |
| **AIRP** | AI Recovery Protocol for lost/stolen asset handling |
| **PQC** | Post-Quantum Cryptography (future-proofing) |

---

## Next Steps

- [Asset Lifecycle](/docs/architecture/asset-lifecycle) — Deep dive into state transitions
- [Smart Contracts](/docs/smart-contracts/overview) — Contract architecture details
- [BIDGES System](/docs/governance/bidges-system) — Access control explained
