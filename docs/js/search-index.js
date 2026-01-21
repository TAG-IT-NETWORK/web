/**
 * TAG IT Network Documentation Search Index
 * Generated: 2026-01-20
 * Version: 2.0
 * 
 * This index is used by the docs search functionality.
 * Rebuild with: npm run build:search-index
 */

const docsSearchIndex = [
  // ═══════════════════════════════════════════════════════════════
  // ARCHITECTURE
  // ═══════════════════════════════════════════════════════════════
  {
    id: "arch-system-overview",
    title: "System Overview",
    description: "TAG IT Network operates on a hybrid public-private blockchain architecture designed to balance transparency with data sovereignty.",
    category: "Architecture",
    slug: "architecture/system-overview",
    url: "/docs/architecture/system-overview.html",
    keywords: ["ORACULS", "stack", "architecture", "hybrid", "blockchain", "L2", "OP Stack", "EigenDA", "Ethereum", "settlement", "CCIP", "Chainlink", "private chain", "Hyperledger Besu"],
    content: "ORACULS stack technology platform product authentication layer responsibilities applications gateway ledger settlement interop private hybrid public-private blockchain architecture transparency data sovereignty defense enterprise"
  },
  {
    id: "arch-asset-lifecycle",
    title: "Asset Lifecycle",
    description: "Every physical product follows a deterministic 7-function lifecycle: MINT, BIND, ACTIVATE, CLAIM, FLAG, RESOLVE, RECYCLE.",
    category: "Architecture",
    slug: "architecture/asset-lifecycle",
    url: "/docs/architecture/asset-lifecycle.html",
    keywords: ["lifecycle", "state machine", "mint", "bind", "activate", "claim", "flag", "resolve", "recycle", "MINTED", "BOUND", "ACTIVATED", "CLAIMED", "FLAGGED", "RECYCLED", "NFT", "digital twin"],
    content: "asset lifecycle state machine mint bindTag activate claim flag resolve recycle NONE MINTED BOUND ACTIVATED CLAIMED FLAGGED RECYCLED state transitions NFT digital twin manufacturer distributor retailer consumer QA inspector"
  },
  {
    id: "arch-bidges-system",
    title: "BIDGES Access Control System",
    description: "Badge Identity & Delegation for Gated Execution System - combining soulbound identity with transferable capabilities.",
    category: "Architecture",
    slug: "architecture/bidges-system",
    url: "/docs/architecture/bidges-system.html",
    keywords: ["BIDGES", "access control", "identity badge", "capability badge", "ERC-5192", "ERC-1155", "soulbound", "permissions", "KYC", "MANUFACTURER", "RETAILER", "GOV_MIL"],
    content: "BIDGES Badge Identity Delegation Gated Execution System access control identity badge capability badge ERC-5192 ERC-1155 soulbound transferable permissions KYC_L1 KYC_L2 KYC_L3 MANUFACTURER RETAILER GOV_MIL LAW_ENFORCEMENT MINTER BINDER ACTIVATOR CLAIMER FLAGGER RESOLVER RECYCLER"
  },
  {
    id: "arch-security-model",
    title: "Security Model",
    description: "5-layer defense-in-depth security architecture: Cryptography, Smart Contract, Access Control, Application, Governance.",
    category: "Architecture",
    slug: "architecture/security-model",
    url: "/docs/architecture/security-model.html",
    keywords: ["security", "defense in depth", "NIST", "CSF", "cryptography", "ECDSA", "AES", "PQC", "post-quantum", "audit", "Slither", "formal verification"],
    content: "security defense depth NIST CSF 2.0 cryptography ECDSA Keccak256 AES-128 CMAC post-quantum Kyber Dilithium smart contract reentrancy guards pausable audit Slither formal verification access control application rate limiting WAF DDoS governance timelock veto"
  },
  {
    id: "arch-data-flow",
    title: "Data Flow Diagrams",
    description: "Visual diagrams illustrating system architecture, sequences, and process flows with Mermaid.",
    category: "Architecture",
    slug: "architecture/data-flow-diagrams",
    url: "/docs/architecture/data-flow-diagrams.html",
    keywords: ["diagrams", "mermaid", "flowchart", "sequence", "data flow", "verification flow", "recovery flow", "CCIP", "cross-chain"],
    content: "data flow diagrams mermaid flowchart sequence architecture verification recovery CCIP cross-chain contract relationship deployment pipeline token flow visual"
  },

  // ═══════════════════════════════════════════════════════════════
  // SMART CONTRACTS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "contracts-overview",
    title: "Smart Contracts Overview",
    description: "15 contracts in four groups: Core, Token Suite, Account Abstraction, and Bridge.",
    category: "Smart Contracts",
    slug: "smart-contracts/overview",
    url: "/docs/contracts/overview.html",
    keywords: ["smart contracts", "TAGITCore", "TAGITAccess", "TAGITRecovery", "TAGITGovernor", "TAGITTreasury", "ERC-721", "ERC-20", "ERC-1155", "ERC-4337", "CCIP"],
    content: "smart contracts TAGITCore TAGITAccess TAGITRecovery TAGITGovernor TAGITTreasury TAGITPrograms TAGITToken IdentityBadge CapabilityBadge TAGITStaking TAGITVesting TAGITPaymaster TAGITAccount TAGITAccountFactory CCIPAdapter ERC-721 ERC-20 ERC-1155 ERC-4337 ERC-5192 account abstraction bridge"
  },
  {
    id: "contracts-core",
    title: "Core Contracts",
    description: "TAGITCore (asset NFT + lifecycle), TAGITAccess (BIDGES), TAGITRecovery (AIRP).",
    category: "Smart Contracts",
    slug: "smart-contracts/core-contracts",
    url: "/docs/contracts/core-contracts.html",
    keywords: ["TAGITCore", "TAGITAccess", "TAGITRecovery", "AIRP", "mint", "bindTag", "verify", "TransferGate", "quarantine"],
    content: "TAGITCore asset NFT lifecycle TAGITAccess BIDGES facade TAGITRecovery AIRP recovery mint bindTag activate claim flag resolve recycle verify VerifyResult TransferGate quarantine reportLost events AssetMinted TagBound StateChanged"
  },
  {
    id: "contracts-addresses",
    title: "Contract Addresses",
    description: "Deployed contract addresses on OP Sepolia testnet.",
    category: "Smart Contracts",
    slug: "smart-contracts/addresses",
    url: "/docs/contracts/addresses.html",
    keywords: ["addresses", "deployment", "OP Sepolia", "testnet", "mainnet", "0x88D2b62FD388", "0x8611fE68f6E37", "0x26F2E8b84664"],
    content: "contract addresses deployment OP Sepolia testnet TAGITCore 0x88D2b62FD388b2d7e3df5fc666D68Ac7c7ca02Fe TAGITAccess 0x8611fE68f6E37238b0af84c5f2Ac2dc9012138a9 IdentityBadge 0x26F2E8b84664EF1ef8554e15777E8Ec6611256A6 CapabilityBadge 0x5e198f6Ebde4BD1e11a5566a1e81a933c40f3585"
  },

  // ═══════════════════════════════════════════════════════════════
  // NFC INTEGRATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: "nfc-hardware-specs",
    title: "NFC Hardware Specifications",
    description: "Four-tier chip classification: SOVEREIGN, FORTRESS, PRESTIGE, COMMERCIAL. NTAG 424 DNA specs.",
    category: "NFC Integration",
    slug: "nfc/hardware-specs",
    url: "/docs/nfc/hardware-specs.html",
    keywords: ["NFC", "NTAG 424 DNA", "NXP", "AES-128", "SUN", "CMAC", "TagTamper", "FIPS", "EAL4", "chip", "tag", "reader"],
    content: "NFC hardware NTAG 424 DNA NXP AES-128 SUN authentication CMAC TagTamper FIPS EAL4 chip classification SOVEREIGN FORTRESS PRESTIGE COMMERCIAL tag reader ACR1252U Zebra mobile Smartrac HID Global Identiv GoToTags provisioning binding"
  },
  {
    id: "nfc-sun-auth",
    title: "SUN Authentication",
    description: "Secure Unique NFC authentication protocol with CMAC signatures.",
    category: "NFC Integration",
    slug: "nfc/sun-authentication",
    url: "/docs/nfc/sun-authentication.html",
    keywords: ["SUN", "Secure Unique NFC", "CMAC", "signature", "counter", "UID", "verification", "cryptographic"],
    content: "SUN Secure Unique NFC authentication CMAC signature counter UID verification cryptographic proof physical presence scan"
  },

  // ═══════════════════════════════════════════════════════════════
  // GOVERNANCE
  // ═══════════════════════════════════════════════════════════════
  {
    id: "gov-dao-structure",
    title: "DAO Governance Structure",
    description: "Multi-house voting: Gov/Mil 30%, Enterprise 30%, Public 20%, Dev 10%, Regulatory 10%.",
    category: "Governance",
    slug: "governance/dao-structure",
    url: "/docs/governance/dao-structure.html",
    keywords: ["DAO", "governance", "multi-house", "voting", "proposal", "timelock", "treasury", "veto", "emergency council"],
    content: "DAO governance multi-house voting Gov/Mil 30% Enterprise 30% Public 20% Developer 10% Regulatory 10% proposal timelock TAGITGovernor TAGITTreasury supermajority veto emergency council burn rate immutable"
  },
  {
    id: "gov-voting",
    title: "Multi-House Voting",
    description: "Weighted voting system preventing plutocracy through stakeholder house balancing.",
    category: "Governance",
    slug: "governance/voting",
    url: "/docs/governance/voting.html",
    keywords: ["voting", "multi-house", "weighted", "plutocracy", "stakeholder", "majority", "supermajority"],
    content: "voting multi-house weighted stakeholder house Gov/Mil Enterprise Public Developer Regulatory majority supermajority proposal execute queue"
  },

  // ═══════════════════════════════════════════════════════════════
  // TOKENOMICS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "token-tagit",
    title: "TAGIT Token",
    description: "7,777,777,333 genesis supply with 3.33% inflation and 33.3% burn rate.",
    category: "Tokenomics",
    slug: "tokenomics/tagit-token",
    url: "/docs/tokenomics/tagit-token.html",
    keywords: ["TAGIT", "token", "tokenomics", "7777777333", "magic number", "inflation", "burn", "genesis", "supply", "ERC-20", "staking", "vesting"],
    content: "TAGIT token 7,777,777,333 magic number seven sevens triple threes genesis supply 3.33% inflation 33.3% burn rate burn floor immutable ecosystem presale treasury DAO development team vesting staking utility metering gas fees"
  },
  {
    id: "token-staking",
    title: "Staking",
    description: "Stake TAGIT tokens for rewards and governance participation.",
    category: "Tokenomics",
    slug: "tokenomics/staking",
    url: "/docs/tokenomics/staking.html",
    keywords: ["staking", "rewards", "APY", "lockup", "TAGITStaking"],
    content: "staking rewards APY lockup TAGITStaking emission allocation 40% staking rewards dispute resolution service tiers validator bonds"
  },
  {
    id: "token-burns",
    title: "Burn Mechanics",
    description: "33.3% default burn with 3.33% immutable floor. Deflationary at ~$900K revenue.",
    category: "Tokenomics",
    slug: "tokenomics/burns",
    url: "/docs/tokenomics/burns.html",
    keywords: ["burn", "deflationary", "floor", "protocol fees", "TAGITBurner"],
    content: "burn mechanics deflationary 33.3% default burn 3.33% floor immutable protocol fees TAGITBurner deflation trigger revenue"
  },

  // ═══════════════════════════════════════════════════════════════
  // REFERENCE
  // ═══════════════════════════════════════════════════════════════
  {
    id: "ref-glossary",
    title: "Glossary",
    description: "Comprehensive glossary of TAG IT Network terminology.",
    category: "Reference",
    slug: "reference/glossary",
    url: "/docs/reference/glossary.html",
    keywords: ["glossary", "terms", "definitions", "acronyms", "AIRP", "BIDGES", "CCIP", "DAO", "ORACULS", "PQC", "RWA", "SUN"],
    content: "glossary terms definitions AIRP AI Recovery Protocol BIDGES Badge Identity Delegation CCIP Cross-Chain Interoperability Protocol DAO Decentralized Autonomous Organization Digital Twin ORACULS PQC Post-Quantum Cryptography RWA Real World Asset SUN Secure Unique NFC soulbound quarantine vesting"
  },

  // ═══════════════════════════════════════════════════════════════
  // GETTING STARTED
  // ═══════════════════════════════════════════════════════════════
  {
    id: "start-intro",
    title: "Introduction",
    description: "Welcome to TAG IT Network documentation.",
    category: "Getting Started",
    slug: "getting-started/introduction",
    url: "/docs/getting-started/introduction.html",
    keywords: ["introduction", "welcome", "getting started", "overview"],
    content: "introduction welcome TAG IT Network documentation getting started overview product authentication blockchain NFC"
  },
  {
    id: "start-quickstart",
    title: "Quick Start",
    description: "Get up and running in 5 minutes.",
    category: "Getting Started",
    slug: "getting-started/quickstart",
    url: "/docs/getting-started/quickstart.html",
    keywords: ["quickstart", "quick start", "tutorial", "first steps", "installation"],
    content: "quickstart quick start tutorial first steps installation setup SDK API key verify scan"
  },
  {
    id: "start-concepts",
    title: "Key Concepts",
    description: "Core concepts: Digital Twins, Lifecycle, BIDGES, Verification.",
    category: "Getting Started",
    slug: "getting-started/key-concepts",
    url: "/docs/getting-started/key-concepts.html",
    keywords: ["concepts", "digital twin", "lifecycle", "verification", "authentication"],
    content: "key concepts digital twin NFT lifecycle state machine verification authentication NFC binding BIDGES access control"
  },

  // ═══════════════════════════════════════════════════════════════
  // API REFERENCE
  // ═══════════════════════════════════════════════════════════════
  {
    id: "api-overview",
    title: "API Overview",
    description: "REST API for verification, assets, and management.",
    category: "API Reference",
    slug: "api/overview",
    url: "/docs/api/overview.html",
    keywords: ["API", "REST", "endpoints", "HTTP", "JSON"],
    content: "API REST endpoints HTTP JSON authentication authorization rate limiting versioning"
  },
  {
    id: "api-verification",
    title: "Verification API",
    description: "POST /verify endpoint for product authentication.",
    category: "API Reference",
    slug: "api/verification",
    url: "/docs/api/verification.html",
    keywords: ["verify", "verification", "authenticate", "scan", "NFC", "endpoint"],
    content: "verification API POST /verify endpoint authenticate scan NFC UID CMAC signals result pass fail"
  },
  {
    id: "api-authentication",
    title: "API Authentication",
    description: "JWT tokens and API key authentication.",
    category: "API Reference",
    slug: "api/authentication",
    url: "/docs/api/authentication.html",
    keywords: ["authentication", "JWT", "API key", "bearer token", "OAuth"],
    content: "authentication JWT API key bearer token OAuth refresh token authorization header"
  },

  // ═══════════════════════════════════════════════════════════════
  // SDK
  // ═══════════════════════════════════════════════════════════════
  {
    id: "sdk-javascript",
    title: "JavaScript SDK",
    description: "Official JavaScript/TypeScript SDK for TAG IT Network.",
    category: "SDK",
    slug: "sdk/javascript",
    url: "/docs/sdk/javascript.html",
    keywords: ["JavaScript", "TypeScript", "SDK", "npm", "Node.js", "browser"],
    content: "JavaScript TypeScript SDK npm install @tagit/sdk Node.js browser verify mint claim"
  },
  {
    id: "sdk-mobile",
    title: "Mobile SDK",
    description: "iOS (Swift) and Android (Kotlin) SDKs with NFC support.",
    category: "SDK",
    slug: "sdk/mobile",
    url: "/docs/sdk/mobile.html",
    keywords: ["mobile", "iOS", "Android", "Swift", "Kotlin", "NFC", "scan"],
    content: "mobile SDK iOS Android Swift Kotlin NFC scan verify React Native Flutter"
  }
];

// Export for use in docs.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = docsSearchIndex;
}

// Make available globally for browser
if (typeof window !== 'undefined') {
  window.docsSearchIndex = docsSearchIndex;
}
