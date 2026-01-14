// TAG IT Network - Main JavaScript
// ===================================

// Loading Screen
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        // Skip if it's a modal trigger
        if (this.id === 'contactModalTrigger' || 
            this.classList.contains('contact-modal-trigger') ||
            this.classList.contains('legal-trigger')) return;
        
        const href = this.getAttribute('href');
        if (href === '#') return; // Skip empty hash links
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

// Intersection Observer & Animations
    // ═══════════════════════════════════════════════════════════════
    // LOADING SCREEN & HERO REVEAL
    // ═══════════════════════════════════════════════════════════════
    window.addEventListener('load', () => {
      setTimeout(() => {
        // Hide loading screen
        document.getElementById('loadingScreen').classList.add('hidden');
        
        // Trigger hero reveal animations
        setTimeout(() => {
          document.querySelectorAll('.hero-reveal').forEach(el => {
            el.classList.add('revealed');
          });
        }, 200);
      }, 1800);
    });

    // ═══════════════════════════════════════════════════════════════
    // SCROLL-TRIGGERED FADE-IN ANIMATIONS
    // ═══════════════════════════════════════════════════════════════
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
      fadeObserver.observe(el);
    });

    // ═══════════════════════════════════════════════════════════════
    // PARALLAX BACKGROUND EFFECT
    // ═══════════════════════════════════════════════════════════════
    const parallaxGrid = document.getElementById('parallaxGrid');
    const parallaxOrbs = document.getElementById('parallaxOrbs');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          // Parallax grid moves slower (0.3x speed)
          if (parallaxGrid) {
            parallaxGrid.style.transform = `translateY(${scrollY * 0.3}px)`;
          }
          
          // Orbs move at different speeds for depth effect
          if (parallaxOrbs) {
            const orb1 = parallaxOrbs.querySelector('.orb-1');
            const orb2 = parallaxOrbs.querySelector('.orb-2');
            
            if (orb1) orb1.style.transform = `translateY(${scrollY * 0.15}px)`;
            if (orb2) orb2.style.transform = `translateY(${scrollY * 0.25}px)`;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    });

    // ═══════════════════════════════════════════════════════════════
    // SMOOTH SCROLL FOR NAV LINKS (with offset for fixed nav)
    // ═══════════════════════════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const navHeight = document.querySelector('.nav').offsetHeight;
          const targetPosition = targetElement.offsetTop - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // ═══════════════════════════════════════════════════════════════
    // NAV BACKGROUND ON SCROLL
    // ═══════════════════════════════════════════════════════════════
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 14, 20, 0.95)';
        nav.style.backdropFilter = 'blur(20px)';
      } else {
        nav.style.background = 'rgba(10, 14, 20, 0.8)';
        nav.style.backdropFilter = 'blur(10px)';
      }
    });

    // ═══════════════════════════════════════════════════════════════
    // MOBILE MENU TOGGLE
    // ═══════════════════════════════════════════════════════════════
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    function toggleMobileMenu() {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    mobileToggle.addEventListener('click', toggleMobileMenu);
    mobileOverlay.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu();
      });
    });

    // ═══════════════════════════════════════════════════════════════
    // SECURITY DIAGRAM INTERACTIVITY
    // ═══════════════════════════════════════════════════════════════
    const legendItems = document.querySelectorAll('.legend-item');
    const securityRings = document.querySelectorAll('.security-ring');
    
    // Hovering legend card highlights the corresponding ring
    legendItems.forEach(item => {
      const layerClass = Array.from(item.classList).find(c => c.startsWith('layer-'));
      const ringNum = layerClass ? layerClass.split('-')[1] : null;
      
      item.addEventListener('mouseenter', () => {
        if (ringNum) {
          const ring = document.querySelector(`.ring-${ringNum}`);
          if (ring) {
            ring.classList.add('active');
            ring.style.transform = 'scale(1.08)';
            ring.style.zIndex = '10';
          }
        }
        item.classList.add('active');
      });
      
      item.addEventListener('mouseleave', () => {
        if (ringNum) {
          const ring = document.querySelector(`.ring-${ringNum}`);
          if (ring) {
            ring.classList.remove('active');
            ring.style.transform = '';
            ring.style.zIndex = '';
          }
        }
        item.classList.remove('active');
      });
    });
    
    // Reverse: highlight legend when hovering ring
    securityRings.forEach(ring => {
      const ringClass = Array.from(ring.classList).find(c => c.startsWith('ring-'));
      const ringNum = ringClass ? ringClass.split('-')[1] : null;
      
      ring.addEventListener('mouseenter', () => {
        if (ringNum) {
          const legend = document.querySelector(`.legend-item.layer-${ringNum}`);
          if (legend) {
            legend.classList.add('active');
            legend.style.transform = 'translateX(12px)';
            legend.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
          }
        }
      });
      
      ring.addEventListener('mouseleave', () => {
        if (ringNum) {
          const legend = document.querySelector(`.legend-item.layer-${ringNum}`);
          if (legend) {
            legend.classList.remove('active');
            legend.style.transform = '';
            legend.style.boxShadow = '';
          }
        }
      });
    });

    // ═══════════════════════════════════════════════════════════════
    // SOLUTIONS EXPANDABLE CARDS
    // ═══════════════════════════════════════════════════════════════
    const sectorData = {
      retail: {
        icon: '🛒',
        title: 'Retail & Consumer Goods',
        tagline: '"Authenticate every purchase. Eliminate counterfeits."',
        description: 'TAG IT Network enables retailers and brands to embed NFC-linked digital twins into products at the point of manufacture. Consumers scan to verify authenticity, access product origin, and unlock loyalty rewards.',
        useCases: [
          'Luxury goods authentication (watches, handbags, sneakers)',
          'Warranty registration via NFC tap',
          'Secondary market verification (resale platforms)',
          'Anti-counterfeiting for electronics and cosmetics'
        ],
        lifecycle: ['MINT', 'BIND', 'ACTIVATE', 'CLAIM']
      },
      logistics: {
        icon: '🚚',
        title: 'Logistics & Supply Chain',
        tagline: '"Track every handoff. Trust every delivery."',
        description: 'From factory floor to final mile, TAG IT Network provides immutable chain-of-custody records. Each NFC-tagged asset logs transfers, environmental conditions, and handler identities on-chain.',
        useCases: [
          'Cold chain monitoring for pharmaceuticals and food',
          'Cross-border freight verification',
          'Proof of delivery with cryptographic signatures',
          'Warehouse inventory reconciliation'
        ],
        lifecycle: ['MINT', 'BIND', 'ACTIVATE', 'CLAIM', 'FLAG']
      },
      agriculture: {
        icon: '🌾',
        title: 'Agriculture',
        tagline: '"Farm to fork, fully verified."',
        description: 'TAG IT Network empowers agricultural producers to prove provenance, certifications, and handling conditions for every harvest. Consumers and regulators can scan to see the complete journey from seed to shelf.',
        useCases: [
          'Organic certification verification',
          'Fair trade and sustainability tracking',
          'Livestock origin and health records',
          'Wine and spirits provenance (vineyard, vintage, bottling)'
        ],
        lifecycle: ['MINT', 'BIND', 'ACTIVATE', 'CLAIM']
      },
      military: {
        icon: '🎖️',
        title: 'Military & Defense',
        tagline: '"Mission-critical accountability. Zero compromise."',
        description: 'Defense agencies require absolute certainty over equipment, supplies, and sensitive materials. TAG IT Network delivers military-grade traceability with role-based access and tamper-evident seals.',
        useCases: [
          'Weapons and ammunition tracking',
          'Spare parts authenticity (aviation, vehicles)',
          'Classified document chain-of-custody',
          'Personnel equipment issuance and return'
        ],
        lifecycle: ['MINT', 'BIND', 'ACTIVATE', 'CLAIM', 'FLAG', 'RESOLVE', 'RECYCLE']
      },
      healthcare: {
        icon: '🏥',
        title: 'Healthcare',
        tagline: '"Patient safety through provable supply chains."',
        description: 'Counterfeit medications kill. TAG IT Network ensures pharmaceutical integrity from manufacturer to patient, with temperature logging, batch tracking, and recall management built in.',
        useCases: [
          'Drug anti-counterfeiting (serialization compliance)',
          'Medical device traceability (UDI requirements)',
          'Blood and organ transport verification',
          'Controlled substance chain-of-custody'
        ],
        lifecycle: ['MINT', 'BIND', 'ACTIVATE', 'CLAIM', 'FLAG']
      },
      art: {
        icon: '🎨',
        title: 'Art & Collectibles',
        tagline: '"Provenance that travels with the piece."',
        description: 'Art forgery and collectible fraud cost billions annually. TAG IT Network embeds verifiable provenance directly into physical artworks, creating a permanent certificate of authenticity.',
        useCases: [
          'Fine art authentication and exhibition history',
          'Sports memorabilia verification',
          'Rare book and manuscript provenance',
          'Trading card grading and ownership history'
        ],
        lifecycle: ['MINT', 'BIND', 'ACTIVATE', 'CLAIM']
      },
      aerospace: {
        icon: '🛰️',
        title: 'Space & Aerospace',
        tagline: '"Every component accountable, beyond Earth."',
        description: 'Space missions demand absolute traceability—components must be certified, tracked, and verified across multi-year timelines and extreme environments.',
        useCases: [
          'Satellite component lifecycle tracking',
          'Rocket part provenance and inspection records',
          'Astronaut equipment issuance',
          'Space station inventory management'
        ],
        lifecycle: ['MINT', 'BIND', 'ACTIVATE', 'CLAIM', 'RECYCLE']
      },
      government: {
        icon: '🏛️',
        title: 'Government',
        tagline: '"Public trust through transparent infrastructure."',
        description: 'Government agencies manage critical infrastructure and citizen-facing services that demand accountability. TAG IT Network enables verifiable asset management and secure document tracking.',
        useCases: [
          'Public infrastructure maintenance records',
          'Voting equipment chain-of-custody',
          'Government-issued ID verification',
          'Disaster relief supply distribution'
        ],
        lifecycle: ['MINT', 'BIND', 'ACTIVATE', 'CLAIM', 'FLAG', 'RESOLVE']
      }
    };

    const solutionCards = document.querySelectorAll('.solution-card');
    const solutionOverlay = document.getElementById('solutionOverlay');
    const solutionModal = document.getElementById('solutionModal');
    const modalClose = document.getElementById('modalClose');
    
    function openSolutionModal(sector) {
      const data = sectorData[sector];
      if (!data) return;
      
      document.getElementById('modalIcon').textContent = data.icon;
      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalTagline').textContent = data.tagline;
      document.getElementById('modalDescription').textContent = data.description;
      
      const useCasesList = document.getElementById('modalUseCases');
      useCasesList.innerHTML = data.useCases.map(uc => `<li>${uc}</li>`).join('');
      
      solutionOverlay.classList.add('active');
      solutionModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Dim other cards
      solutionCards.forEach(card => {
        if (card.dataset.sector !== sector) {
          card.classList.add('dimmed');
        }
      });
    }
    
    function closeSolutionModal() {
      solutionOverlay.classList.remove('active');
      solutionModal.classList.remove('active');
      document.body.style.overflow = '';
      solutionCards.forEach(card => card.classList.remove('dimmed'));
    }
    
    solutionCards.forEach(card => {
      card.addEventListener('click', () => {
        openSolutionModal(card.dataset.sector);
      });
    });
    
    modalClose.addEventListener('click', closeSolutionModal);
    solutionOverlay.addEventListener('click', closeSolutionModal);
    
    // Escape key handler moved to end of JS (after all functions defined)

    // ═══════════════════════════════════════════════════════════════
    // LIFECYCLE STAGE EXPLANATIONS
    // ═══════════════════════════════════════════════════════════════
    const lifecycleData = {
      mint: {
        icon: '🪙',
        headline: 'Digital Twin Created',
        vibe: 'Birth of on-chain identity',
        desc: 'A unique NFT is minted on the TAG IT L2 blockchain, creating an immutable digital identity for a physical product. This establishes the cryptographic foundation for all future lifecycle events.',
        tech: 'TAGITCore.mint() → ERC-721 NFT + metadata hash stored on EigenDA'
      },
      bind: {
        icon: '🔗',
        headline: 'Physical Meets Digital',
        vibe: 'NFC ↔ Blockchain pairing',
        desc: 'The digital twin is cryptographically bound to a physical NFC chip embedded in the product. This one-time binding creates an unbreakable link between the physical asset and its blockchain identity.',
        tech: 'TAGITCore.bindTag(tokenId, tagHash) → ECDSA signature verification'
      },
      activate: {
        icon: '⚡',
        headline: 'Ready for Market',
        vibe: 'Product enters circulation',
        desc: 'The product is activated for sale or distribution. This marks the transition from manufacturing to market, enabling consumer interactions and beginning the public chain of custody.',
        tech: 'TAGITCore.activate(tokenId) → State: BOUND → ACTIVATED'
      },
      claim: {
        icon: '✋',
        headline: 'Ownership Transferred',
        vibe: 'Consumer takes possession',
        desc: 'A consumer scans the NFC tag and claims ownership of the product. The blockchain records this transfer, establishing verifiable provenance and enabling warranty, rewards, and resale verification.',
        tech: 'TAGITCore.claim(tokenId, newOwner) → Ownership transfer event emitted'
      },
      flag: {
        icon: '🚩',
        headline: 'Issue Reported',
        vibe: 'Something\'s wrong',
        desc: 'Any party can flag a product for suspected counterfeiting, tampering, theft, or other issues. Flagging triggers an investigation workflow and temporarily restricts certain actions.',
        tech: 'TAGITRecovery.flag(tokenId, reason) → State: ACTIVATED → FLAGGED'
      },
      resolve: {
        icon: '⚖️',
        headline: 'Dispute Settled',
        vibe: 'Arbitrator verdict',
        desc: 'An authorized arbitrator reviews the flagged case and issues a resolution. This may restore the product to active status, transfer ownership, or escalate to recycling.',
        tech: 'TAGITRecovery.resolve(tokenId, verdict) → Arbitrator signature required'
      },
      recycle: {
        icon: '♻️',
        headline: 'End of Life',
        vibe: 'Decommissioned, archived',
        desc: 'The product reaches end of life and is decommissioned. The digital twin is archived on-chain, preserving the complete history while preventing further transfers or claims.',
        tech: 'TAGITCore.recycle(tokenId) → State: FINAL, immutable archive'
      }
    };

    const lifecycleStages = document.querySelectorAll('.lifecycle-stage');
    const lifecycleExplanation = document.getElementById('lifecycleExplanation');
    let activeStage = null;

    function showLifecycleExplanation(stage) {
      const data = lifecycleData[stage];
      if (!data) return;

      // Update content
      document.getElementById('explanationIcon').textContent = data.icon;
      document.getElementById('explanationHeadline').textContent = data.headline;
      document.getElementById('explanationVibe').textContent = data.vibe;
      document.getElementById('explanationDesc').textContent = data.desc;
      document.getElementById('explanationTech').textContent = data.tech;

      // Remove active class first to trigger re-animation
      lifecycleExplanation.classList.remove('active');
      
      // Force reflow
      void lifecycleExplanation.offsetWidth;
      
      // Show panel
      setTimeout(() => {
        lifecycleExplanation.classList.add('active');
      }, 10);

      // Update active stage
      lifecycleStages.forEach(s => s.classList.remove('active'));
      document.querySelector(`[data-stage="${stage}"]`)?.classList.add('active');
      activeStage = stage;
    }

    function closeLifecycleExplanation() {
      lifecycleExplanation.classList.remove('active');
      lifecycleStages.forEach(s => s.classList.remove('active'));
      activeStage = null;
    }

    lifecycleStages.forEach(stage => {
      stage.addEventListener('click', () => {
        const stageId = stage.dataset.stage;
        if (activeStage === stageId) {
          closeLifecycleExplanation();
        } else {
          showLifecycleExplanation(stageId);
        }
      });
    });

    // Close explanation when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.lifecycle-stage') && 
          !e.target.closest('.lifecycle-explanation') &&
          activeStage) {
        closeLifecycleExplanation();
      }
    });

    // Swipe down to close on mobile
    let touchStartY = 0;
    lifecycleExplanation.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    });

    lifecycleExplanation.addEventListener('touchmove', (e) => {
      const touchY = e.touches[0].clientY;
      const diff = touchY - touchStartY;
      if (diff > 50) {
        closeLifecycleExplanation();
      }
    });

    // ═══════════════════════════════════════════════════════════════
    // EXPANDABLE FEATURE CARDS
    // ═══════════════════════════════════════════════════════════════
    const featureCards = document.querySelectorAll('.feature-card[data-feature]');
    let expandedFeature = null;
    const isMobileView = () => window.innerWidth < 768;

    function expandFeatureCard(card) {
      const feature = card.dataset.feature;
      
      // If clicking same card, collapse it
      if (expandedFeature === feature) {
        collapseFeatureCard(card);
        return;
      }
      
      // Collapse any currently expanded card first (accordion on mobile)
      if (isMobileView() && expandedFeature) {
        const currentExpanded = document.querySelector('.feature-card.expanded');
        if (currentExpanded) {
          currentExpanded.classList.remove('expanded');
        }
      } else if (!isMobileView()) {
        // On desktop, also collapse others for cleaner UX
        featureCards.forEach(c => c.classList.remove('expanded'));
      }
      
      // Expand the clicked card
      card.classList.add('expanded');
      expandedFeature = feature;
      
      // Scroll into view on mobile
      if (isMobileView()) {
        setTimeout(() => {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }

    function collapseFeatureCard(card) {
      card.classList.remove('expanded');
      expandedFeature = null;
    }

    function collapseAllFeatureCards() {
      featureCards.forEach(card => card.classList.remove('expanded'));
      expandedFeature = null;
    }

    featureCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        expandFeatureCard(card);
      });
      
      // Swipe down to collapse on mobile
      let featureTouchStartY = 0;
      card.addEventListener('touchstart', (e) => {
        featureTouchStartY = e.touches[0].clientY;
      });
      
      card.addEventListener('touchmove', (e) => {
        if (card.classList.contains('expanded')) {
          const touchY = e.touches[0].clientY;
          const diff = touchY - featureTouchStartY;
          if (diff > 60) {
            collapseFeatureCard(card);
          }
        }
      });
    });

    // Close feature cards when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.feature-card') && expandedFeature) {
        collapseAllFeatureCards();
      }
    });

    // ═══════════════════════════════════════════════════════════════
    // GLOBAL ESCAPE KEY HANDLER
    // ═══════════════════════════════════════════════════════════════
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSolutionModal();
        closeLifecycleExplanation();
        collapseAllFeatureCards();
        collapseAllStackLayers();
        if (mobileMenu.classList.contains('active')) {
          toggleMobileMenu();
        }
      }
    });

    // ═══════════════════════════════════════════════════════════════
    // ORACULS STACK - EXPANDABLE LAYERS
    // ═══════════════════════════════════════════════════════════════
    const stackLayers = document.querySelectorAll('.stack-layer[data-layer]');
    let expandedLayer = null;

    function expandStackLayer(layer) {
      const layerId = layer.dataset.layer;
      
      if (expandedLayer === layerId) {
        collapseStackLayer(layer);
        return;
      }
      
      // Collapse other layers (accordion)
      stackLayers.forEach(l => l.classList.remove('expanded'));
      
      // Expand clicked layer
      layer.classList.add('expanded');
      expandedLayer = layerId;
      
      // Scroll into view on mobile
      if (window.innerWidth < 768) {
        setTimeout(() => {
          layer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }

    function collapseStackLayer(layer) {
      layer.classList.remove('expanded');
      expandedLayer = null;
    }

    function collapseAllStackLayers() {
      stackLayers.forEach(l => l.classList.remove('expanded'));
      expandedLayer = null;
    }

    stackLayers.forEach(layer => {
      layer.addEventListener('click', () => {
        expandStackLayer(layer);
      });
    });

    // ═══════════════════════════════════════════════════════════════
    // ORACULS STACK - ANIMATED PARTICLES
    // ═══════════════════════════════════════════════════════════════
    const particleContainer = document.getElementById('particleContainer');
    const particleColors = ['#00D4FF', '#00FF88', '#B84FFF', '#FFA502'];
    const isMobileDevice = window.innerWidth < 768;
    const particleCount = isMobileDevice ? 5 : 12;
    let particlesCreated = false;

    function createParticles() {
      if (particlesCreated || !particleContainer) return;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'data-particle';
        particle.style.left = `${10 + Math.random() * 80}%`;
        particle.style.backgroundColor = particleColors[Math.floor(Math.random() * particleColors.length)];
        particle.style.animationDelay = `${Math.random() * 4}s`;
        particle.style.animationDuration = `${3 + Math.random() * 2}s`;
        particleContainer.appendChild(particle);
      }
      particlesCreated = true;
    }

    // Create particles when technology section is in view
    const techSection = document.getElementById('technology');
    if (techSection) {
      const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            createParticles();
          }
        });
      }, { threshold: 0.2 });
      techObserver.observe(techSection);
    }

    // ═══════════════════════════════════════════════════════════════
    // PERFORMANCE METRICS - ANIMATED COUNTERS
    // ═══════════════════════════════════════════════════════════════
    const metricValues = document.querySelectorAll('.metric-value[data-target]');
    let metricsAnimated = false;

    function animateMetrics() {
      if (metricsAnimated) return;
      metricsAnimated = true;
      
      metricValues.forEach(metric => {
        const target = metric.dataset.target;
        const originalText = metric.textContent;
        
        // Keep original text for complex values
        if (target.includes('.') || target.includes('days')) {
          metric.style.opacity = '0';
          setTimeout(() => {
            metric.style.transition = 'opacity 0.5s ease';
            metric.style.opacity = '1';
          }, 300);
        }
      });
    }

    const performanceMetrics = document.querySelector('.performance-metrics');
    if (performanceMetrics) {
      const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateMetrics();
          }
        });
      }, { threshold: 0.5 });
      metricsObserver.observe(performanceMetrics);
    }

    // ═══════════════════════════════════════════════════════════════
    // TOKENOMICS - GENESIS COUNTER ANIMATION
    // ═══════════════════════════════════════════════════════════════
    const genesisCounter = document.getElementById('genesisCounter');
    let genesisAnimated = false;
    const genesisTarget = 7777777333;

    function animateGenesisCounter() {
      if (genesisAnimated) return;
      genesisAnimated = true;
      
      const duration = 2500;
      const startTime = performance.now();
      
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easeOut * genesisTarget);
        
        genesisCounter.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          genesisCounter.textContent = genesisTarget.toLocaleString();
        }
      }
      
      requestAnimationFrame(update);
    }

    // Trigger when tokenomics section is in view
    const tokenomicsSection = document.getElementById('tokenomics');
    if (tokenomicsSection) {
      const tokenObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateGenesisCounter();
            animatePieChart();
          }
        });
      }, { threshold: 0.3 });
      tokenObserver.observe(tokenomicsSection);
    }

    // ═══════════════════════════════════════════════════════════════
    // TOKENOMICS - PIE CHART ANIMATION (Seamless 3D Arc Paths)
    // ═══════════════════════════════════════════════════════════════
    const pieSegmentsContainer = document.getElementById('pieSegments');
    let pieAnimated = false;
    
    const distributionData = [
      { id: 'ecosystem', pct: 35, color: '#00FF88', colorLight: '#5FFFB0', colorDark: '#00B860' },
      { id: 'presale', pct: 20, color: '#00D4FF', colorLight: '#66E5FF', colorDark: '#0099CC' },
      { id: 'treasury', pct: 15, color: '#B84FFF', colorLight: '#D08FFF', colorDark: '#8B2FC9' },
      { id: 'dao', pct: 15, color: '#FFA502', colorLight: '#FFBE4D', colorDark: '#CC8400' },
      { id: 'development', pct: 10, color: '#8B95A5', colorLight: '#A8B0BC', colorDark: '#6B7280' },
      { id: 'team', pct: 5, color: '#FF4757', colorLight: '#FF7A85', colorDark: '#CC3844' }
    ];
    
    // Function to create arc path
    function describeArc(x, y, outerRadius, innerRadius, startAngle, endAngle) {
      const startOuter = polarToCartesian(x, y, outerRadius, endAngle);
      const endOuter = polarToCartesian(x, y, outerRadius, startAngle);
      const startInner = polarToCartesian(x, y, innerRadius, endAngle);
      const endInner = polarToCartesian(x, y, innerRadius, startAngle);
      
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      
      const d = [
        "M", startOuter.x, startOuter.y,
        "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
        "L", endInner.x, endInner.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
        "Z"
      ].join(" ");
      
      return d;
    }
    
    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    }

    function createPieSegments() {
      if (!pieSegmentsContainer) return;
      
      const svg = pieSegmentsContainer.closest('svg');
      const cx = 100, cy = 100;
      const outerRadius = 92;
      const innerRadius = 56;
      
      // Create defs for gradients
      let defs = svg.querySelector('defs');
      if (!defs) {
        defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        svg.insertBefore(defs, svg.firstChild);
      }
      
      // Add blur filter for glow effects
      const glowFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
      glowFilter.setAttribute("id", "pieGlow");
      glowFilter.setAttribute("x", "-50%");
      glowFilter.setAttribute("y", "-50%");
      glowFilter.setAttribute("width", "200%");
      glowFilter.setAttribute("height", "200%");
      glowFilter.innerHTML = `
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      `;
      defs.appendChild(glowFilter);
      
      let currentAngle = 0;
      
      // First pass: create all segments seamlessly (no gaps)
      distributionData.forEach((segment, index) => {
        const segmentAngle = (segment.pct / 100) * 360;
        const endAngle = currentAngle + segmentAngle;
        const midAngle = currentAngle + segmentAngle / 2;
        
        // Create radial gradient for 3D effect
        const gradientId = `grad-${segment.id}`;
        const gradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
        gradient.setAttribute("id", gradientId);
        gradient.setAttribute("cx", "30%");
        gradient.setAttribute("cy", "30%");
        gradient.setAttribute("r", "70%");
        
        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", segment.colorLight);
        
        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop2.setAttribute("offset", "60%");
        stop2.setAttribute("stop-color", segment.color);
        
        const stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop3.setAttribute("offset", "100%");
        stop3.setAttribute("stop-color", segment.colorDark);
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        gradient.appendChild(stop3);
        defs.appendChild(gradient);
        
        // Create segment path - NO gaps for seamless look
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", describeArc(cx, cy, outerRadius, innerRadius, currentAngle, endAngle));
        path.setAttribute("fill", `url(#${gradientId})`);
        path.setAttribute("class", "pie-segment-path");
        path.setAttribute("id", `seg-${segment.id}`);
        path.setAttribute("data-segment", segment.id);
        // No stroke for seamless blending
        path.style.stroke = "none";
        
        pieSegmentsContainer.appendChild(path);
        
        currentAngle = endAngle;
      });
      
      // Add outer highlight ring for 3D depth
      const outerHighlight = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      outerHighlight.setAttribute("cx", cx);
      outerHighlight.setAttribute("cy", cy);
      outerHighlight.setAttribute("r", outerRadius);
      outerHighlight.setAttribute("fill", "none");
      outerHighlight.setAttribute("stroke", "url(#highlightGrad)");
      outerHighlight.setAttribute("stroke-width", "1");
      outerHighlight.style.opacity = "0.3";
      
      // Create highlight gradient
      const highlightGrad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
      highlightGrad.setAttribute("id", "highlightGrad");
      highlightGrad.setAttribute("x1", "0%");
      highlightGrad.setAttribute("y1", "0%");
      highlightGrad.setAttribute("x2", "100%");
      highlightGrad.setAttribute("y2", "100%");
      highlightGrad.innerHTML = `
        <stop offset="0%" stop-color="rgba(255,255,255,0.5)"/>
        <stop offset="50%" stop-color="rgba(255,255,255,0)"/>
        <stop offset="100%" stop-color="rgba(0,0,0,0.3)"/>
      `;
      defs.appendChild(highlightGrad);
      pieSegmentsContainer.appendChild(outerHighlight);
      
      // Add inner shadow ring
      const innerShadow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      innerShadow.setAttribute("cx", cx);
      innerShadow.setAttribute("cy", cy);
      innerShadow.setAttribute("r", innerRadius + 1);
      innerShadow.setAttribute("fill", "none");
      innerShadow.setAttribute("stroke", "rgba(0,0,0,0.4)");
      innerShadow.setAttribute("stroke-width", "3");
      innerShadow.style.filter = "blur(2px)";
      pieSegmentsContainer.appendChild(innerShadow);
    }

    function animatePieChart() {
      if (pieAnimated) return;
      pieAnimated = true;
      
      createPieSegments();
      
      // Stagger animation for each segment
      const segments = pieSegmentsContainer.querySelectorAll('.pie-segment-path');
      segments.forEach((seg, index) => {
        setTimeout(() => {
          seg.classList.add('animated');
          seg.style.animation = `segmentFadeIn 0.6s ease-out forwards`;
        }, index * 100);
      });
    }

    // Add keyframe for segment animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes segmentFadeIn {
        from { opacity: 0; transform: scale(0.92); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(styleSheet);

    // Legend row hover highlights pie segment with glow
    const legendRows = document.querySelectorAll('.legend-row[data-segment]');
    const segmentGlows = {
      'ecosystem': 'brightness(1.25) drop-shadow(0 0 25px #00FF88) drop-shadow(0 0 50px rgba(0, 255, 136, 0.7))',
      'presale': 'brightness(1.25) drop-shadow(0 0 25px #00D4FF) drop-shadow(0 0 50px rgba(0, 212, 255, 0.7))',
      'treasury': 'brightness(1.25) drop-shadow(0 0 25px #B84FFF) drop-shadow(0 0 50px rgba(184, 79, 255, 0.7))',
      'dao': 'brightness(1.25) drop-shadow(0 0 25px #FFA502) drop-shadow(0 0 50px rgba(255, 165, 2, 0.7))',
      'development': 'brightness(1.25) drop-shadow(0 0 25px #8B95A5) drop-shadow(0 0 50px rgba(139, 149, 165, 0.7))',
      'team': 'brightness(1.25) drop-shadow(0 0 25px #FF4757) drop-shadow(0 0 50px rgba(255, 71, 87, 0.7))'
    };
    
    legendRows.forEach(row => {
      const segmentId = `seg-${row.dataset.segment}`;
      const segmentName = row.dataset.segment;
      
      row.addEventListener('mouseenter', () => {
        const segment = document.getElementById(segmentId);
        if (segment) {
          segment.style.filter = segmentGlows[segmentName] || 'brightness(1.25)';
          segment.style.transform = 'scale(1.05)';
          segment.style.transformOrigin = 'center';
          segment.style.transformBox = 'fill-box';
        }
      });
      
      row.addEventListener('mouseleave', () => {
        const segment = document.getElementById(segmentId);
        if (segment) {
          segment.style.filter = '';
          segment.style.transform = '';
        }
      });
    });

    // Pie segment hover highlights legend row
    document.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('pie-segment-path')) {
        const segmentName = e.target.dataset.segment;
        const legendRow = document.querySelector(`.legend-row.${segmentName}`);
        if (legendRow) {
          legendRow.style.transform = 'translateX(12px)';
          legendRow.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
      }
    });
    
    document.addEventListener('mouseout', (e) => {
      if (e.target.classList.contains('pie-segment-path')) {
        const segmentName = e.target.dataset.segment;
        const legendRow = document.querySelector(`.legend-row.${segmentName}`);
        if (legendRow) {
          legendRow.style.transform = '';
          legendRow.style.boxShadow = '';
        }
      }
    });

    // ═══════════════════════════════════════════════════════════════
    // HARDWARE TIER CARDS EXPANSION
    // ═══════════════════════════════════════════════════════════════
    const hardwareCards = document.querySelectorAll('.hardware-card');
    const isMobile = window.innerWidth < 900;
    
    hardwareCards.forEach(card => {
      card.addEventListener('click', () => {
        const isExpanded = card.classList.contains('expanded');
        
        // Mobile: accordion behavior - close others first
        if (isMobile) {
          hardwareCards.forEach(c => {
            if (c !== card) c.classList.remove('expanded');
          });
        }
        
        // Toggle current card
        if (isExpanded) {
          card.classList.remove('expanded');
        } else {
          card.classList.add('expanded');
        }
      });
    });

    // ═══════════════════════════════════════════════════════════════
    // CONTACT MODAL
    // ═══════════════════════════════════════════════════════════════
    document.addEventListener('DOMContentLoaded', () => {
      const contactModalTrigger = document.getElementById('contactModalTrigger');
      const contactModalOverlay = document.getElementById('contactModalOverlay');
      const contactModalClose = document.getElementById('contactModalClose');
      const additionalTriggers = document.querySelectorAll('.contact-modal-trigger');
      
      // Function to open modal
      const openModal = (e) => {
        e.preventDefault();
        contactModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      };
      
      // Function to close modal
      const closeModal = () => {
        contactModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      };
      
      if (contactModalOverlay) {
        // Original footer trigger
        if (contactModalTrigger) {
          contactModalTrigger.addEventListener('click', openModal);
        }
        
        // Additional triggers (Contact Sales button, etc.)
        additionalTriggers.forEach(trigger => {
          trigger.addEventListener('click', openModal);
        });
        
        // Close button
        contactModalClose.addEventListener('click', closeModal);
        
        // Click outside to close
        contactModalOverlay.addEventListener('click', (e) => {
          if (e.target === contactModalOverlay) closeModal();
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && contactModalOverlay.classList.contains('active')) {
            closeModal();
          }
        });
      }
    });

    // ═══════════════════════════════════════════════════════════════
    // LEGAL MODALS (Privacy, Terms, Cookie)
    // ═══════════════════════════════════════════════════════════════
    document.addEventListener('DOMContentLoaded', () => {
      const legalTriggers = document.querySelectorAll('.legal-trigger');
      const legalOverlays = {
        privacy: document.getElementById('privacyModalOverlay'),
        terms: document.getElementById('termsModalOverlay'),
        cookie: document.getElementById('cookieModalOverlay')
      };
      
      // Open modal function
      const openLegalModal = (modalType) => {
        const overlay = legalOverlays[modalType];
        if (overlay) {
          overlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      };
      
      // Close modal function
      const closeLegalModal = (overlay) => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      };
      
      // Attach click handlers to triggers
      legalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const modalType = trigger.getAttribute('data-modal');
          openLegalModal(modalType);
        });
      });
      
      // Attach close handlers
      Object.values(legalOverlays).forEach(overlay => {
        if (!overlay) return;
        
        // Close button
        const closeBtn = overlay.querySelector('[data-close-modal]');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => closeLegalModal(overlay));
        }
        
        // Click outside
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) closeLegalModal(overlay);
        });
      });
      
      // Escape key to close any open legal modal
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          Object.values(legalOverlays).forEach(overlay => {
            if (overlay && overlay.classList.contains('active')) {
              closeLegalModal(overlay);
            }
          });
        }
      });
    });

// Wallet Connection
    // Wallet State
    let walletConnected = false;
    let walletAddress = null;
    let currentNetwork = null;
    
    // Network names
    const networks = {
      1: { name: 'Ethereum', class: 'mainnet' },
      5: { name: 'Goerli', class: '' },
      11155111: { name: 'Sepolia', class: '' },
      137: { name: 'Polygon', class: 'mainnet' },
      80001: { name: 'Mumbai', class: '' },
      42161: { name: 'Arbitrum', class: 'mainnet' },
      10: { name: 'Optimism', class: 'mainnet' },
      8453: { name: 'Base', class: 'mainnet' },
      84532: { name: 'Base Sepolia', class: '' }
    };
    
    // Truncate address
    function truncateAddress(address) {
      return address.slice(0, 6) + '...' + address.slice(-4);
    }
    
    // Handle wallet button click
    function handleWalletClick() {
      if (walletConnected) {
        // Show connected modal
        document.getElementById('walletConnectState').style.display = 'none';
        document.getElementById('walletConnectedState').style.display = 'block';
        document.getElementById('fullAddress').textContent = walletAddress;
        updateNetworkDisplay();
      } else {
        // Show connect options
        document.getElementById('walletConnectState').style.display = 'block';
        document.getElementById('walletConnectedState').style.display = 'none';
      }
      document.getElementById('walletModal').classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    // Close wallet modal
    function closeWalletModal() {
      document.getElementById('walletModal').classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Update network display
    function updateNetworkDisplay() {
      const networkInfo = document.getElementById('networkInfo');
      if (currentNetwork && networks[currentNetwork]) {
        const net = networks[currentNetwork];
        const isTestnet = !net.class;
        networkInfo.innerHTML = `<span class="network-badge ${net.class}">${net.name}${isTestnet ? ' Testnet' : ''}</span>`;
      } else if (currentNetwork) {
        networkInfo.innerHTML = `<span class="network-badge">Chain ${currentNetwork}</span>`;
      }
    }
    
    // Update nav button
    function updateNavButton() {
      const btn = document.getElementById('connectWalletBtn');
      if (walletConnected && walletAddress) {
        const net = networks[currentNetwork];
        const isTestnet = net && !net.class;
        btn.classList.add('connected');
        btn.innerHTML = `
          <span class="wallet-dot"></span>
          <span class="wallet-address">${truncateAddress(walletAddress)}</span>
          ${isTestnet ? `<span class="network-badge">${net ? net.name : 'Testnet'}</span>` : ''}
        `;
      } else {
        btn.classList.remove('connected');
        btn.innerHTML = 'Connect Wallet';
      }
    }
    
    // Connect MetaMask
    async function connectMetaMask() {
      if (typeof window.ethereum === 'undefined') {
        alert('MetaMask is not installed. Please install MetaMask to connect your wallet.');
        window.open('https://metamask.io/download/', '_blank');
        return;
      }
      
      try {
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        // Get network
        const chainId = await window.ethereum.request({ 
          method: 'eth_chainId' 
        });
        
        walletAddress = accounts[0];
        currentNetwork = parseInt(chainId, 16);
        walletConnected = true;
        
        updateNavButton();
        closeWalletModal();
        
        // Show success message
        showToast('Wallet connected successfully!');
        
      } catch (error) {
        console.error('Connection error:', error);
        if (error.code === 4001) {
          showToast('Connection rejected by user', 'error');
        } else {
          showToast('Failed to connect wallet', 'error');
        }
      }
    }
    
    // Disconnect wallet
    function disconnectWallet() {
      walletConnected = false;
      walletAddress = null;
      currentNetwork = null;
      updateNavButton();
      closeWalletModal();
      showToast('Wallet disconnected');
    }
    
    // Toast notification
    function showToast(message, type = 'success') {
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        padding: 14px 28px;
        background: ${type === 'success' ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 71, 87, 0.15)'};
        border: 1px solid ${type === 'success' ? 'var(--green-30)' : 'rgba(255, 71, 87, 0.3)'};
        color: ${type === 'success' ? '#00FF88' : '#FF4757'};
        border-radius: 100px;
        font-size: 14px;
        font-weight: 500;
        z-index: 100000;
        animation: toastIn 0.3s ease;
      `;
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }
    
    // Add toast animations
    const toastStyles = document.createElement('style');
    toastStyles.textContent = `
      @keyframes toastIn {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
      @keyframes toastOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(20px); }
      }
    `;
    document.head.appendChild(toastStyles);
    
    // Listen for account changes
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          walletAddress = accounts[0];
          updateNavButton();
          showToast('Account changed');
        }
      });
      
      window.ethereum.on('chainChanged', (chainId) => {
        currentNetwork = parseInt(chainId, 16);
        updateNavButton();
        showToast(`Switched to ${networks[currentNetwork]?.name || 'Chain ' + currentNetwork}`);
      });
    }
    
    // Close modal on overlay click
    document.getElementById('walletModal').addEventListener('click', (e) => {
      if (e.target.id === 'walletModal') {
        closeWalletModal();
      }
    });
    
    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.getElementById('walletModal').classList.contains('active')) {
        closeWalletModal();
      }
    });

    // ═══════════════════════════════════════════════════════════════
    // BACK TO TOP BUTTON
    // ═══════════════════════════════════════════════════════════════
    document.addEventListener('DOMContentLoaded', () => {
      const backToTopBtn = document.getElementById('backToTop');
      
      if (backToTopBtn) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
          } else {
            backToTopBtn.classList.remove('visible');
          }
        });
        
        backToTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    });
