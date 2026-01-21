/**
 * TAG IT Network Documentation Builder
 * Converts Markdown content to HTML pages with the docs template
 * 
 * Usage: node scripts/build.js
 */

const fs = require('fs');
const path = require('path');
const { Marked } = require('marked');
const { markedHighlight } = require('marked-highlight');
const hljs = require('highlight.js');
const matter = require('gray-matter');
const { glob } = require('glob');

// ═══════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  contentDir: path.join(__dirname, '../content'),
  outputDir: path.join(__dirname, '..'),
  templateDir: path.join(__dirname, '../templates'),
  configDir: path.join(__dirname, '../config'),
};

// ═══════════════════════════════════════════════════════════════
// MARKED CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      // Handle mermaid specially
      if (lang === 'mermaid') {
        return code; // Don't highlight, will be processed by mermaid.js
      }
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

// Custom renderer for special elements
const renderer = {
  // Wrap mermaid code blocks
  code(code, language) {
    if (language === 'mermaid') {
      return `<div class="mermaid">\n${code}\n</div>\n`;
    }
    const highlighted = hljs.getLanguage(language) 
      ? hljs.highlight(code, { language }).value 
      : code;
    return `<div class="code-block">
      <div class="code-header">
        <span class="code-lang">${language || 'text'}</span>
        <button class="code-copy-btn" onclick="copyCode(this)">Copy</button>
      </div>
      <pre><code class="hljs language-${language || 'text'}">${highlighted}</code></pre>
    </div>\n`;
  },

  // Add IDs to headings for TOC links
  heading(text, level) {
    const slug = text
      .toLowerCase()
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove duplicate hyphens
      .trim();
    
    return `<h${level} id="${slug}">${text}</h${level}>\n`;
  },

  // Style tables
  table(header, body) {
    return `<div class="table-wrapper">
      <table class="docs-table">
        <thead>${header}</thead>
        <tbody>${body}</tbody>
      </table>
    </div>\n`;
  },

  // Add target blank to external links
  link(href, title, text) {
    const isExternal = href.startsWith('http') && !href.includes('tagit.network');
    const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    const titleAttr = title ? ` title="${title}"` : '';
    return `<a href="${href}"${titleAttr}${attrs}>${text}</a>`;
  }
};

marked.use({ renderer });

// ═══════════════════════════════════════════════════════════════
// TEMPLATE LOADING
// ═══════════════════════════════════════════════════════════════

function loadTemplate(name) {
  const templatePath = path.join(CONFIG.templateDir, `${name}.html`);
  if (fs.existsSync(templatePath)) {
    return fs.readFileSync(templatePath, 'utf-8');
  }
  // Return default template if file doesn't exist
  return getDefaultTemplate();
}

function getDefaultTemplate() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}} | TAG IT Network Docs</title>
    <meta name="description" content="{{description}}">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link rel="stylesheet" href="/css/docs.css">

    <!-- Mermaid -->
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
</head>
<body class="docs-page">
    <!-- Header -->
    <header class="docs-header">
        <div class="docs-header-inner">
            <a href="/" class="docs-logo">
                <span class="docs-logo-icon">◆</span>
                <span class="docs-logo-text">TAG IT</span>
                <span class="docs-logo-badge">DOCS</span>
            </a>
            
            <nav class="docs-header-nav">
                <a href="/docs/" class="docs-header-link">Docs</a>
                <a href="/docs/api/overview.html" class="docs-header-link">API</a>
                <a href="https://github.com/tagit-network" class="docs-header-link" target="_blank">GitHub</a>
            </nav>
            
            <button id="docsSearchTrigger" class="docs-search-trigger">
                <span class="docs-search-icon">⌘K</span>
                <span>Search docs...</span>
            </button>
        </div>
    </header>

    <div class="docs-layout">
        <!-- Sidebar -->
        <aside class="docs-sidebar" id="docsSidebar">
            <nav class="docs-nav">
                {{sidebar}}
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="docs-main">
            <article class="docs-content">
                <!-- Breadcrumb -->
                <nav class="docs-breadcrumb">
                    <a href="/docs/">Docs</a>
                    <span class="docs-breadcrumb-sep">/</span>
                    <a href="/docs/{{category_slug}}/">{{category}}</a>
                    <span class="docs-breadcrumb-sep">/</span>
                    <span>{{title}}</span>
                </nav>

                <!-- Content -->
                {{content}}

                <!-- Pagination -->
                <nav class="docs-pagination">
                    {{#if prev}}
                    <a href="{{prev.url}}" class="docs-pagination-link docs-pagination-prev">
                        <span class="docs-pagination-label">Previous</span>
                        <span class="docs-pagination-title">{{prev.title}}</span>
                    </a>
                    {{/if}}
                    {{#if next}}
                    <a href="{{next.url}}" class="docs-pagination-link docs-pagination-next">
                        <span class="docs-pagination-label">Next</span>
                        <span class="docs-pagination-title">{{next.title}}</span>
                    </a>
                    {{/if}}
                </nav>

                <!-- Footer -->
                <footer class="docs-footer">
                    <p>Last updated: {{lastUpdated}}</p>
                    <p><a href="https://github.com/tagit-network/docs/edit/main/{{sourcePath}}">Edit this page on GitHub</a></p>
                </footer>
            </article>

            <!-- Table of Contents -->
            <aside class="docs-toc">
                <div class="docs-toc-title">On this page</div>
                <nav class="docs-toc-nav">
                    {{toc}}
                </nav>
            </aside>
        </main>
    </div>

    <!-- Search Modal -->
    <div id="docsSearchModal" class="docs-search-modal">
        <div class="docs-search-modal-content">
            <input type="text" id="docsSearchInput" placeholder="Search documentation..." autocomplete="off">
            <button id="docsSearchClose" class="docs-search-close">&times;</button>
            <div id="docsSearchResults" class="docs-search-results"></div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="/docs/js/search-index.js"></script>
    <script src="/docs/js/docs.js"></script>
    <script>
        // Initialize Mermaid with dark theme
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            themeVariables: {
                primaryColor: '#00ff88',
                primaryTextColor: '#e0e0e0',
                primaryBorderColor: '#00ff88',
                lineColor: '#404040',
                secondaryColor: '#1a1a2e',
                tertiaryColor: '#0d0d1a',
                background: '#0d0d1a',
                mainBkg: '#1a1a2e',
                nodeBorder: '#00ff88',
                clusterBkg: '#1a1a2e',
                clusterBorder: '#00d4ff',
                titleColor: '#00ff88',
                edgeLabelBackground: '#1a1a2e'
            }
        });
    </script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════
// SIDEBAR GENERATION
// ═══════════════════════════════════════════════════════════════

function loadNavigation() {
  const navPath = path.join(CONFIG.configDir, 'navigation.json');
  if (fs.existsSync(navPath)) {
    return JSON.parse(fs.readFileSync(navPath, 'utf-8'));
  }
  return { navigation: { main: [] } };
}

function generateSidebar(nav, currentSlug) {
  let html = '';
  
  for (const section of nav.navigation.main) {
    const isExpanded = currentSlug.startsWith(section.slug);
    html += `<div class="docs-nav-section${isExpanded ? ' expanded' : ''}">
      <button class="docs-nav-section-title" aria-expanded="${isExpanded}">
        <span class="docs-nav-icon">${getIcon(section.icon)}</span>
        <span>${section.title}</span>
        <span class="docs-nav-arrow">▸</span>
      </button>
      <div class="docs-nav-items">`;
    
    for (const item of section.children) {
      const itemSlug = `${section.slug}/${item.slug}`;
      const isActive = currentSlug === itemSlug;
      const statusBadge = item.status === 'placeholder' ? '<span class="docs-nav-badge">Soon</span>' : '';
      
      html += `<a href="/docs/${item.file}" class="docs-nav-link${isActive ? ' active' : ''}">
        ${item.title}${statusBadge}
      </a>`;
    }
    
    html += `</div></div>`;
  }
  
  return html;
}

function getIcon(iconName) {
  const icons = {
    'rocket': '🚀',
    'layers': '◇',
    'code': '⟨/⟩',
    'cpu': '◈',
    'terminal': '⌘',
    'package': '📦',
    'users': '👥',
    'coins': '◉',
    'book-open': '📖',
    'book': '📚'
  };
  return icons[iconName] || '•';
}

// ═══════════════════════════════════════════════════════════════
// TABLE OF CONTENTS GENERATION
// ═══════════════════════════════════════════════════════════════

function generateTOC(content) {
  const headingRegex = /<h([2-3])\s+id="([^"]+)"[^>]*>([^<]+)<\/h[2-3]>/gi;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, '') // Strip any HTML
    });
  }
  
  if (headings.length === 0) return '';
  
  let html = '<ul class="docs-toc-list">';
  
  for (const heading of headings) {
    const indent = heading.level === 3 ? ' class="docs-toc-subitem"' : '';
    html += `<li${indent}><a href="#${heading.id}" class="docs-toc-link">${heading.text}</a></li>`;
  }
  
  html += '</ul>';
  return html;
}

// ═══════════════════════════════════════════════════════════════
// BUILD FUNCTIONS
// ═══════════════════════════════════════════════════════════════

async function buildPage(mdPath, nav) {
  console.log(`Building: ${mdPath}`);
  
  // Read markdown file
  const mdContent = fs.readFileSync(mdPath, 'utf-8');
  
  // Parse frontmatter if present
  const { data: frontmatter, content: markdown } = matter(mdContent);
  
  // Convert markdown to HTML
  const htmlContent = marked.parse(markdown);
  
  // Extract title from first H1 or frontmatter
  let title = frontmatter.title;
  if (!title) {
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    title = titleMatch ? titleMatch[1] : 'Documentation';
  }
  
  // Determine category from path
  const relativePath = path.relative(CONFIG.contentDir, mdPath);
  const pathParts = relativePath.split(path.sep);
  const category = pathParts[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const categorySlug = pathParts[0];
  
  // Generate slug for sidebar highlighting
  const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
  
  // Generate sidebar
  const sidebar = generateSidebar(nav, slug);
  
  // Generate TOC
  const toc = generateTOC(htmlContent);
  
  // Load and populate template
  let template = loadTemplate('docs-page');
  
  // Simple template replacement
  const replacements = {
    '{{title}}': title,
    '{{description}}': frontmatter.description || `${title} - TAG IT Network Documentation`,
    '{{category}}': category,
    '{{category_slug}}': categorySlug,
    '{{content}}': htmlContent,
    '{{sidebar}}': sidebar,
    '{{toc}}': toc,
    '{{lastUpdated}}': frontmatter.lastUpdated || new Date().toISOString().split('T')[0],
    '{{sourcePath}}': `content/${relativePath}`
  };
  
  for (const [key, value] of Object.entries(replacements)) {
    template = template.split(key).join(value);
  }
  
  // Handle conditional blocks (simplified)
  template = template.replace(/\{\{#if prev\}\}[\s\S]*?\{\{\/if\}\}/g, '');
  template = template.replace(/\{\{#if next\}\}[\s\S]*?\{\{\/if\}\}/g, '');
  
  // Determine output path
  const outputRelative = relativePath.replace(/\.md$/, '.html');
  const outputPath = path.join(CONFIG.outputDir, outputRelative);
  
  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write HTML file
  fs.writeFileSync(outputPath, template);
  console.log(`  → ${outputPath}`);
  
  return { title, slug, outputPath };
}

async function build() {
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  TAG IT Network Documentation Builder');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  // Load navigation
  const nav = loadNavigation();
  
  // Find all markdown files
  const mdFiles = await glob('**/*.md', { cwd: CONFIG.contentDir });
  
  console.log(`Found ${mdFiles.length} markdown files\n`);
  
  const results = [];
  
  for (const mdFile of mdFiles) {
    const mdPath = path.join(CONFIG.contentDir, mdFile);
    try {
      const result = await buildPage(mdPath, nav);
      results.push(result);
    } catch (err) {
      console.error(`Error building ${mdFile}:`, err.message);
    }
  }
  
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`  Build complete! ${results.length} pages generated.`);
  console.log('═══════════════════════════════════════════════════════════════\n');
}

// Run build
build().catch(console.error);
