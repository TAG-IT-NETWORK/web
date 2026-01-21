/**
 * TAG IT Network Documentation JavaScript
 * Version: 2.0
 * Handles search, TOC highlighting, copy buttons, and mobile navigation
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════

    document.addEventListener('DOMContentLoaded', function() {
        initCodeCopyButtons();
        initTOCHighlighting();
        initSearchModal();
        initMobileSidebar();
        initSmoothScrolling();
        initMermaidDiagrams();
        initCollapsibleSections();
    });

    // ═══════════════════════════════════════════════════════════════
    // SEARCH INDEX (loaded from search-index.js or embedded)
    // ═══════════════════════════════════════════════════════════════

    // Use external index if available, otherwise fallback
    const searchIndex = window.docsSearchIndex || [
        // Architecture
        { id: "arch-system-overview", title: "System Overview", description: "ORACULS stack architecture and hybrid public-private blockchain design", category: "Architecture", url: "/docs/architecture/system-overview.html", keywords: ["ORACULS", "stack", "architecture", "hybrid", "blockchain", "L2", "OP Stack", "EigenDA"] },
        { id: "arch-asset-lifecycle", title: "Asset Lifecycle", description: "7-function deterministic lifecycle: MINT, BIND, ACTIVATE, CLAIM, FLAG, RESOLVE, RECYCLE", category: "Architecture", url: "/docs/architecture/asset-lifecycle.html", keywords: ["lifecycle", "state machine", "mint", "bind", "activate", "claim", "flag", "NFT", "digital twin"] },
        { id: "arch-bidges", title: "BIDGES Access Control", description: "Badge Identity & Delegation for Gated Execution System", category: "Architecture", url: "/docs/architecture/bidges-system.html", keywords: ["BIDGES", "access control", "identity badge", "capability badge", "ERC-5192", "ERC-1155", "soulbound"] },
        { id: "arch-security", title: "Security Model", description: "5-layer defense-in-depth security architecture with NIST CSF 2.0 compliance", category: "Architecture", url: "/docs/architecture/security-model.html", keywords: ["security", "NIST", "cryptography", "audit", "formal verification"] },
        { id: "arch-dataflow", title: "Data Flow Diagrams", description: "Visual diagrams for system architecture, sequences, and processes", category: "Architecture", url: "/docs/architecture/data-flow-diagrams.html", keywords: ["diagrams", "mermaid", "flowchart", "sequence"] },
        
        // Smart Contracts
        { id: "contracts-overview", title: "Smart Contracts Overview", description: "15 contracts in Core, Token Suite, Account Abstraction, and Bridge groups", category: "Smart Contracts", url: "/docs/contracts/overview.html", keywords: ["smart contracts", "TAGITCore", "TAGITAccess", "TAGITRecovery", "ERC-721"] },
        { id: "contracts-core", title: "Core Contracts", description: "TAGITCore, TAGITAccess, and TAGITRecovery contract details", category: "Smart Contracts", url: "/docs/contracts/core-contracts.html", keywords: ["TAGITCore", "mint", "bindTag", "verify", "AIRP"] },
        { id: "contracts-addresses", title: "Contract Addresses", description: "Deployed contract addresses on OP Sepolia and mainnet", category: "Smart Contracts", url: "/docs/contracts/addresses.html", keywords: ["addresses", "deployment", "OP Sepolia", "0x88D2b62FD388"] },
        
        // NFC
        { id: "nfc-hardware", title: "NFC Hardware Specs", description: "Four-tier chip classification and NTAG 424 DNA specifications", category: "NFC Integration", url: "/docs/nfc/hardware-specs.html", keywords: ["NFC", "NTAG 424 DNA", "NXP", "AES-128", "SUN", "chip", "reader"] },
        
        // Governance
        { id: "gov-dao", title: "DAO Structure", description: "Multi-house voting with Gov/Mil 30%, Enterprise 30%, Public 20%, Dev 10%, Regulatory 10%", category: "Governance", url: "/docs/governance/dao-structure.html", keywords: ["DAO", "governance", "multi-house", "voting", "proposal", "timelock"] },
        
        // Tokenomics
        { id: "token-tagit", title: "TAGIT Token", description: "7,777,777,333 genesis supply with 3.33% inflation and 33.3% burn rate", category: "Tokenomics", url: "/docs/tokenomics/tagit-token.html", keywords: ["TAGIT", "token", "7777777333", "magic number", "burn", "staking"] },
        
        // Reference
        { id: "ref-glossary", title: "Glossary", description: "Comprehensive terminology glossary for TAG IT Network", category: "Reference", url: "/docs/reference/glossary.html", keywords: ["glossary", "terms", "definitions", "AIRP", "BIDGES", "ORACULS"] }
    ];

    // ═══════════════════════════════════════════════════════════════
    // CODE COPY BUTTONS
    // ═══════════════════════════════════════════════════════════════

    function initCodeCopyButtons() {
        const codeBlocks = document.querySelectorAll('.docs-content pre');

        codeBlocks.forEach(function(pre) {
            if (pre.querySelector('.code-copy-btn')) return; // Already has button

            const copyBtn = document.createElement('button');
            copyBtn.className = 'code-copy-btn';
            copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
            copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
            copyBtn.setAttribute('title', 'Copy to clipboard');

            copyBtn.addEventListener('click', function() {
                const code = pre.querySelector('code');
                const text = code ? code.textContent : pre.textContent;

                navigator.clipboard.writeText(text).then(function() {
                    copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
                    copyBtn.classList.add('copied');

                    setTimeout(function() {
                        copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                }).catch(function(err) {
                    console.error('Failed to copy:', err);
                });
            });

            pre.style.position = 'relative';
            pre.appendChild(copyBtn);
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // TABLE OF CONTENTS HIGHLIGHTING
    // ═══════════════════════════════════════════════════════════════

    function initTOCHighlighting() {
        const tocLinks = document.querySelectorAll('.docs-toc-link');
        const headings = [];

        tocLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const heading = document.getElementById(href.substring(1));
                if (heading) {
                    headings.push({ element: heading, link: link });
                }
            }
        });

        if (headings.length === 0) return;

        function updateTOCHighlight() {
            const scrollPosition = window.scrollY + 120;
            let currentHeading = headings[0];

            for (let i = 0; i < headings.length; i++) {
                if (headings[i].element.offsetTop <= scrollPosition) {
                    currentHeading = headings[i];
                }
            }

            tocLinks.forEach(function(link) {
                link.classList.remove('active');
            });

            if (currentHeading) {
                currentHeading.link.classList.add('active');
            }
        }

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateTOCHighlight();
                    ticking = false;
                });
                ticking = true;
            }
        });

        updateTOCHighlight();
    }

    // ═══════════════════════════════════════════════════════════════
    // ENHANCED SEARCH MODAL
    // ═══════════════════════════════════════════════════════════════

    function initSearchModal() {
        const modal = document.getElementById('docsSearchModal');
        const input = document.getElementById('docsSearchInput');
        const results = document.getElementById('docsSearchResults');
        const closeBtn = document.getElementById('docsSearchClose');
        const searchTrigger = document.getElementById('docsSearchTrigger');

        if (!modal) return;

        let selectedIndex = -1;

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Open with Ctrl+K or Cmd+K or /
            if (((e.ctrlKey || e.metaKey) && e.key === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT')) {
                e.preventDefault();
                openSearchModal();
            }

            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeSearchModal();
            }

            if (modal.classList.contains('active')) {
                const resultItems = results.querySelectorAll('.docs-search-result');

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    selectedIndex = Math.min(selectedIndex + 1, resultItems.length - 1);
                    updateSelectedResult(resultItems);
                }

                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    selectedIndex = Math.max(selectedIndex - 1, 0);
                    updateSelectedResult(resultItems);
                }

                if (e.key === 'Enter' && selectedIndex >= 0) {
                    e.preventDefault();
                    const selected = resultItems[selectedIndex];
                    if (selected) {
                        window.location.href = selected.getAttribute('href');
                    }
                }
            }
        });

        if (searchTrigger) {
            searchTrigger.addEventListener('click', openSearchModal);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeSearchModal);
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeSearchModal();
            }
        });

        if (input) {
            input.addEventListener('input', debounce(function() {
                performSearch(input.value);
            }, 150));
        }

        function performSearch(query) {
            query = query.trim().toLowerCase();
            selectedIndex = -1;

            if (query.length === 0) {
                showRecentSearches();
                return;
            }

            if (query.length < 2) {
                results.innerHTML = '<div class="docs-search-empty">Keep typing...</div>';
                return;
            }

            // Score-based search
            const scored = searchIndex.map(function(item) {
                let score = 0;
                const titleLower = item.title.toLowerCase();
                const descLower = (item.description || '').toLowerCase();
                const keywords = item.keywords || [];
                const content = (item.content || '').toLowerCase();

                // Exact title match
                if (titleLower === query) score += 100;
                // Title starts with query
                else if (titleLower.startsWith(query)) score += 50;
                // Title contains query
                else if (titleLower.includes(query)) score += 30;

                // Description match
                if (descLower.includes(query)) score += 20;

                // Keyword match
                keywords.forEach(function(kw) {
                    if (kw.toLowerCase().includes(query)) score += 15;
                    if (kw.toLowerCase() === query) score += 25;
                });

                // Content match
                if (content.includes(query)) score += 5;

                return { item: item, score: score };
            });

            // Filter and sort by score
            const filtered = scored
                .filter(function(s) { return s.score > 0; })
                .sort(function(a, b) { return b.score - a.score; })
                .slice(0, 10)
                .map(function(s) { return s.item; });

            if (filtered.length === 0) {
                results.innerHTML = '<div class="docs-search-empty">' +
                    '<div class="docs-search-empty-icon">🔍</div>' +
                    '<div>No results found for "<strong>' + escapeHtml(query) + '</strong>"</div>' +
                    '<div class="docs-search-empty-hint">Try different keywords or check spelling</div>' +
                    '</div>';
                return;
            }

            results.innerHTML = filtered.map(function(item, index) {
                const highlightedTitle = highlightMatch(item.title, query);
                const highlightedDesc = highlightMatch(item.description || '', query);
                
                return '<a href="' + item.url + '" class="docs-search-result" data-index="' + index + '">' +
                    '<div class="docs-search-result-icon">' + getCategoryIcon(item.category) + '</div>' +
                    '<div class="docs-search-result-content">' +
                    '<div class="docs-search-result-title">' + highlightedTitle + '</div>' +
                    '<div class="docs-search-result-description">' + highlightedDesc + '</div>' +
                    '</div>' +
                    '<div class="docs-search-result-category">' + item.category + '</div>' +
                    '</a>';
            }).join('');

            // Add hover handlers
            const resultItems = results.querySelectorAll('.docs-search-result');
            resultItems.forEach(function(item, index) {
                item.addEventListener('mouseenter', function() {
                    selectedIndex = index;
                    updateSelectedResult(resultItems);
                });
            });
        }

        function showRecentSearches() {
            const quickLinks = [
                { title: "System Overview", url: "/docs/architecture/system-overview.html", category: "Architecture" },
                { title: "Asset Lifecycle", url: "/docs/architecture/asset-lifecycle.html", category: "Architecture" },
                { title: "Smart Contracts", url: "/docs/contracts/overview.html", category: "Contracts" },
                { title: "TAGIT Token", url: "/docs/tokenomics/tagit-token.html", category: "Tokenomics" },
                { title: "Glossary", url: "/docs/reference/glossary.html", category: "Reference" }
            ];

            results.innerHTML = '<div class="docs-search-section-title">Quick Links</div>' +
                quickLinks.map(function(item, index) {
                    return '<a href="' + item.url + '" class="docs-search-result docs-search-result-quick" data-index="' + index + '">' +
                        '<div class="docs-search-result-icon">' + getCategoryIcon(item.category) + '</div>' +
                        '<div class="docs-search-result-content">' +
                        '<div class="docs-search-result-title">' + item.title + '</div>' +
                        '</div>' +
                        '<div class="docs-search-result-category">' + item.category + '</div>' +
                        '</a>';
                }).join('');
        }

        function getCategoryIcon(category) {
            const icons = {
                'Architecture': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
                'Smart Contracts': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
                'NFC Integration': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
                'Governance': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
                'Tokenomics': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
                'Reference': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
                'Contracts': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'
            };
            return icons[category] || icons['Reference'];
        }

        function openSearchModal() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (input) {
                input.value = '';
                input.focus();
                showRecentSearches();
            }
            selectedIndex = -1;
        }

        function closeSearchModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            selectedIndex = -1;
        }

        function updateSelectedResult(items) {
            items.forEach(function(item, index) {
                item.classList.toggle('selected', index === selectedIndex);
            });

            // Scroll selected into view
            if (selectedIndex >= 0 && items[selectedIndex]) {
                items[selectedIndex].scrollIntoView({ block: 'nearest' });
            }
        }

        function highlightMatch(text, query) {
            if (!query) return escapeHtml(text);
            const regex = new RegExp('(' + escapeRegExp(query) + ')', 'gi');
            return escapeHtml(text).replace(regex, '<mark>$1</mark>');
        }

        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function debounce(func, wait) {
            let timeout;
            return function() {
                const context = this, args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    func.apply(context, args);
                }, wait);
            };
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // MOBILE SIDEBAR
    // ═══════════════════════════════════════════════════════════════

    function initMobileSidebar() {
        const toggle = document.getElementById('docsMobileToggle');
        const sidebar = document.getElementById('docsSidebar');

        if (!toggle || !sidebar) return;

        toggle.addEventListener('click', function() {
            toggle.classList.toggle('active');
            sidebar.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
        });

        const sidebarLinks = sidebar.querySelectorAll('.docs-nav-link');
        sidebarLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                sidebar.classList.remove('active');
                toggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(e) {
            if (sidebar.classList.contains('active') &&
                !sidebar.contains(e.target) &&
                !toggle.contains(e.target)) {
                sidebar.classList.remove('active');
                toggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // SMOOTH SCROLLING
    // ═══════════════════════════════════════════════════════════════

    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 100;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    history.pushState(null, null, href);
                }
            });
        });

        if (window.location.hash) {
            setTimeout(function() {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    const offset = 100;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // MERMAID DIAGRAM INITIALIZATION
    // ═══════════════════════════════════════════════════════════════

    function initMermaidDiagrams() {
        if (typeof mermaid !== 'undefined') {
            mermaid.initialize({
                startOnLoad: true,
                theme: 'dark',
                themeVariables: {
                    primaryColor: '#00ff88',
                    primaryTextColor: '#ffffff',
                    primaryBorderColor: '#00ff88',
                    lineColor: '#00d4ff',
                    secondaryColor: '#1a1a2e',
                    tertiaryColor: '#0d0d1a',
                    background: '#0d0d1a',
                    mainBkg: '#1a1a2e',
                    secondBkg: '#0d0d1a',
                    nodeBorder: '#00ff88',
                    clusterBkg: '#1a1a2e',
                    clusterBorder: '#00d4ff',
                    edgeLabelBackground: '#1a1a2e',
                    fontSize: '14px'
                },
                flowchart: {
                    htmlLabels: true,
                    curve: 'basis'
                },
                sequence: {
                    diagramMarginX: 50,
                    diagramMarginY: 10,
                    actorMargin: 50,
                    width: 150,
                    height: 65
                }
            });
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // COLLAPSIBLE SECTIONS
    // ═══════════════════════════════════════════════════════════════

    function initCollapsibleSections() {
        const collapsibles = document.querySelectorAll('.docs-collapsible');

        collapsibles.forEach(function(section) {
            const header = section.querySelector('.docs-collapsible-header');
            const content = section.querySelector('.docs-collapsible-content');

            if (header && content) {
                header.addEventListener('click', function() {
                    section.classList.toggle('expanded');
                    content.style.maxHeight = section.classList.contains('expanded') 
                        ? content.scrollHeight + 'px' 
                        : '0';
                });
            }
        });
    }

})();
