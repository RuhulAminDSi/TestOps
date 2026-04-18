document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initMobileMenu();
  initAccordion();
  initNavHighlighter();
  initUserMenu();
  initSearch();
  initChat();
  initKeyboardNav();
  initPageRouter();
  initModal();
  highlightSidebarActive();
  
  window.addEventListener('popstate', () => {
    initPageRouter();
    highlightSidebarActive();
  });
});

function initPageRouter() {
  const main = document.querySelector('.content');
  if (!main) return;

  const sections = main.querySelectorAll('.page-section');
  if (!sections.length) return;

  const currentPath = window.location.pathname;
  let activeSection = 'page-dashboard';

  if (currentPath === '/projects' || currentPath.startsWith('/projects')) {
    activeSection = 'page-projects';
  } else if (currentPath === '/scripts' || currentPath.startsWith('/scripts')) {
    activeSection = 'page-scripts';
  } else if (currentPath === '/execution' || currentPath.startsWith('/execution')) {
    activeSection = 'page-execution';
  } else if (currentPath === '/monitoring' || currentPath.startsWith('/monitoring')) {
    if (currentPath === '/monitoring' || currentPath === '/monitoring/') {
      activeSection = 'page-monitoring';
    } else if (currentPath.includes('/monitoring/audit-logs')) {
      activeSection = 'page-monitoring-audit-logs';
    } else if (currentPath.includes('/monitoring/audit-stats')) {
      activeSection = 'page-monitoring-audit-stats';
    } else {
      activeSection = 'page-monitoring';
    }
  } else if (currentPath.startsWith('/ui-automation')) {
    if (currentPath === '/ui-automation' || currentPath === '/ui-automation/') {
      activeSection = 'page-ui-automation';
    } else if (currentPath.includes('/ui-automation/dashboard')) {
      activeSection = 'page-ui-automation-dashboard';
    } else if (currentPath.includes('/ui-automation/test-cases')) {
      activeSection = 'page-ui-automation-test-cases';
    } else if (currentPath.includes('/ui-automation/scripts')) {
      activeSection = 'page-ui-automation-scripts';
    } else if (currentPath.includes('/ui-automation/test-suites')) {
      activeSection = 'page-ui-automation-test-suites';
    } else if (currentPath.includes('/ui-automation/ai-testing')) {
      activeSection = 'page-ui-automation-ai-testing';
    } else if (currentPath.includes('/ui-automation/execution-history')) {
      activeSection = 'page-ui-automation-execution-history';
    } else if (currentPath.includes('/ui-automation/object-repository')) {
      activeSection = 'page-ui-automation-object-repository';
    } else if (currentPath.includes('/ui-automation/test-data')) {
      activeSection = 'page-ui-automation-test-data';
    } else if (currentPath.includes('/ui-automation/scheduler')) {
      activeSection = 'page-ui-automation-scheduler';
    } else if (currentPath.includes('/ui-automation/reports')) {
      activeSection = 'page-ui-automation-reports';
    } else {
      activeSection = 'page-ui-automation';
    }
  } else if (currentPath.startsWith('/api-automation')) {
    if (currentPath === '/api-automation' || currentPath === '/api-automation/') {
      activeSection = 'page-api-automation';
    } else if (currentPath.includes('/api-automation/dashboard')) {
      activeSection = 'page-api-automation-dashboard';
    } else if (currentPath.includes('/api-automation/collections')) {
      activeSection = 'page-api-automation-collections';
    } else if (currentPath.includes('/api-automation/requests')) {
      activeSection = 'page-api-automation-requests';
    } else if (currentPath.includes('/api-automation/test-suites')) {
      activeSection = 'page-api-automation-test-suites';
    } else if (currentPath.includes('/api-automation/mock-server')) {
      activeSection = 'page-api-automation-mock-server';
    } else if (currentPath.includes('/api-automation/monitoring')) {
      activeSection = 'page-api-automation-monitoring';
    } else if (currentPath.includes('/api-automation/ai-testing')) {
      activeSection = 'page-api-automation-ai-testing';
    } else if (currentPath.includes('/api-automation/data-chaining')) {
      activeSection = 'page-api-automation-data-chaining';
    } else if (currentPath.includes('/api-automation/schema-validation')) {
      activeSection = 'page-api-automation-schema-validation';
    } else if (currentPath.includes('/api-automation/scripts')) {
      activeSection = 'page-api-automation-scripts';
    } else if (currentPath.includes('/api-automation/environment')) {
      activeSection = 'page-api-automation-environment';
    } else if (currentPath.includes('/api-automation/reports')) {
      activeSection = 'page-api-automation-reports';
    } else {
      activeSection = 'page-api-automation';
    }
  } else if (currentPath.startsWith('/load-testing')) {
    if (currentPath === '/load-testing' || currentPath === '/load-testing/') {
      activeSection = 'page-load-testing';
    } else if (currentPath.includes('/load-testing/dashboard')) {
      activeSection = 'page-load-testing-dashboard';
    } else if (currentPath.includes('/load-testing/test-plans')) {
      activeSection = 'page-load-testing-test-plans';
    } else if (currentPath.includes('/load-testing/configuration')) {
      activeSection = 'page-load-testing-configuration';
    } else if (currentPath.includes('/load-testing/run-monitor')) {
      activeSection = 'page-load-testing-run-monitor';
    } else if (currentPath.includes('/load-testing/results')) {
      activeSection = 'page-load-testing-results';
    } else if (currentPath.includes('/load-testing/distributed')) {
      activeSection = 'page-load-testing-distributed';
    } else if (currentPath.includes('/load-testing/templates')) {
      activeSection = 'page-load-testing-templates';
    } else if (currentPath.includes('/load-testing/ai-testing')) {
      activeSection = 'page-load-testing-ai-testing';
    } else {
      activeSection = 'page-load-testing';
    }
  } else if (currentPath.startsWith('/ai-sql')) {
    if (currentPath === '/ai-sql' || currentPath === '/ai-sql/') {
      activeSection = 'page-ai-sql';
    } else if (currentPath.includes('/ai-sql/runner')) {
      activeSection = 'page-ai-sql-runner';
    } else if (currentPath.includes('/ai-sql/query-generator')) {
      activeSection = 'page-ai-sql-query-generator';
    } else if (currentPath.includes('/ai-sql/scripts')) {
      activeSection = 'page-ai-sql-scripts';
    } else if (currentPath.includes('/ai-sql/history')) {
      activeSection = 'page-ai-sql-history';
    } else if (currentPath.includes('/ai-sql/explorer')) {
      activeSection = 'page-ai-sql-explorer';
    } else if (currentPath.includes('/ai-sql/validation')) {
      activeSection = 'page-ai-sql-validation';
    } else if (currentPath.includes('/ai-sql/migration')) {
      activeSection = 'page-ai-sql-migration';
    } else if (currentPath.includes('/ai-sql/performance')) {
      activeSection = 'page-ai-sql-performance';
    } else {
      activeSection = 'page-ai-sql';
    }
  } else if (currentPath.startsWith('/settings')) {
    if (currentPath === '/settings' || currentPath === '/settings/') {
      activeSection = 'page-settings';
    } else if (currentPath.includes('/settings/general')) {
      activeSection = 'page-settings-general';
    } else if (currentPath.includes('/settings/projects')) {
      activeSection = 'page-settings-projects';
    } else if (currentPath.includes('/settings/credentials')) {
      activeSection = 'page-settings-credentials';
    } else if (currentPath.includes('/settings/ai-config')) {
      activeSection = 'page-settings-ai-config';
    } else if (currentPath.includes('/settings/execution')) {
      activeSection = 'page-settings-execution';
    } else if (currentPath.includes('/settings/integrations')) {
      activeSection = 'page-settings-integrations';
    } else if (currentPath.includes('/settings/notifications')) {
      activeSection = 'page-settings-notifications';
    } else if (currentPath.includes('/settings/users')) {
      activeSection = 'page-settings-users';
    } else if (currentPath.includes('/settings/security')) {
      activeSection = 'page-settings-security';
    } else if (currentPath.includes('/settings/logs')) {
      activeSection = 'page-settings-logs';
    } else {
      activeSection = 'page-settings';
    }
  } else if (currentPath.startsWith('/security-automation')) {
    if (currentPath === '/security-automation' || currentPath === '/security-automation/') {
      activeSection = 'page-security-automation';
    } else if (currentPath.includes('/security-automation/vuln-scanner')) {
      activeSection = 'page-security-automation-vuln-scanner';
    } else if (currentPath.includes('/security-automation/headers')) {
      activeSection = 'page-security-automation-headers';
    } else if (currentPath.includes('/security-automation/port-scanner')) {
      activeSection = 'page-security-automation-port-scanner';
    } else if (currentPath.includes('/security-automation/ssl-check')) {
      activeSection = 'page-security-automation-ssl-check';
    } else if (currentPath.includes('/security-automation/password-check')) {
      activeSection = 'page-security-automation-password-check';
    } else if (currentPath.includes('/security-automation/jwt-analyzer')) {
      activeSection = 'page-security-automation-jwt-analyzer';
    } else if (currentPath.includes('/security-automation/input-test')) {
      activeSection = 'page-security-automation-input-test';
    } else if (currentPath.includes('/security-automation/subdomain')) {
      activeSection = 'page-security-automation-subdomain';
    } else if (currentPath.includes('/security-automation/reports')) {
      activeSection = 'page-security-automation-reports';
    } else {
      activeSection = 'page-security-automation';
    }
  }

  sections.forEach(section => {
    section.style.display = section.id === activeSection ? 'block' : 'none';
  });
}

function highlightSidebarActive() {
  const currentPath = window.location.pathname;
  
  document.querySelectorAll('.nav-link, .nav-child').forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
  });

  let activeLink = null;

  if (currentPath === '/' || currentPath === '' || currentPath === '/index') {
    activeLink = document.querySelector('.nav-link[href="/"]');
  } else if (currentPath === '/projects') {
    activeLink = document.querySelector('.nav-link[href="/projects"]');
  } else if (currentPath.startsWith('/monitoring')) {
    const monitoringPaths = [
      '/monitoring',
      '/monitoring/audit-logs',
      '/monitoring/audit-stats'
    ];
    for (const p of monitoringPaths) {
      if (currentPath.includes(p)) {
        activeLink = document.querySelector(`.nav-child[href="${p}"]`);
        break;
      }
    }
    if (!activeLink) {
      activeLink = document.querySelector('.nav-child[href="/monitoring"]');
    }
  } else if (currentPath === '/scripts' || currentPath.startsWith('/scripts')) {
    activeLink = document.querySelector('.nav-link[href="/scripts"]');
  } else if (currentPath.startsWith('/ui-automation')) {
    const uiPaths = [
      '/ui-automation/dashboard',
      '/ui-automation/test-cases',
      '/ui-automation/scripts',
      '/ui-automation/test-suites',
      '/ui-automation/ai-testing',
      '/ui-automation/execution-history',
      '/ui-automation/object-repository',
      '/ui-automation/test-data',
      '/ui-automation/scheduler',
      '/ui-automation/reports'
    ];
    for (const p of uiPaths) {
      if (currentPath.includes(p)) {
        activeLink = document.querySelector(`.nav-child[href="${p}"]`);
        break;
      }
    }
    if (!activeLink && (currentPath === '/ui-automation' || currentPath === '/ui-automation/')) {
      activeLink = document.querySelector('.nav-child[href="/ui-automation/dashboard"]');
    }
  } else if (currentPath.startsWith('/api-automation')) {
    const apiPaths = [
      '/api-automation/dashboard',
      '/api-automation/collections',
      '/api-automation/requests',
      '/api-automation/test-suites',
      '/api-automation/mock-server',
      '/api-automation/monitoring',
      '/api-automation/ai-testing',
      '/api-automation/data-chaining',
      '/api-automation/schema-validation',
      '/api-automation/scripts',
      '/api-automation/environment',
      '/api-automation/reports'
    ];
    for (const p of apiPaths) {
      if (currentPath.includes(p)) {
        activeLink = document.querySelector(`.nav-child[href="${p}"]`);
        break;
      }
    }
    if (!activeLink && (currentPath === '/api-automation' || currentPath === '/api-automation/')) {
      activeLink = document.querySelector('.nav-child[href="/api-automation/dashboard"]');
    }
  } else if (currentPath.startsWith('/load-testing')) {
    const loadPaths = [
      '/load-testing/dashboard',
      '/load-testing/test-plans',
      '/load-testing/configuration',
      '/load-testing/run-monitor',
      '/load-testing/results',
      '/load-testing/distributed',
      '/load-testing/templates',
      '/load-testing/ai-testing'
    ];
    for (const p of loadPaths) {
      if (currentPath.includes(p)) {
        activeLink = document.querySelector(`.nav-child[href="${p}"]`);
        break;
      }
    }
    if (!activeLink && (currentPath === '/load-testing' || currentPath === '/load-testing/')) {
      activeLink = document.querySelector('.nav-child[href="/load-testing/dashboard"]');
    }
  } else if (currentPath.startsWith('/ai-sql')) {
    const sqlPaths = [
      '/ai-sql/runner',
      '/ai-sql/query-generator',
      '/ai-sql/scripts',
      '/ai-sql/history',
      '/ai-sql/explorer',
      '/ai-sql/validation',
      '/ai-sql/migration',
      '/ai-sql/performance'
    ];
    for (const p of sqlPaths) {
      if (currentPath.includes(p)) {
        activeLink = document.querySelector(`.nav-child[href="${p}"]`);
        break;
      }
    }
    if (!activeLink && (currentPath === '/ai-sql' || currentPath === '/ai-sql/')) {
      activeLink = document.querySelector('.nav-child[href="/ai-sql/runner"]');
    }
  } else if (currentPath.startsWith('/settings')) {
    const settingsPaths = [
      '/settings/general',
      '/settings/projects',
      '/settings/credentials',
      '/settings/ai-config',
      '/settings/execution',
      '/settings/integrations',
      '/settings/notifications',
      '/settings/users',
      '/settings/security',
      '/settings/logs'
    ];
    for (const p of settingsPaths) {
      if (currentPath.includes(p)) {
        activeLink = document.querySelector(`.nav-child[href="${p}"]`);
        break;
      }
    }
    if (!activeLink && (currentPath === '/settings' || currentPath === '/settings/')) {
      activeLink = document.querySelector('.nav-child[href="/settings/general"]');
    }
  } else if (currentPath.startsWith('/security-automation')) {
    const securityPaths = [
      '/security-automation',
      '/security-automation/vuln-scanner',
      '/security-automation/headers',
      '/security-automation/port-scanner',
      '/security-automation/ssl-check',
      '/security-automation/password-check',
      '/security-automation/jwt-analyzer',
      '/security-automation/input-test',
      '/security-automation/subdomain',
      '/security-automation/reports'
    ];
    for (const p of securityPaths) {
      if (currentPath.includes(p)) {
        activeLink = document.querySelector(`.nav-child[href="${p}"]`);
        break;
      }
    }
    if (!activeLink && (currentPath === '/security-automation' || currentPath === '/security-automation/')) {
      activeLink = document.querySelector('.nav-child[href="/security-automation"]');
    }
  }

  if (activeLink) {
    activeLink.classList.add('active');
    activeLink.setAttribute('aria-current', 'page');
  }
}

function initMobileMenu() {
  const toggle = document.querySelector('[data-mobile-menu-toggle]');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('[data-sidebar-overlay]');
  
  if (!toggle || !sidebar) return;
  
  function closeMobileMenu() {
    sidebar.classList.remove('mobile-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  
  function openMobileMenu() {
    sidebar.classList.add('mobile-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sidebar.classList.contains('mobile-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
  
  overlay?.addEventListener('click', closeMobileMenu);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
      closeMobileMenu();
    }
  });
  
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}

function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('[data-toggle-sidebar]');
  if (!sidebar || !toggle) return;

  const nav = sidebar.querySelector('.sidebar-nav');
  const footer = sidebar.querySelector('.sidebar-footer');
  const content = document.querySelector('.content');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isCollapsed = sidebar.classList.toggle('collapsed');
    
    if (content) {
      content.classList.toggle('sidebar-collapsed', isCollapsed);
    }
    
    toggle.setAttribute('aria-expanded', !isCollapsed);
    
    const svg = toggle.querySelector('svg');
    if (svg) {
      svg.style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
    }

    document.querySelectorAll('.nav-group').forEach(group => {
      if (!isCollapsed && group.classList.contains('open')) {
        const children = group.querySelector('.nav-children');
        if (children) {
          children.style.maxHeight = children.scrollHeight + 'px';
          children.style.opacity = '1';
        }
      }
    });
  });

  if (window.matchMedia('(max-width: 768px)').matches) {
    sidebar.addEventListener('mouseenter', () => {});
    sidebar.addEventListener('mouseleave', () => {});
  }
}

function initAccordion() {
  const accordions = document.querySelectorAll('[data-accordion]');
  
  accordions.forEach(accordion => {
    const button = accordion.querySelector('.nav-parent');
    const children = accordion.querySelector('.nav-children');
    const chevron = button?.querySelector('.chevron');
    
    if (!button || !children) return;

    const init = () => {
      if (accordion.classList.contains('open')) {
        children.style.maxHeight = children.scrollHeight + 'px';
        children.style.opacity = '1';
        button.setAttribute('aria-expanded', 'true');
      } else {
        children.style.maxHeight = '0';
        children.style.opacity = '0';
        button.setAttribute('aria-expanded', 'false');
      }
    };

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const shouldOpen = !accordion.classList.contains('open');
      
      document.querySelectorAll('[data-accordion].open').forEach(openAccordion => {
        if (openAccordion !== accordion) {
          openAccordion.classList.remove('open');
          const openChildren = openAccordion.querySelector('.nav-children');
          const openButton = openAccordion.querySelector('.nav-parent');
          if (openChildren) {
            openChildren.style.maxHeight = '0';
            openChildren.style.opacity = '0';
          }
          if (openButton) {
            openButton.setAttribute('aria-expanded', 'false');
          }
        }
      });
      
      if (shouldOpen) {
        accordion.classList.add('open');
        children.style.maxHeight = children.scrollHeight + 'px';
        children.style.opacity = '1';
        button.setAttribute('aria-expanded', 'true');
      } else {
        accordion.classList.remove('open');
        children.style.maxHeight = '0';
        children.style.opacity = '0';
        button.setAttribute('aria-expanded', 'false');
      }
    });

    init();
    window.addEventListener('resize', init);
  });
}

function initNavHighlighter() {
  const navLinks = document.querySelectorAll('[data-nav]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const href = link.getAttribute('href');
      if (href) {
        history.pushState({}, '', href);
        
        const url = new URL(href, window.location.origin);
        const path = url.pathname;
        
        navLinks.forEach(l => l.classList.remove('active'));
        navLinks.forEach(l => l.removeAttribute('aria-current'));
        
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
        
        initPageRouter();
      }
    });
  });
  
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPath === href || currentPath === href + '/')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

function initKeyboardNav() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const navItems = sidebar.querySelectorAll('.nav-link, .nav-parent, .nav-child');
  
  navItems.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', item.tagName === 'BUTTON' ? 'button' : 'link');
  });

  document.addEventListener('keydown', (e) => {
    if (!sidebar.contains(document.activeElement)) return;

    const items = Array.from(navItems);
    const currentIndex = items.indexOf(document.activeElement);

    if (e.key === 'ArrowDown' && currentIndex < items.length - 1) {
      e.preventDefault();
      items[currentIndex + 1]?.focus();
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
      e.preventDefault();
      items[currentIndex - 1]?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (document.activeElement.classList.contains('nav-parent')) {
        document.activeElement.click();
      } else if (document.activeElement.classList.contains('nav-link') || document.activeElement.classList.contains('nav-child')) {
        document.activeElement.click();
      }
    } else if (e.key === 'Escape') {
      const openAccordion = document.querySelector('[data-accordion].open');
      if (openAccordion) {
        openAccordion.querySelector('.nav-parent')?.click();
      }
    }
  });
}

function initUserMenu() {
  const menuRoot = document.querySelector('[data-menu]');
  if (!menuRoot) return;

  const trigger = menuRoot.querySelector('.user-button');
  const dropdown = menuRoot.querySelector('.user-dropdown');
  if (!trigger || !dropdown) return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.hasAttribute('hidden') === false;
    dropdown.toggleAttribute('hidden', isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));
    
    if (!isOpen) {
      dropdown.querySelector('.menu-link')?.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!menuRoot.contains(e.target)) {
      dropdown.setAttribute('hidden', '');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  dropdown.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
      dropdown.setAttribute('hidden', '');
      trigger.setAttribute('aria-expanded', 'false');
    });
  });
}

function initSearch() {
  const search = document.querySelector('.search-bar input');
  const results = document.querySelector('.search-results');
  if (!search || !results) return;

  search.addEventListener('focus', () => {
    if (search.value.trim()) results.removeAttribute('hidden');
  });

  search.addEventListener('input', () => {
    if (search.value.trim()) {
      results.removeAttribute('hidden');
    } else {
      results.setAttribute('hidden', '');
    }
  });

  search.addEventListener('blur', () => {
    setTimeout(() => results.setAttribute('hidden', ''), 150);
  });
}

function initChat() {
  const form = document.getElementById('chatForm');
  const textarea = document.getElementById('chatText');
  const messages = document.getElementById('chatMessages');
  const loading = document.getElementById('loadingIndicator');
  const clear = document.getElementById('clearChat');

  if (!form || !textarea || !messages || !loading) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = textarea.value.trim();
    if (!value) return;

    appendMessage(messages, {
      role: 'user',
      name: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: value,
    });

    textarea.value = '';
    loading.removeAttribute('hidden');
    scrollToEnd(messages);

    setTimeout(() => {
      loading.setAttribute('hidden', '');
      appendMessage(messages, {
        role: 'ai',
        name: 'TestOps AI',
        time: 'Now',
        text: 'Here is your generated test. This is a placeholder response — plug in your backend to replace me.',
      });
      scrollToEnd(messages);
    }, 1200);
  });

  clear?.addEventListener('click', () => {
    const baseMessages = Array.from(messages.querySelectorAll('.message')).slice(0, 1);
    messages.innerHTML = '';
    baseMessages.forEach((node) => messages.appendChild(node));
    messages.appendChild(loading);
    loading.setAttribute('hidden', '');
  });
}

function appendMessage(container, { role, name, time, text }) {
  const article = document.createElement('article');
  article.className = `message ${role === 'user' ? 'user' : 'ai'}`;
  article.style.animation = 'slideIn 0.3s ease forwards';

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = role === 'user' ? 'U' : 'AI';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';

  const meta = document.createElement('div');
  meta.className = 'meta';
  const nameEl = document.createElement('span');
  nameEl.className = 'name';
  nameEl.textContent = name;
  const timeEl = document.createElement('span');
  timeEl.className = 'time';
  timeEl.textContent = time;
  meta.append(nameEl, timeEl);

  const body = document.createElement('p');
  body.textContent = text;

  bubble.append(meta, body);
  article.append(avatar, bubble);
  container.appendChild(article);
}

function scrollToEnd(container) {
  container.scrollTop = container.scrollHeight;
}

function initModal() {
  // Close modal function
  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };
  
  // Open edit modal function
  window.openEditModal = function(button) {
    const projectId = button.getAttribute('data-project-id');
    const projectName = button.getAttribute('data-project-name');
    const projectDesc = button.getAttribute('data-project-desc');
    const projectType = button.getAttribute('data-project-type');
    const projectStatus = button.getAttribute('data-project-status');
    
    document.getElementById('edit-project-id').value = projectId;
    document.getElementById('edit-project-name').value = projectName;
    document.getElementById('edit-project-desc').value = projectDesc || '';
    document.getElementById('edit-project-type').value = projectType;
    document.getElementById('edit-project-status').value = projectStatus || 'active';
    
    const modal = document.getElementById('edit-project-modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // Open edit test case modal function
  window.openEditTestCaseModal = function(button) {
    const testCaseId = button.getAttribute('data-id');
    const testCaseName = button.getAttribute('data-name');
    const testCaseDesc = button.getAttribute('data-description');
    const testCaseModule = button.getAttribute('data-module');
    const testCasePriority = button.getAttribute('data-priority');
    const testCaseStatus = button.getAttribute('data-status');
    
    document.getElementById('edit-test-case-id').value = testCaseId;
    document.getElementById('edit-test-case-name').value = testCaseName;
    document.getElementById('edit-test-case-desc').value = testCaseDesc || '';
    document.getElementById('edit-test-case-module').value = testCaseModule;
    document.getElementById('edit-test-case-priority').value = testCasePriority;
    document.getElementById('edit-test-case-status').value = testCaseStatus || 'Not Run';
    
    const modal = document.getElementById('edit-test-case-modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // Open delete test case modal function
  window.openDeleteTestCaseModal = function(button) {
    const testCaseId = button.getAttribute('data-id');
    const testCaseName = button.getAttribute('data-name');
    
    document.getElementById('delete-test-case-name').textContent = testCaseName;
    document.getElementById('confirm-delete-btn').onclick = async () => {
      try {
        const response = await fetch('/api/test-cases/' + testCaseId, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          const modal = document.getElementById('delete-test-case-modal');
          modal.classList.remove('open');
          document.body.style.overflow = '';
          window.location.reload();
        } else {
          alert('Failed to delete test case');
        }
      } catch (error) {
        console.error('Error deleting test case:', error);
        alert('Error deleting test case');
      }
    };
    
    const modal = document.getElementById('delete-test-case-modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  
  const modalToggles = document.querySelectorAll('[data-modal-toggle]');
  
  modalToggles.forEach(toggle => {
    const modalId = toggle.getAttribute('data-modal-toggle');
    const modal = document.getElementById(modalId);
    
    if (!modal) return;
    
    toggle.addEventListener('click', () => {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    
    const closeButtons = modal.querySelectorAll('[data-modal-close]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
  
  const projectForm = document.getElementById('new-project-form');
  if (projectForm) {
    projectForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(projectForm);
      const projectData = {
        name: formData.get('name'),
        description: formData.get('description'),
        projectType: formData.get('projectType')
      };
      
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(projectData)
        });
        
        if (response.ok) {
          const modal = document.getElementById('new-project-modal');
          modal.classList.remove('open');
          document.body.style.overflow = '';
          projectForm.reset();
          window.location.reload();
        } else {
          alert('Failed to create project');
        }
      } catch (error) {
        console.error('Error creating project:', error);
        alert('Error creating project');
      }
    });
  }
  
  // Edit project form handler
  const editProjectForm = document.getElementById('edit-project-form');
  if (editProjectForm) {
    editProjectForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const projectId = document.getElementById('edit-project-id').value;
      const formData = new FormData(editProjectForm);
      const projectData = {
        name: formData.get('name'),
        description: formData.get('description'),
        projectType: formData.get('projectType'),
        status: formData.get('status')
      };
      
      try {
        const response = await fetch('/api/projects/' + projectId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(projectData)
        });
        
        if (response.ok) {
          const modal = document.getElementById('edit-project-modal');
          modal.classList.remove('open');
          document.body.style.overflow = '';
          editProjectForm.reset();
          window.location.reload();
        } else {
          alert('Failed to update project');
        }
      } catch (error) {
        console.error('Error updating project:', error);
        alert('Error updating project');
      }
    });
  }

  // Test Case CRUD handlers
  const testCaseForm = document.getElementById('new-test-case-form');
  if (testCaseForm) {
    testCaseForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(testCaseForm);
      const testCaseData = {
        name: formData.get('name'),
        description: formData.get('description'),
        module: formData.get('module'),
        priority: formData.get('priority')
      };
      
      try {
        const response = await fetch('/api/test-cases', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(testCaseData)
        });
        
        if (response.ok) {
          const modal = document.getElementById('new-test-case-modal');
          modal.classList.remove('open');
          document.body.style.overflow = '';
          testCaseForm.reset();
          window.location.reload();
        } else {
          alert('Failed to create test case');
        }
      } catch (error) {
        console.error('Error creating test case:', error);
        alert('Error creating test case');
      }
    });
  }

  const editTestCaseForm = document.getElementById('edit-test-case-form');
  if (editTestCaseForm) {
    editTestCaseForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const testCaseId = document.getElementById('edit-test-case-id').value;
      const formData = new FormData(editTestCaseForm);
      const testCaseData = {
        name: formData.get('name'),
        description: formData.get('description'),
        module: formData.get('module'),
        priority: formData.get('priority'),
        status: formData.get('status')
      };
      
      try {
        const response = await fetch('/api/test-cases/' + testCaseId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(testCaseData)
        });
        
        if (response.ok) {
          const modal = document.getElementById('edit-test-case-modal');
          modal.classList.remove('open');
          document.body.style.overflow = '';
          editTestCaseForm.reset();
          window.location.reload();
        } else {
          alert('Failed to update test case');
        }
      } catch (error) {
        console.error('Error updating test case:', error);
        alert('Error updating test case');
      }
    });
  }

  // Script CRUD handlers
  const scriptForm = document.getElementById('new-script-form');
  if (scriptForm) {
    scriptForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(scriptForm);
      const scriptData = {
        name: formData.get('name'),
        language: formData.get('language'),
        projectId: formData.get('projectId'),
        suiteId: formData.get('suiteId') || null
      };
      
      try {
        const response = await fetch('/api/scripts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(scriptData)
        });
        
        if (response.ok) {
          const modal = document.getElementById('new-script-modal');
          modal.classList.remove('open');
          document.body.style.overflow = '';
          scriptForm.reset();
          window.location.reload();
        } else {
          alert('Failed to create script');
        }
      } catch (error) {
        console.error('Error creating script:', error);
        alert('Error creating script');
      }
    });
  }

  // Edit Script modal functions
  window.openEditScriptModal = function(btn) {
    const scriptId = btn.getAttribute('data-script-id');
    const scriptName = btn.getAttribute('data-script-name') || '';
    const scriptLanguage = btn.getAttribute('data-script-language') || 'javascript';
    const scriptProjectId = btn.getAttribute('data-script-project-id') || '';
    
    console.log('Opening edit modal for script:', scriptId, scriptName);
    
    // Set form fields
    document.getElementById('edit-script-id').value = scriptId;
    document.getElementById('edit-script-name').value = scriptName;
    document.getElementById('edit-script-language').value = scriptLanguage;
    if (scriptProjectId) {
      document.getElementById('edit-script-project').value = scriptProjectId;
    }
    
    // Also set window vars for delete
    window.lastEditScriptId = scriptId;
    window.lastEditScriptName = scriptName;
    window.lastEditBtn = btn;
    
    document.getElementById('edit-script-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.openDeleteScriptModal = function() {
    let scriptId = document.getElementById('edit-script-id').value;
    let scriptName = document.getElementById('edit-script-name').value;
    
    // Try from last clicked edit button
    if (!scriptId && window.lastEditBtn) {
      scriptId = window.lastEditBtn.getAttribute('data-script-id');
      scriptName = window.lastEditBtn.getAttribute('data-script-name');
    }
    
    console.log('Delete - scriptId:', scriptId, 'scriptName:', scriptName);
    
    if (!scriptId) {
      alert('No script selected. Please click the edit icon first.');
      return;
    }
    
    document.getElementById('delete-script-name').textContent = scriptName;
    document.getElementById('confirm-delete-script-btn').onclick = function() {
      deleteScript(scriptId);
    };
    closeModal('edit-script-modal');
    document.getElementById('delete-script-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  async function deleteScript(scriptId) {
    console.log('Deleting script:', scriptId);
    try {
      const response = await fetch('/api/scripts/' + scriptId, {
        method: 'DELETE'
      });
      if (response.ok) {
        closeModal('delete-script-modal');
        document.body.style.overflow = '';
        window.location.reload();
      } else {
        alert('Failed to delete script');
      }
    } catch (error) {
      console.error('Error deleting script:', error);
      alert('Error deleting script');
    }
  }

  const editScriptForm = document.getElementById('edit-script-form');
  if (editScriptForm) {
    editScriptForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const scriptId = document.getElementById('edit-script-id').value;
      const formData = new FormData(editScriptForm);
      const scriptData = {
        name: formData.get('name'),
        language: formData.get('language'),
        projectId: formData.get('projectId')
      };
      
      try {
        const response = await fetch('/api/scripts/' + scriptId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(scriptData)
        });
        
        if (response.ok) {
          const modal = document.getElementById('edit-script-modal');
          modal.classList.remove('open');
          document.body.style.overflow = '';
          editScriptForm.reset();
          window.location.reload();
        } else {
          alert('Failed to update script');
        }
      } catch (error) {
        console.error('Error updating script:', error);
        alert('Error updating script');
      }
    });
  }

  // Test Suite CRUD handlers
  const suiteForm = document.getElementById('new-suite-form');
  if (suiteForm) {
    suiteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(suiteForm);
      const suiteData = {
        name: formData.get('name'),
        description: formData.get('description'),
        projectId: formData.get('projectId')
      };
      
      try {
        const response = await fetch('/api/test-suites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(suiteData)
        });
        
        if (response.ok) {
          const modal = document.getElementById('new-suite-modal');
          modal.classList.remove('open');
          document.body.style.overflow = '';
          suiteForm.reset();
          window.location.reload();
        } else {
          alert('Failed to create test suite');
        }
      } catch (error) {
        console.error('Error creating test suite:', error);
        alert('Error creating test suite');
      }
    });
  }

  // Script editor functionality
  window.selectScript = function(element) {
    const scriptId = element.getAttribute('data-script-id');
    const scriptName = element.querySelector('.script-name').textContent;
    const scriptContent = element.getAttribute('data-content') || '';
    const scriptLanguage = element.getAttribute('data-language') || 'javascript';
    const scriptProjectId = element.getAttribute('data-project-id') || '';
    
    document.querySelectorAll('.script-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
    
    const lineNumbers = document.getElementById('line-numbers');
    const editorTextarea = document.getElementById('editor-textarea');
    
    document.getElementById('current-script-name').textContent = scriptName;
    editorTextarea.value = scriptContent;
    editorTextarea.dataset.scriptId = scriptId;
    updateLineNumbers(scriptContent);
    lineNumbers.scrollTop = 0;
    editorTextarea.scrollTop = 0;
    document.getElementById('run-btn').disabled = false;
    document.getElementById('save-btn').disabled = false;
    
    // Also populate edit form for delete functionality
    document.getElementById('edit-script-id').value = scriptId;
    document.getElementById('edit-script-name').value = scriptName;
    document.getElementById('edit-script-language').value = scriptLanguage;
    if (scriptProjectId) {
      document.getElementById('edit-script-project').value = scriptProjectId;
    }
    
    updateEditorHeight();
  };

  // Folder tree toggle functionality
  window.toggleFolder = function(header) {
    document.querySelectorAll('.folder-header').forEach(f => f.classList.remove('active'));
    header.classList.add('active');
    header.classList.toggle('expanded');
    const folderItem = header.closest('.folder-item');
    const scriptsList = folderItem.querySelector('.folder-scripts');
    if (scriptsList) {
      scriptsList.classList.toggle('expanded');
    }
  };

  // Set default suite when clicking New Script button
  window.setDefaultSuite = function(btn) {
    const activeFolder = document.querySelector('.folder-header.active');
    const suiteSelect = document.getElementById('script-suite');
    if (activeFolder && suiteSelect) {
      const suiteId = activeFolder.closest('.folder-item').dataset.suiteId;
      if (suiteId) {
        suiteSelect.value = suiteId;
      }
    }
  };

  // Drag and drop for moving scripts between folders
  let draggedScriptId = null;

  window.handleDragStart = function(e, element) {
    draggedScriptId = element.getAttribute('data-script-id');
    e.dataTransfer.setData('text/plain', draggedScriptId);
    e.target.classList.add('dragging');
  };

  window.handleDragOver = function(e) {
    e.preventDefault();
    const folderItem = e.target.closest('.folder-item') || e.target;
    if (folderItem && folderItem.classList.contains('folder-item')) {
      folderItem.classList.add('drag-over');
    }
  };

  window.handleDragLeave = function(e) {
    const folderItem = e.target.closest('.folder-scripts');
    if (folderItem) {
      folderItem.classList.remove('drag-over');
    }
  };

  window.handleDrop = async function(e, targetSuiteId) {
    e.preventDefault();
    
    const folderItem = e.target.closest('.folder-item');
    if (folderItem && folderItem.classList.contains('folder-item')) {
      folderItem.classList.remove('drag-over');
      if (!targetSuiteId) {
        targetSuiteId = folderItem.getAttribute('data-suite-id');
      }
    }

    if (!draggedScriptId || !targetSuiteId) return;

    try {
      const response = await fetch('/api/scripts/' + draggedScriptId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suiteId: parseInt(targetSuiteId) })
      });
      if (response.ok) {
        const draggedItem = document.querySelector('.script-item.dragging');
        if (draggedItem) {
          const targetList = document.querySelector('.folder-scripts[data-suite-id="' + targetSuiteId + '"]');
          if (targetList) {
            draggedItem.remove();
            targetList.appendChild(draggedItem);
            draggedItem.classList.remove('dragging');
            draggedItem.setAttribute('draggable', 'true');
            draggedItem.setAttribute('ondragstart', 'handleDragStart(event, this)');
          }
        }
      } else {
        alert('Failed to move script');
      }
    } catch (error) {
      console.error('Error moving script:', error);
      alert('Error moving script');
    }
    draggedScriptId = null;
  };

  // Test Suite functionality
  window.viewSuiteScripts = function(suiteId) {
    const scriptsRow = document.getElementById('suite-scripts-' + suiteId);
    if (scriptsRow) {
      scriptsRow.style.display = scriptsRow.style.display === 'none' ? 'block' : 'none';
    }
  };

  window.hideSuiteScripts = function(suiteId) {
    const scriptsRow = document.getElementById('suite-scripts-' + suiteId);
    if (scriptsRow) {
      scriptsRow.style.display = 'none';
    }
  };

  window.openEditSuiteModal = function(btn) {
    const suiteId = btn.dataset.suiteId;
    const suiteName = btn.dataset.suiteName || '';
    const suiteDesc = btn.dataset.suiteDesc || '';
    document.getElementById('edit-suite-id').value = suiteId;
    document.getElementById('edit-suite-name').value = suiteName;
    document.getElementById('edit-suite-description').value = suiteDesc;
    document.getElementById('edit-suite-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.openDeleteSuiteModal = function(btn) {
    const suiteId = btn.dataset.suiteId;
    const suiteName = btn.dataset.suiteName;
    document.getElementById('delete-suite-name').textContent = suiteName;
    document.getElementById('confirm-delete-suite-btn').onclick = function() {
      deleteSuite(suiteId);
    };
    document.getElementById('delete-suite-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  async function deleteSuite(suiteId) {
    try {
      const response = await fetch('/api/test-suites/' + suiteId, {
        method: 'DELETE'
      });
      if (response.ok) {
        const modal = document.getElementById('delete-suite-modal');
        modal.classList.remove('open');
        document.body.style.overflow = '';
        window.location.reload();
      } else {
        alert('Failed to delete test suite');
      }
    } catch (error) {
      console.error('Error deleting test suite:', error);
      alert('Error deleting test suite');
    }
  }

  // Edit Suite form handler
  const editSuiteForm = document.getElementById('edit-suite-form');
  if (editSuiteForm) {
    editSuiteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const suiteId = document.getElementById('edit-suite-id').value;
      const formData = new FormData(editSuiteForm);
      const suiteData = {
        name: formData.get('name'),
        description: formData.get('description')
      };
      try {
        const response = await fetch('/api/test-suites/' + suiteId, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(suiteData)
        });
        if (response.ok) {
          const modal = document.getElementById('edit-suite-modal');
          modal.classList.remove('open');
          document.body.style.overflow = '';
          editSuiteForm.reset();
          window.location.reload();
        } else {
          alert('Failed to update test suite');
        }
      } catch (error) {
        console.error('Error updating test suite:', error);
        alert('Error updating test suite');
      }
    });
  }

  // Suite filter handler
  const suiteFilter = document.getElementById('suite-filter');
  if (suiteFilter) {
    suiteFilter.addEventListener('change', function() {
      const selectedId = this.value;
      document.querySelectorAll('.suite-item').forEach(item => {
        if (!selectedId || item.getAttribute('data-suite-id') === selectedId) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
      document.querySelectorAll('.suite-scripts').forEach(item => {
        item.style.display = 'none';
      });
    });
  }

  const editorTextarea = document.getElementById('editor-textarea');
  const lineNumbers = document.getElementById('line-numbers');
  if (editorTextarea) {
    editorTextarea.addEventListener('input', function() {
      updateLineNumbers(this.value);
      document.getElementById('unsaved-indicator').style.display = 'inline';
    });

    editorTextarea.addEventListener('paste', function() {
      setTimeout(() => {
        updateLineNumbers(this.value);
      }, 0);
    });

    editorTextarea.addEventListener('scroll', function() {
      if (lineNumbers) {
        lineNumbers.scrollTop = this.scrollTop;
      }
    });

    editorTextarea.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 2;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        document.getElementById('save-btn').click();
      }
    });
  }

  // Save button handler
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
      const scriptId = editorTextarea.dataset.scriptId;
      const scriptContent = editorTextarea.value;
      
      if (!scriptId) {
        alert('No script selected');
        return;
      }
      
      try {
        const response = await fetch('/api/scripts/' + scriptId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: scriptContent })
        });
        
        if (response.ok) {
          document.getElementById('unsaved-indicator').style.display = 'none';
          alert('Script saved successfully');
        } else {
          alert('Failed to save script');
        }
      } catch (error) {
        console.error('Error saving script:', error);
        alert('Error saving script');
      }
    });
  }

  // Format button handler
  const formatBtn = document.getElementById('format-btn');
  if (formatBtn) {
    formatBtn.addEventListener('click', () => {
      const editor = document.getElementById('editor-textarea');
      if (!editor || !editor.value) return;
      
      const formatted = formatJavaScript(editor.value);
      editor.value = formatted;
      updateLineNumbers(formatted);
      document.getElementById('unsaved-indicator').style.display = 'inline';
    });
  }

  // JavaScript formatter function
  function formatJavaScript(code) {
    const lines = code.split('\n');
    const formattedLines = [];
    let indent = 0;
    const indentStr = '  ';
    
    for (let rawLine of lines) {
      let line = rawLine.trim();
      if (!line) {
        formattedLines.push('');
        continue;
      }
      
      // Preserve comments
      if (line.startsWith('//')) {
        formattedLines.push(indentStr.repeat(indent) + line);
        continue;
      }
      
      // Handle imports - keep them together on one line or split properly
      if (line.startsWith('import ') && line.includes(' from ')) {
        // Keep import on one line with proper spacing
        line = line.replace(/import\s*\{/g, 'import {')
                   .replace(/\}\s*from/g, '} from')
                   .replace(/from\s*'/g, "from '");
        formattedLines.push(indentStr.repeat(indent) + line);
        continue;
      }
      
      // Handle closing braces - decrease indent first
      if (line.startsWith('}')) {
        indent = Math.max(0, indent - 1);
      }
      
      // Add the line with current indent
      formattedLines.push(indentStr.repeat(indent) + line);
      
      // Handle opening braces - increase indent after
      if (line.endsWith('{') || line.includes(' {')) {
        indent++;
      }
      if (line === '{') {
        indent++;
      }
    }
    
    // Join and do basic cleanup
    let formatted = formattedLines.join('\n');
    
    // Clean up spacing around operators but keep keywords intact
    formatted = formatted
      .replace(/\s*([{};=,>])\s*/g, '$1')
      .replace(/\s*=>\s*/g, ' => ')
      .replace(/\(\s+/g, '(')
      .replace(/\s+\)/g, ')')
      .replace(/async\s+/g, 'async ')
      .replace(/await\s+/g, 'await ');
    
    // Handle import statements specifically - ensure proper spacing
    formatted = formatted
      .replace(/import\{/g, 'import {')
      .replace(/\}from/g, '} from');
    
    // Re-split and re-indent properly
    const finalLines = [];
    indent = 0;
    
    for (let rawLine of formatted.split('\n')) {
      let line = rawLine.trim();
      if (!line) {
        finalLines.push('');
        continue;
      }
      
      // Preserve comments
      if (line.startsWith('//')) {
        finalLines.push(indentStr.repeat(indent) + line);
        continue;
      }
      
      // Handle closing
      if (line.startsWith('}')) {
        indent = Math.max(0, indent - 1);
      }
      
      finalLines.push(indentStr.repeat(indent) + line);
      
      // Handle opening
      if (line.endsWith('{') || line.includes(' {')) {
        indent++;
      }
      if (line === '{') {
        indent++;
      }
    }
    
    return finalLines.join('\n').trim();
  }

  // Delete script handler
  const confirmDeleteScriptBtn = document.getElementById('confirm-delete-script-btn');
  if (confirmDeleteScriptBtn) {
    confirmDeleteScriptBtn.addEventListener('click', async () => {
      const scriptId = editorTextarea.dataset.scriptId;
      
      if (!scriptId) {
        alert('No script selected');
        return;
      }
      
      try {
        const response = await fetch('/api/scripts/' + scriptId, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          closeModal('delete-script-modal');
          closeModal('edit-script-modal');
          window.location.reload();
        } else {
          alert('Failed to delete script');
        }
      } catch (error) {
        console.error('Error deleting script:', error);
        alert('Error deleting script');
      }
    });
  }

  window.openDeleteScriptModal = function() {
    const scriptName = document.getElementById('current-script-name').textContent;
    document.getElementById('delete-script-name').textContent = scriptName;
    const modal = document.getElementById('delete-script-modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function updateEditorHeight() {
    const textarea = document.getElementById('editor-textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  function updateLineNumbers(text) {
    const lineNumbers = document.getElementById('line-numbers');
    const lines = text.split('\n').length;
    let html = '';
    for (let i = 1; i <= lines; i++) {
      html += '<span>' + i + '</span>';
    }
    lineNumbers.innerHTML = html;
  }

  // Script execution handler
  const runBtn = document.getElementById('run-btn');
  const stopBtn = document.getElementById('stop-btn');
  const logsContent = document.getElementById('logs-content');
  const resultStatus = document.getElementById('result-status');
  const executionTime = document.getElementById('execution-time');
  const stepCount = document.getElementById('step-count');

  if (runBtn) {
    runBtn.addEventListener('click', async () => {
      const scriptId = editorTextarea.dataset.scriptId;
      if (!scriptId) {
        alert('No script selected');
        return;
      }

      const browser = 'chromium';
      const headed = false;

      runBtn.disabled = true;
      stopBtn.disabled = false;
      logsContent.innerHTML = '<div class="log-entry info">[INFO] Starting execution...</div>';

      try {
        const response = await fetch(`/api/scripts/${scriptId}/execute?browser=${browser}&headed=${headed}`, {
          method: 'POST'
        });

        const result = await response.json();

        logsContent.innerHTML = result.logs.map(log => {
          let className = 'info';
          let msg = '';
          
          // Handle both string logs and object logs
          if (typeof log === 'string') {
            msg = log;
          } else if (log && typeof log === 'object') {
            msg = log.message || JSON.stringify(log);
            const type = log.type || '';
            
            if (type === 'error' || msg.includes('[FAIL]') || msg.includes('[ERROR]')) className = 'error';
            else if (type === 'warn' || msg.includes('[WARN]')) className = 'warning';
            else if (type === 'console') className = 'console';
            else if (msg.includes('[PASS]') || msg.includes('passed')) className = 'success';
            else if (type === 'info') className = 'info';
          } else {
            msg = String(log);
          }
          
          return `<div class="log-entry ${className}">${msg}</div>`;
        }).join('');

        if (result.status === 'PASS' || result.status === 'Passed') {
          resultStatus.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><span>PASSED</span>';
          resultStatus.className = 'result-status pass';
        } else {
          resultStatus.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6"/><path d="M9 9l6 6"/></svg><span>FAILED</span>';
          resultStatus.className = 'result-status fail';
        }

        executionTime.textContent = ((result.duration || result.executionTime) / 1000).toFixed(2) + 's';
        stepCount.textContent = result.logs.filter(l => (typeof l === 'string' ? l : l.message || '').includes('[INFO]')).length;

      } catch (error) {
        logsContent.innerHTML += `<div class="log-entry error">[ERROR] ${error.message}</div>`;
      }

      runBtn.disabled = false;
      stopBtn.disabled = true;
    });
  }

  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      logsContent.innerHTML += '<div class="log-entry warning">[INFO] Execution stopped by user</div>';
      runBtn.disabled = false;
      stopBtn.disabled = true;
    });
  }

  const logsTabs = document.querySelectorAll('.logs-tab');
  const logsPanel = document.getElementById('logs-content');
  const browserView = document.getElementById('browser-view');
  
  if (logsTabs.length > 0) {
    logsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        logsTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        if (tab.dataset.tab === 'browser') {
          logsPanel.style.display = 'none';
          browserView.style.display = 'flex';
        } else {
          logsPanel.style.display = 'block';
          browserView.style.display = 'none';
        }
      });
    });
  }
}
