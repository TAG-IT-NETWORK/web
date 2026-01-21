# Data Flow Diagrams

**Last Updated:** January 2026 | **Version:** 2.0

Visual diagrams illustrating data flows, system architecture, and process sequences in TAG IT Network.

---

## 1. System Architecture Overview

```mermaid
flowchart TB
    subgraph Apps["Applications"]
        Mobile["ORACULAR Mobile"]
        Admin["Admin Console"]
        Partner["Partner APIs"]
    end

    subgraph Services["tagit-services"]
        Auth["Auth API"]
        Verify["Verify API"]
        Recovery["Recovery API"]
        AI["AI Orchestrator"]
    end

    subgraph L2["TAGIT L2 (OP Stack)"]
        Core["TAGITCore"]
        Access["TAGITAccess"]
        RecoveryC["TAGITRecovery"]
        Governor["TAGITGovernor"]
        Treasury["TAGITTreasury"]
        Programs["TAGITPrograms"]
    end

    subgraph External["External"]
        L1["Ethereum L1"]
        CCIP["Chainlink CCIP"]
        Private["Private Chain"]
    end

    Apps --> Services
    Services --> L2
    L2 --> L1
    L2 <--> CCIP
    L2 <--> Private
```

---

## 2. Asset Lifecycle Sequences

### 2.1 REGISTER → MINT → BIND Flow

```mermaid
sequenceDiagram
    participant M as Manufacturer
    participant C as TAGITCore
    participant A as TAGITAccess
    participant I as Indexer

    M->>A: Check CAP_MINT badge
    A-->>M: ✅ Authorized
    
    M->>C: mint(metadata)
    C->>C: Validate metadata
    C->>C: Create NFT (MINTED)
    C->>I: emit AssetMinted
    C-->>M: tokenId

    M->>A: Check CAP_BIND badge
    A-->>M: ✅ Authorized
    
    M->>C: bindTag(tokenId, tagHash)
    C->>C: Verify unique tag
    C->>C: State: MINTED → BOUND
    C->>I: emit TagBound
    C-->>M: success
```

### 2.2 ACTIVATE → CLAIM Flow

```mermaid
sequenceDiagram
    participant QA as QA Inspector
    participant C as TAGITCore
    participant R as Retailer
    participant B as Buyer
    participant I as Indexer

    QA->>C: activate(tokenId)
    C->>C: State: BOUND → ACTIVATED
    C->>I: emit StateChanged
    C-->>QA: success

    Note over R,B: Point of Sale
    
    R->>C: verify(tokenId, signals)
    C-->>R: VerifyResult(OK)
    
    B->>B: Connect wallet
    R->>C: claim(tokenId, buyerWallet)
    C->>C: State: ACTIVATED → CLAIMED
    C->>C: Transfer ownership
    C->>I: emit StateChanged
    C-->>R: success
```

---

## 3. Verification Flow (Multi-Signal)

```mermaid
flowchart TD
    Start["User Scans NFC"] --> Read["Read Tag UID"]
    Read --> Challenge["Generate Challenge"]
    Challenge --> Sign["Chip Signs Challenge"]
    Sign --> Validate["Validate Signature"]
    
    Validate --> S1{"Signal 1:\nTag UID Match?"}
    S1 -->|No| Fail["VERIFICATION FAILED"]
    S1 -->|Yes| S2{"Signal 2:\nOwner Check?"}
    
    S2 -->|No| Fail
    S2 -->|Yes| S3{"Signal 3:\nValid State?"}
    
    S3 -->|No| Fail
    S3 -->|Yes| S4{"Signal 4:\nContext OK?"}
    
    S4 -->|No| Fail
    S4 -->|Yes| S5{"Signal 5:\nAI Score OK?"}
    
    S5 -->|No| Fail
    S5 -->|Yes| Pass["✅ VERIFIED"]
    
    Fail --> Alert["Log + Alert"]
```

---

## 4. Recovery Flow (AIRP)

```mermaid
sequenceDiagram
    participant O as Owner
    participant R as TAGITRecovery
    participant G as TAGITGovernor
    participant A as TAGITAccess
    participant I as Indexer

    O->>R: reportLost(tokenId, evidence)
    R->>R: State: CLAIMED → FLAGGED
    R->>I: emit AssetFlagged
    
    Note over R: Quarantine Period (48h)
    
    R->>R: quarantine(tokenId)
    R->>R: State: FLAGGED → UNDER_RECOVERY
    
    Note over G: Investigation Phase
    
    G->>A: Check CAP_RECOVERY_APPROVE
    loop Multi-party Review
        G->>G: Collect votes
    end
    
    G->>R: resolve(tokenId, RETURN_TO_OWNER)
    R->>R: State: UNDER_RECOVERY → CLAIMED
    R->>I: emit RecoveryResolved
```

---

## 5. Cross-Chain Message Flow (CCIP)

```mermaid
flowchart LR
    subgraph L2["TAGIT L2"]
        Core["TAGITCore"]
        Bridge["Bridge Adapter"]
    end
    
    subgraph CCIP["Chainlink CCIP"]
        Router["CCIP Router"]
        DON["DON Network"]
    end
    
    subgraph Dest["Destination Chain"]
        Receiver["CCIP Receiver"]
        Mirror["Mirror Contract"]
    end
    
    Core -->|1. sendCrossChain| Bridge
    Bridge -->|2. ccipSend| Router
    Router -->|3. Relay| DON
    DON -->|4. Deliver| Receiver
    Receiver -->|5. Process| Mirror
```

---

## 6. Contract Relationship Diagram

```mermaid
erDiagram
    TAGITCore ||--o{ Asset : manages
    TAGITCore }|--|| TAGITAccess : uses
    TAGITCore }|--|| LifecycleLib : uses
    
    TAGITAccess ||--o{ IdentityBadge : issues
    TAGITAccess ||--o{ CapabilityBadge : issues
    
    TAGITRecovery }|--|| TAGITCore : modifies
    TAGITRecovery }|--|| TAGITAccess : checks
    
    TAGITGovernor }|--|| TAGITTreasury : controls
    TAGITGovernor }|--|| TAGITAccess : checks
    
    TAGITPrograms }|--|| TAGITCore : reads
    TAGITPrograms }|--|| TAGITTreasury : withdraws
    
    Asset {
        uint256 tokenId
        bytes32 tagHash
        uint8 state
        address owner
    }
    
    IdentityBadge {
        uint256 badgeId
        address holder
        bool soulbound
    }
    
    CapabilityBadge {
        uint256 capId
        address holder
        uint256 balance
    }
```

---

## 7. Deployment Pipeline Flow

```mermaid
flowchart LR
    subgraph Dev["Development"]
        Code["Write Code"]
        Test["Unit Tests"]
        Lint["Slither"]
    end
    
    subgraph CI["CI Pipeline"]
        Build["Build"]
        Coverage["Coverage"]
        Security["Security Scan"]
    end
    
    subgraph Deploy["Deployment"]
        Local["Local (Anvil)"]
        DevNet["Dev (Sepolia)"]
        Stage["Stage"]
        Prod["Prod (Mainnet)"]
    end
    
    Code --> Test --> Lint
    Lint --> Build --> Coverage --> Security
    Security --> Local --> DevNet --> Stage --> Prod
    
    Stage -->|Audit Required| Audit["External Audit"]
    Audit --> Prod
```

---

## 8. Token Flow Diagram

```mermaid
flowchart TB
    subgraph GENESIS["🎰 GENESIS: 7,777,777,333 TAGIT"]
        ECO["🌱 Ecosystem\n35% · 2.72B"]
        PRE["💰 Presale\n20% · 1.56B"]
        TREAS["🏦 Treasury\n15% · 1.17B"]
        DAO["🏛️ DAO\n15% · 1.17B"]
        DEV["⚙️ Dev\n10% · 778M"]
        TEAM["👥 Team\n5% · 389M"]
    end

    subgraph EMISSIONS["📈 ANNUAL: +3.33%"]
        STAKE_R["Staking 40%"]
        GRANTS["Grants 30%"]
        TREAS_E["Treasury 20%"]
        DEV_E["Dev 10%"]
    end

    subgraph BURNS["🔥 BURNS: 33.3%"]
        FEES["Protocol Fees"]
        BURNED["Forever Gone"]
    end

    subgraph UTILITY["⚡ UTILITY"]
        GAS["Gas & Fees"]
        STAKE["Staking"]
        ACCESS["Access"]
    end

    GENESIS --> UTILITY
    EMISSIONS --> UTILITY
    UTILITY --> FEES
    FEES --> BURNED
```

---

## How to Use These Diagrams

1. **In Documentation**: Diagrams render automatically with Mermaid.js integration
2. **Interactive Editing**: Copy code to [mermaid.live](https://mermaid.live) for modifications
3. **Export**: Generate PNG/SVG from mermaid.live for presentations
4. **Embedding**: Use the raw code blocks in any Mermaid-compatible platform

---

## Next Steps

- [System Overview](/docs/architecture/system-overview) — Architecture details
- [Asset Lifecycle](/docs/architecture/asset-lifecycle) — State transitions
- [Smart Contracts](/docs/smart-contracts/overview) — Contract reference
