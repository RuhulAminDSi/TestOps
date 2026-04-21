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
  initApiAutomationCrud();
  initLoadTestingCrud();
  initAiSqlCrud();
  initSettingsCrud();
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
        projectId: formData.get('projectId')
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

  const editScriptForm = document.getElementById('edit-script-form');
  if (editScriptForm) {
    editScriptForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const scriptId = document.getElementById('edit-script-id').value;
      const formData = new FormData(editScriptForm);
      const scriptData = {
        name: formData.get('name')
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

  // Script editor functionality
  window.selectScript = function(element) {
    const scriptId = element.getAttribute('data-script-id');
    const scriptName = element.querySelector('.script-name').textContent;
    const scriptContent = element.getAttribute('data-content') || '';
    const scriptLanguage = element.getAttribute('data-language') || 'javascript';
    
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
    
    updateEditorHeight();
  };

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

function initApiAutomationCrud() {
  const storage = {
    collections: 'apiAutomationCollections',
    requests: 'apiAutomationRequests',
    suites: 'apiAutomationSuites',
    scripts: 'apiAutomationScripts',
    environment: 'apiAutomationEnvironmentVars',
    schemas: 'apiAutomationSchemas',
    mocks: 'apiAutomationMocks'
  };

  const seeds = {
    collections: [
      { id: 'col-1', name: 'User API', requests: 48, updatedAt: 'Today, 2:30 PM', status: 'Active' },
      { id: 'col-2', name: 'Auth API', requests: 12, updatedAt: 'Yesterday', status: 'Active' },
      { id: 'col-3', name: 'Payment API', requests: 25, updatedAt: '2 days ago', status: 'Errors' },
      { id: 'col-4', name: 'Product API', requests: 31, updatedAt: '3 days ago', status: 'Active' }
    ],
    requests: [
      { id: 'req-1', name: 'Get Users', method: 'GET', path: '/api/users', expectedStatus: 200, headers: 'Accept: application/json', body: '' },
      { id: 'req-2', name: 'Create User', method: 'POST', path: '/api/users', expectedStatus: 201, headers: 'Content-Type: application/json', body: '{\n  "name": "Jane"\n}' },
      { id: 'req-3', name: 'Update User', method: 'PUT', path: '/api/users/:id', expectedStatus: 200, headers: 'Content-Type: application/json', body: '{\n  "role": "admin"\n}' },
      { id: 'req-4', name: 'Delete User', method: 'DELETE', path: '/api/users/:id', expectedStatus: 204, headers: '', body: '' }
    ],
    suites: [
      { id: 'suite-1', name: 'Full Regression', tests: 45, lastRun: 'Today, 11:00 AM', passRate: 98 },
      { id: 'suite-2', name: 'Smoke Tests', tests: 12, lastRun: 'Today, 9:30 AM', passRate: 100 },
      { id: 'suite-3', name: 'Auth Flow', tests: 8, lastRun: 'Yesterday', passRate: 75 }
    ],
    scripts: [
      { id: 'script-1', name: 'Auth Token Generator', type: 'Pre-request', content: "const token = pm.environment.get('auth_token');" },
      { id: 'script-2', name: 'Response Validator', type: 'Test', content: "pm.response.to.have.status(200);" },
      { id: 'script-3', name: 'Data Extractor', type: 'Post-response', content: "pm.environment.set('user_id', pm.response.json().id);" },
      { id: 'script-4', name: 'Error Handler', type: 'Test', content: "pm.expect(pm.response.code).to.be.below(500);" }
    ],
    environment: [
      { id: 'env-1', key: 'base_url', value: 'https://dev.api.example.com' },
      { id: 'env-2', key: 'api_key', value: '••••••••••••' },
      { id: 'env-3', key: 'timeout', value: '30000' }
    ],
    schemas: [
      { id: 'schema-1', name: 'User Response', endpoint: 'GET /api/users/:id', lastValidated: 'Today, 2:30 PM', status: 'Valid' },
      { id: 'schema-2', name: 'Order Create', endpoint: 'POST /api/orders', lastValidated: 'Today, 1:15 PM', status: 'Valid' },
      { id: 'schema-3', name: 'Product List', endpoint: 'GET /api/products', lastValidated: 'Yesterday', status: 'Failed' }
    ],
    mocks: [
      { id: 'mock-1', method: 'GET', path: '/mock/users', description: 'Returns user list', status: 'Active' },
      { id: 'mock-2', method: 'POST', path: '/mock/auth/login', description: 'Returns fake token', status: 'Active' },
      { id: 'mock-3', method: 'PUT', path: '/mock/products/:id', description: 'Returns updated product', status: 'Active' }
    ]
  };

  function uid(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  }

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return [...fallback];
      }
      return JSON.parse(raw);
    } catch (error) {
      console.error('Failed to load API automation data', error);
      return [...fallback];
    }
  }

  function save(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  function setModalTitle(modalId, title) {
    const modal = document.getElementById(modalId);
    const heading = modal?.querySelector('.modal-header h2');
    if (heading) heading.textContent = title;
  }

  function statusChip(status) {
    const normalized = String(status).toLowerCase();
    const tone = normalized === 'errors' || normalized === 'failed' ? 'danger' : normalized === 'draft' ? 'warning' : 'success';
    return `<span class="chip ${tone}">${status}</span>`;
  }

  const collectionsBody = document.getElementById('api-collections-body');
  if (collectionsBody) {
    let collections = load(storage.collections, seeds.collections);
    const form = document.getElementById('api-collection-form');
    const idField = document.getElementById('api-collection-id');
    const nameField = document.getElementById('api-collection-name');
    const requestsField = document.getElementById('api-collection-requests');
    const statusField = document.getElementById('api-collection-status');

    function render() {
      collectionsBody.innerHTML = collections.map((item) => `
        <tr>
          <td><span class="font-medium">${item.name}</span></td>
          <td>${item.requests}</td>
          <td>${item.updatedAt}</td>
          <td>${statusChip(item.status)}</td>
          <td>
            <button class="btn btn-sm btn-ghost" type="button" data-action="run" data-id="${item.id}">Run</button>
            <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
            <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
          </td>
        </tr>`).join('');
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('col');
      const existing = collections.find((item) => item.id === id);
      const payload = {
        id,
        name: nameField.value.trim(),
        requests: Number(requestsField.value),
        updatedAt: 'Just now',
        status: statusField.value
      };
      collections = existing ? collections.map((item) => item.id === id ? payload : item) : [payload, ...collections];
      save(storage.collections, collections);
      render();
      form.reset();
      idField.value = '';
      closeModal('api-collection-modal');
      setModalTitle('api-collection-modal', 'Collection');
    });

    collectionsBody.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const item = collections.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === 'edit') {
        idField.value = item.id;
        nameField.value = item.name;
        requestsField.value = item.requests;
        statusField.value = item.status;
        setModalTitle('api-collection-modal', 'Edit Collection');
        document.getElementById('api-collection-modal')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else if (button.dataset.action === 'delete') {
        collections = collections.filter((entry) => entry.id !== item.id);
        save(storage.collections, collections);
        render();
      } else {
        alert(`Running collection: ${item.name}`);
      }
    });

    render();
  }

  const requestsList = document.getElementById('api-requests-list');
  if (requestsList) {
    let requests = load(storage.requests, seeds.requests);
    const form = document.getElementById('api-request-form');
    const idField = document.getElementById('api-request-id');
    const nameField = document.getElementById('api-request-name');
    const methodField = document.getElementById('api-request-method');
    const pathField = document.getElementById('api-request-path');
    const statusField = document.getElementById('api-request-status');
    const builderMethod = document.getElementById('api-request-builder-method');
    const builderUrl = document.getElementById('api-request-builder-url');
    const builderHeaders = document.getElementById('api-request-builder-headers');
    const builderBody = document.getElementById('api-request-builder-body');
    let selectedId = requests[0]?.id || '';

    function methodClass(method) {
      return method === 'POST' ? 'badge-post' : method === 'PUT' ? 'badge-put' : method === 'DELETE' ? 'badge-delete' : 'badge-get';
    }

    function selectRequest(id) {
      const item = requests.find((entry) => entry.id === id);
      if (!item) return;
      selectedId = id;
      builderMethod.value = item.method;
      builderUrl.value = `https://api.example.com${item.path}`;
      builderHeaders.value = item.headers || '';
      builderBody.value = item.body || '';
      render();
    }

    function render() {
      requestsList.innerHTML = requests.map((item) => `
        <li data-id="${item.id}" style="cursor:pointer; ${selectedId === item.id ? 'border-color: rgba(8,126,164,0.5); background: rgba(8,126,164,0.08);' : ''}">
          <span class="badge ${methodClass(item.method)}">${item.method === 'DELETE' ? 'DEL' : item.method}</span>
          <div class="flex-1">
            <span>${item.name}</span>
            <span class="muted text-xs">${item.path}</span>
          </div>
          <span class="chip success">${item.expectedStatus}</span>
          <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
          <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
        </li>`).join('');
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('req');
      const existing = requests.find((item) => item.id === id);
      const payload = {
        id,
        name: nameField.value.trim(),
        method: methodField.value,
        path: pathField.value.trim(),
        expectedStatus: Number(statusField.value),
        headers: methodField.value === 'GET' ? 'Accept: application/json' : 'Content-Type: application/json',
        body: methodField.value === 'GET' || methodField.value === 'DELETE' ? '' : '{\n  "example": true\n}'
      };
      requests = existing ? requests.map((item) => item.id === id ? payload : item) : [payload, ...requests];
      save(storage.requests, requests);
      form.reset();
      idField.value = '';
      closeModal('api-request-modal');
      setModalTitle('api-request-modal', 'Request');
      selectRequest(payload.id);
    });

    requestsList.addEventListener('click', (event) => {
      const actionButton = event.target.closest('button[data-action]');
      if (actionButton) {
        event.stopPropagation();
        const item = requests.find((entry) => entry.id === actionButton.dataset.id);
        if (!item) return;
        if (actionButton.dataset.action === 'edit') {
          idField.value = item.id;
          nameField.value = item.name;
          methodField.value = item.method;
          pathField.value = item.path;
          statusField.value = item.expectedStatus;
          setModalTitle('api-request-modal', 'Edit Request');
          document.getElementById('api-request-modal')?.classList.add('open');
          document.body.style.overflow = 'hidden';
        } else {
          requests = requests.filter((entry) => entry.id !== item.id);
          save(storage.requests, requests);
          selectedId = requests[0]?.id || '';
          render();
          if (selectedId) selectRequest(selectedId);
        }
        return;
      }

      const row = event.target.closest('li[data-id]');
      if (row) selectRequest(row.dataset.id);
    });

    document.getElementById('api-send-request')?.addEventListener('click', () => {
      const item = requests.find((entry) => entry.id === selectedId);
      if (item) alert(`Sent ${item.method} ${item.path} -> ${item.expectedStatus}`);
    });

    render();
    if (selectedId) selectRequest(selectedId);
  }

  const suitesBody = document.getElementById('api-suites-body');
  if (suitesBody) {
    let suites = load(storage.suites, seeds.suites);
    const form = document.getElementById('api-suite-form');
    const idField = document.getElementById('api-suite-id');
    const nameField = document.getElementById('api-suite-name');
    const testsField = document.getElementById('api-suite-tests');
    const rateField = document.getElementById('api-suite-rate');

    function render() {
      suitesBody.innerHTML = suites.map((item) => `
        <tr>
          <td><span class="font-medium">${item.name}</span></td>
          <td>${item.tests}</td>
          <td>${item.lastRun}</td>
          <td>${statusChip(`${item.passRate}%`)}</td>
          <td>
            <button class="btn btn-sm btn-ghost" type="button" data-action="run" data-id="${item.id}">Run</button>
            <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
            <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
          </td>
        </tr>`).join('');
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('suite');
      const payload = {
        id,
        name: nameField.value.trim(),
        tests: Number(testsField.value),
        lastRun: 'Not run yet',
        passRate: Number(rateField.value)
      };
      suites = suites.some((item) => item.id === id) ? suites.map((item) => item.id === id ? payload : item) : [payload, ...suites];
      save(storage.suites, suites);
      render();
      form.reset();
      idField.value = '';
      closeModal('api-suite-modal');
      setModalTitle('api-suite-modal', 'Test Suite');
    });

    suitesBody.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const item = suites.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === 'edit') {
        idField.value = item.id;
        nameField.value = item.name;
        testsField.value = item.tests;
        rateField.value = item.passRate;
        setModalTitle('api-suite-modal', 'Edit Test Suite');
        document.getElementById('api-suite-modal')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else if (button.dataset.action === 'delete') {
        suites = suites.filter((entry) => entry.id !== item.id);
        save(storage.suites, suites);
        render();
      } else {
        item.lastRun = 'Just now';
        save(storage.suites, suites);
        render();
        alert(`Running suite: ${item.name}`);
      }
    });

    render();
  }

  const scriptsList = document.getElementById('api-scripts-list');
  if (scriptsList) {
    let scripts = load(storage.scripts, seeds.scripts);
    const form = document.getElementById('api-script-form');
    const idField = document.getElementById('api-script-id');
    const nameField = document.getElementById('api-script-name');
    const typeField = document.getElementById('api-script-type');
    const contentField = document.getElementById('api-script-content');
    const editorTitle = document.getElementById('api-script-editor-title');
    const editorType = document.getElementById('api-script-editor-type');
    const editorContent = document.getElementById('api-script-editor-content');
    let selectedId = scripts[0]?.id || '';

    function render() {
      scriptsList.innerHTML = scripts.map((item) => `
        <li data-id="${item.id}" style="cursor:pointer; ${selectedId === item.id ? 'border-color: rgba(8,126,164,0.5); background: rgba(8,126,164,0.08);' : ''}">
          <div class="flex-1">
            <span class="font-medium">${item.name}</span>
            <span class="muted text-xs">${item.type} script</span>
          </div>
          <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
          <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
        </li>`).join('');
    }

    function selectScript(id) {
      const item = scripts.find((entry) => entry.id === id);
      if (!item) return;
      selectedId = id;
      editorTitle.textContent = `${item.name} Editor`;
      editorType.value = item.type;
      editorContent.value = item.content;
      render();
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('script');
      const payload = { id, name: nameField.value.trim(), type: typeField.value, content: contentField.value };
      scripts = scripts.some((item) => item.id === id) ? scripts.map((item) => item.id === id ? payload : item) : [payload, ...scripts];
      save(storage.scripts, scripts);
      form.reset();
      idField.value = '';
      closeModal('api-script-modal');
      setModalTitle('api-script-modal', 'Script');
      selectScript(payload.id);
    });

    scriptsList.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (button) {
        event.stopPropagation();
        const item = scripts.find((entry) => entry.id === button.dataset.id);
        if (!item) return;
        if (button.dataset.action === 'edit') {
          idField.value = item.id;
          nameField.value = item.name;
          typeField.value = item.type;
          contentField.value = item.content;
          setModalTitle('api-script-modal', 'Edit Script');
          document.getElementById('api-script-modal')?.classList.add('open');
          document.body.style.overflow = 'hidden';
        } else {
          scripts = scripts.filter((entry) => entry.id !== item.id);
          save(storage.scripts, scripts);
          selectedId = scripts[0]?.id || '';
          render();
          if (selectedId) selectScript(selectedId);
        }
        return;
      }

      const row = event.target.closest('li[data-id]');
      if (row) selectScript(row.dataset.id);
    });

    document.getElementById('api-script-save')?.addEventListener('click', () => {
      const item = scripts.find((entry) => entry.id === selectedId);
      if (!item) return;
      item.type = editorType.value;
      item.content = editorContent.value;
      save(storage.scripts, scripts);
      alert(`Saved script: ${item.name}`);
    });

    document.getElementById('api-script-test')?.addEventListener('click', () => {
      const item = scripts.find((entry) => entry.id === selectedId);
      if (item) alert(`Tested script: ${item.name}`);
    });

    render();
    if (selectedId) selectScript(selectedId);
  }

  const environmentBody = document.getElementById('api-environment-body');
  if (environmentBody) {
    let variables = load(storage.environment, seeds.environment);
    const form = document.getElementById('api-environment-form');
    const idField = document.getElementById('api-environment-id');
    const keyField = document.getElementById('api-environment-key');
    const valueField = document.getElementById('api-environment-value');

    function render() {
      environmentBody.innerHTML = variables.map((item) => `
        <tr>
          <td><code>${item.key}</code></td>
          <td>${item.value}</td>
          <td>
            <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
            <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
          </td>
        </tr>`).join('');
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('env');
      const payload = { id, key: keyField.value.trim(), value: valueField.value.trim() };
      variables = variables.some((item) => item.id === id) ? variables.map((item) => item.id === id ? payload : item) : [payload, ...variables];
      save(storage.environment, variables);
      render();
      form.reset();
      idField.value = '';
      closeModal('api-environment-modal');
      setModalTitle('api-environment-modal', 'Environment Variable');
    });

    environmentBody.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const item = variables.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === 'edit') {
        idField.value = item.id;
        keyField.value = item.key;
        valueField.value = item.value;
        setModalTitle('api-environment-modal', 'Edit Environment Variable');
        document.getElementById('api-environment-modal')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        variables = variables.filter((entry) => entry.id !== item.id);
        save(storage.environment, variables);
        render();
      }
    });

    document.querySelectorAll('[data-api-environment-switch]').forEach((button) => {
      button.addEventListener('click', () => {
        alert(`Switched to ${button.getAttribute('data-api-environment-switch')}`);
      });
    });

    render();
  }

  const schemasBody = document.getElementById('api-schemas-body');
  if (schemasBody) {
    let schemas = load(storage.schemas, seeds.schemas);
    const form = document.getElementById('api-schema-form');
    const idField = document.getElementById('api-schema-id');
    const nameField = document.getElementById('api-schema-name');
    const endpointField = document.getElementById('api-schema-endpoint');
    const statusField = document.getElementById('api-schema-status');

    function render() {
      schemasBody.innerHTML = schemas.map((item) => `
        <tr>
          <td><span class="font-medium">${item.name}</span></td>
          <td>${item.endpoint}</td>
          <td>${item.lastValidated}</td>
          <td>${statusChip(item.status)}</td>
          <td>
            <button class="btn btn-sm btn-ghost" type="button" data-action="test" data-id="${item.id}">Test</button>
            <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
            <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
          </td>
        </tr>`).join('');
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('schema');
      const payload = {
        id,
        name: nameField.value.trim(),
        endpoint: endpointField.value.trim(),
        lastValidated: 'Just now',
        status: statusField.value
      };
      schemas = schemas.some((item) => item.id === id) ? schemas.map((item) => item.id === id ? payload : item) : [payload, ...schemas];
      save(storage.schemas, schemas);
      render();
      form.reset();
      idField.value = '';
      closeModal('api-schema-modal');
      setModalTitle('api-schema-modal', 'Schema');
    });

    schemasBody.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const item = schemas.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === 'edit') {
        idField.value = item.id;
        nameField.value = item.name;
        endpointField.value = item.endpoint;
        statusField.value = item.status;
        setModalTitle('api-schema-modal', 'Edit Schema');
        document.getElementById('api-schema-modal')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else if (button.dataset.action === 'delete') {
        schemas = schemas.filter((entry) => entry.id !== item.id);
        save(storage.schemas, schemas);
        render();
      } else {
        item.lastValidated = 'Just now';
        item.status = 'Valid';
        save(storage.schemas, schemas);
        render();
        alert(`Schema validated: ${item.name}`);
      }
    });

    render();
  }

  const mocksList = document.getElementById('api-mocks-list');
  if (mocksList) {
    let mocks = load(storage.mocks, seeds.mocks);
    const form = document.getElementById('api-mock-form');
    const idField = document.getElementById('api-mock-id');
    const methodField = document.getElementById('api-mock-method');
    const pathField = document.getElementById('api-mock-path');
    const descField = document.getElementById('api-mock-description');

    function methodClass(method) {
      return method === 'POST' ? 'badge-post' : method === 'PUT' ? 'badge-put' : method === 'DELETE' ? 'badge-delete' : 'badge-get';
    }

    function render() {
      mocksList.innerHTML = mocks.map((item) => `
        <li>
          <span class="badge ${methodClass(item.method)}">${item.method === 'DELETE' ? 'DEL' : item.method}</span>
          <div class="flex-1">
            <span>${item.path}</span>
            <span class="muted text-xs">${item.description}</span>
          </div>
          <span class="chip success">${item.status}</span>
          <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
          <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
        </li>`).join('');
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('mock');
      const payload = { id, method: methodField.value, path: pathField.value.trim(), description: descField.value.trim(), status: 'Active' };
      mocks = mocks.some((item) => item.id === id) ? mocks.map((item) => item.id === id ? payload : item) : [payload, ...mocks];
      save(storage.mocks, mocks);
      render();
      form.reset();
      idField.value = '';
      closeModal('api-mock-modal');
      setModalTitle('api-mock-modal', 'Mock Endpoint');
    });

    mocksList.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const item = mocks.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === 'edit') {
        idField.value = item.id;
        methodField.value = item.method;
        pathField.value = item.path;
        descField.value = item.description;
        setModalTitle('api-mock-modal', 'Edit Mock Endpoint');
        document.getElementById('api-mock-modal')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        mocks = mocks.filter((entry) => entry.id !== item.id);
        save(storage.mocks, mocks);
        render();
      }
    });

    render();
  }
}

function initLoadTestingCrud() {
  const storage = {
    plans: 'loadTestingPlans',
    templates: 'loadTestingTemplates',
    agents: 'loadTestingAgents',
    scenarios: 'loadTestingAiScenarios'
  };

  const seeds = {
    plans: [
      { id: 'plan-1', name: 'API Load Test', type: 'Load', rps: '1,000', duration: '30 min', lastRun: 'Today, 2:30 PM' },
      { id: 'plan-2', name: 'Stress Test', type: 'Stress', rps: '5,000', duration: '1 hour', lastRun: 'Yesterday' },
      { id: 'plan-3', name: 'Spike Test', type: 'Spike', rps: '10,000', duration: '15 min', lastRun: '2 days ago' }
    ],
    templates: [
      { id: 'template-1', name: 'Basic Load Test', description: 'Simple load test with constant virtual users', vus: 100, duration: '10 min' },
      { id: 'template-2', name: 'Stress Test', description: 'Gradually increase load to find breaking point', vus: 1000, duration: '1 hour' },
      { id: 'template-3', name: 'Spike Test', description: 'Rapidly increase users to test responsiveness', vus: 5000, duration: '15 min' }
    ],
    agents: [
      { id: 'agent-1', name: 'Agent-1', ip: '192.168.1.101', status: 'Online', vus: '1,000', rps: '2,500' },
      { id: 'agent-2', name: 'Agent-2', ip: '192.168.1.102', status: 'Online', vus: '1,000', rps: '2,500' },
      { id: 'agent-3', name: 'Agent-3', ip: '192.168.1.103', status: 'Online', vus: '1,000', rps: '2,500' }
    ],
    scenarios: [
      { id: 'scenario-1', name: 'E-commerce Peak Scenario', notes: 'Based on historical data patterns' },
      { id: 'scenario-2', name: 'API Rate Limit Test', notes: 'Based on endpoint analysis' },
      { id: 'scenario-3', name: 'Concurrent User Flow', notes: 'Based on user behavior patterns' }
    ]
  };

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return [...fallback];
      }
      return JSON.parse(raw);
    } catch (error) {
      console.error('Failed to load load-testing data', error);
      return [...fallback];
    }
  }

  function save(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  function uid(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  }

  function setModalTitle(modalId, title) {
    const modal = document.getElementById(modalId);
    const heading = modal?.querySelector('.modal-header h2');
    if (heading) heading.textContent = title;
  }

  const plansBody = document.getElementById('load-test-plans-body');
  if (plansBody) {
    let plans = load(storage.plans, seeds.plans);
    const form = document.getElementById('load-test-plan-form');
    const idField = document.getElementById('load-test-plan-id');
    const nameField = document.getElementById('load-test-plan-name');
    const typeField = document.getElementById('load-test-plan-type');
    const rpsField = document.getElementById('load-test-plan-rps');
    const durationField = document.getElementById('load-test-plan-duration');

    function render() {
      plansBody.innerHTML = plans.map((item) => `
        <tr>
          <td><span class="font-medium">${item.name}</span></td>
          <td>${item.type}</td>
          <td>${item.rps}</td>
          <td>${item.duration}</td>
          <td>${item.lastRun}</td>
          <td>
            <button class="btn btn-sm btn-ghost" type="button" data-action="run" data-id="${item.id}">Run</button>
            <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
            <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
          </td>
        </tr>`).join('');
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('plan');
      const payload = {
        id,
        name: nameField.value.trim(),
        type: typeField.value,
        rps: Number(rpsField.value).toLocaleString(),
        duration: durationField.value.trim(),
        lastRun: 'Not run yet'
      };
      plans = plans.some((item) => item.id === id) ? plans.map((item) => item.id === id ? payload : item) : [payload, ...plans];
      save(storage.plans, plans);
      render();
      form.reset();
      idField.value = '';
      closeModal('load-test-plan-modal');
      setModalTitle('load-test-plan-modal', 'Load Test Plan');
    });

    plansBody.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const item = plans.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === 'edit') {
        idField.value = item.id;
        nameField.value = item.name;
        typeField.value = item.type;
        rpsField.value = String(item.rps).replace(/,/g, '');
        durationField.value = item.duration;
        setModalTitle('load-test-plan-modal', 'Edit Load Test Plan');
        document.getElementById('load-test-plan-modal')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else if (button.dataset.action === 'delete') {
        plans = plans.filter((entry) => entry.id !== item.id);
        save(storage.plans, plans);
        render();
      } else {
        item.lastRun = 'Just now';
        save(storage.plans, plans);
        render();
        alert(`Running plan: ${item.name}`);
      }
    });

    render();
  }

  const templatesGrid = document.getElementById('load-templates-grid');
  if (templatesGrid) {
    let templates = load(storage.templates, seeds.templates);
    const form = document.getElementById('load-template-form');
    const idField = document.getElementById('load-template-id');
    const nameField = document.getElementById('load-template-name');
    const descField = document.getElementById('load-template-description');
    const vusField = document.getElementById('load-template-vus');
    const durationField = document.getElementById('load-template-duration');

    function render() {
      templatesGrid.innerHTML = templates.map((item) => `
        <div class="card">
          <h4 class="font-medium mb-2">${item.name}</h4>
          <p class="muted text-sm mb-3">${item.description}</p>
          <div class="flex gap-2">
            <span class="badge">${Number(item.vus).toLocaleString()} VUs</span>
            <span class="badge">${item.duration}</span>
          </div>
          <div class="flex gap-2 mt-3">
            <button class="btn btn-sm btn-primary" type="button" data-action="use" data-id="${item.id}">Use Template</button>
            <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
            <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
          </div>
        </div>`).join('');
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('template');
      const payload = {
        id,
        name: nameField.value.trim(),
        description: descField.value.trim(),
        vus: Number(vusField.value),
        duration: durationField.value.trim()
      };
      templates = templates.some((item) => item.id === id) ? templates.map((item) => item.id === id ? payload : item) : [payload, ...templates];
      save(storage.templates, templates);
      render();
      form.reset();
      idField.value = '';
      closeModal('load-template-modal');
      setModalTitle('load-template-modal', 'Load Template');
    });

    templatesGrid.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const item = templates.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === 'use') {
        alert(`Applied template: ${item.name}`);
      } else if (button.dataset.action === 'edit') {
        idField.value = item.id;
        nameField.value = item.name;
        descField.value = item.description;
        vusField.value = item.vus;
        durationField.value = item.duration;
        setModalTitle('load-template-modal', 'Edit Load Template');
        document.getElementById('load-template-modal')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        templates = templates.filter((entry) => entry.id !== item.id);
        save(storage.templates, templates);
        render();
      }
    });

    render();
  }

  const agentsBody = document.getElementById('load-agents-body');
  if (agentsBody) {
    let agents = load(storage.agents, seeds.agents);
    const form = document.getElementById('load-agent-form');
    const idField = document.getElementById('load-agent-id');
    const nameField = document.getElementById('load-agent-name');
    const ipField = document.getElementById('load-agent-ip');
    const vusField = document.getElementById('load-agent-vus');
    const rpsField = document.getElementById('load-agent-rps');

    function render() {
      agentsBody.innerHTML = agents.map((item) => `
        <tr>
          <td><span class="font-medium">${item.name}</span></td>
          <td>${item.ip}</td>
          <td><span class="chip success">${item.status}</span></td>
          <td>${item.vus}</td>
          <td>${item.rps}</td>
          <td>
            <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
            <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Remove</button>
          </td>
        </tr>`).join('');
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('agent');
      const payload = {
        id,
        name: nameField.value.trim(),
        ip: ipField.value.trim(),
        status: 'Online',
        vus: Number(vusField.value).toLocaleString(),
        rps: Number(rpsField.value).toLocaleString()
      };
      agents = agents.some((item) => item.id === id) ? agents.map((item) => item.id === id ? payload : item) : [payload, ...agents];
      save(storage.agents, agents);
      render();
      form.reset();
      idField.value = '';
      closeModal('load-agent-modal');
      setModalTitle('load-agent-modal', 'Distributed Agent');
    });

    agentsBody.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const item = agents.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === 'edit') {
        idField.value = item.id;
        nameField.value = item.name;
        ipField.value = item.ip;
        vusField.value = String(item.vus).replace(/,/g, '');
        rpsField.value = String(item.rps).replace(/,/g, '');
        setModalTitle('load-agent-modal', 'Edit Distributed Agent');
        document.getElementById('load-agent-modal')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        agents = agents.filter((entry) => entry.id !== item.id);
        save(storage.agents, agents);
        render();
      }
    });

    render();
  }

  const scenariosList = document.getElementById('load-ai-scenarios-list');
  if (scenariosList) {
    let scenarios = load(storage.scenarios, seeds.scenarios);
    const form = document.getElementById('load-ai-scenario-form');
    const idField = document.getElementById('load-ai-scenario-id');
    const nameField = document.getElementById('load-ai-scenario-name');
    const notesField = document.getElementById('load-ai-scenario-notes');

    function render() {
      scenariosList.innerHTML = scenarios.map((item) => `
        <li>
          <div class="flex-1">
            <span class="font-medium">${item.name}</span>
            <span class="muted text-xs">${item.notes}</span>
          </div>
          <button class="btn btn-sm btn-ghost" type="button" data-action="view" data-id="${item.id}">View</button>
          <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
          <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
        </li>`).join('');
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('scenario');
      const payload = { id, name: nameField.value.trim(), notes: notesField.value.trim() };
      scenarios = scenarios.some((item) => item.id === id) ? scenarios.map((item) => item.id === id ? payload : item) : [payload, ...scenarios];
      save(storage.scenarios, scenarios);
      render();
      form.reset();
      idField.value = '';
      closeModal('load-ai-scenario-modal');
      setModalTitle('load-ai-scenario-modal', 'AI Scenario');
    });

    scenariosList.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const item = scenarios.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === 'view') {
        alert(`${item.name}: ${item.notes}`);
      } else if (button.dataset.action === 'edit') {
        idField.value = item.id;
        nameField.value = item.name;
        notesField.value = item.notes;
        setModalTitle('load-ai-scenario-modal', 'Edit AI Scenario');
        document.getElementById('load-ai-scenario-modal')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        scenarios = scenarios.filter((entry) => entry.id !== item.id);
        save(storage.scenarios, scenarios);
        render();
      }
    });

    render();
  }
}

function initAiSqlCrud() {
  const storage = {
    scripts: 'aiSqlScripts',
    migrations: 'aiSqlMigrations'
  };

  const seeds = {
    scripts: [
      { id: 'sql-script-1', name: 'User Analytics Query', type: 'SELECT with JOINs' },
      { id: 'sql-script-2', name: 'Order Summary', type: 'Aggregation query' },
      { id: 'sql-script-3', name: 'Product Migration', type: 'INSERT/UPDATE' }
    ],
    migrations: [
      { id: 'sql-migration-1', name: 'Users to Staging', records: '1,234', status: 'Completed' },
      { id: 'sql-migration-2', name: 'Orders Archive', records: '5,678', status: 'Running' }
    ]
  };

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return [...fallback];
      }
      return JSON.parse(raw);
    } catch (error) {
      console.error('Failed to load AI SQL data', error);
      return [...fallback];
    }
  }

  function save(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  function uid(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  }

  function setModalTitle(modalId, title) {
    const modal = document.getElementById(modalId);
    const heading = modal?.querySelector('.modal-header h2');
    if (heading) heading.textContent = title;
  }

  function statusChip(status) {
    const tone = status === 'Completed' ? 'success' : status === 'Running' ? 'warning' : 'info';
    return `<span class="chip ${tone}">${status}</span>`;
  }

  const scriptsList = document.getElementById('ai-sql-scripts-list');
  if (scriptsList) {
    let scripts = load(storage.scripts, seeds.scripts);
    const form = document.getElementById('ai-sql-script-form');
    const idField = document.getElementById('ai-sql-script-id');
    const nameField = document.getElementById('ai-sql-script-name');
    const typeField = document.getElementById('ai-sql-script-type');

    function render() {
      scriptsList.innerHTML = scripts.map((item) => `
        <li>
          <div class="flex-1">
            <span class="font-medium">${item.name}</span>
            <span class="muted text-xs">${item.type}</span>
          </div>
          <button class="btn btn-sm btn-ghost" type="button" data-action="run" data-id="${item.id}">Run</button>
          <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
          <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
        </li>`).join('');
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('sql-script');
      const payload = { id, name: nameField.value.trim(), type: typeField.value.trim() };
      scripts = scripts.some((item) => item.id === id) ? scripts.map((item) => item.id === id ? payload : item) : [payload, ...scripts];
      save(storage.scripts, scripts);
      render();
      form.reset();
      idField.value = '';
      closeModal('ai-sql-script-modal');
      setModalTitle('ai-sql-script-modal', 'SQL Script');
    });

    scriptsList.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const item = scripts.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === 'run') {
        alert(`Running SQL script: ${item.name}`);
      } else if (button.dataset.action === 'edit') {
        idField.value = item.id;
        nameField.value = item.name;
        typeField.value = item.type;
        setModalTitle('ai-sql-script-modal', 'Edit SQL Script');
        document.getElementById('ai-sql-script-modal')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        scripts = scripts.filter((entry) => entry.id !== item.id);
        save(storage.scripts, scripts);
        render();
      }
    });

    render();
  }

  const migrationsList = document.getElementById('ai-sql-migrations-list');
  if (migrationsList) {
    let migrations = load(storage.migrations, seeds.migrations);
    const form = document.getElementById('ai-sql-migration-form');
    const idField = document.getElementById('ai-sql-migration-id');
    const nameField = document.getElementById('ai-sql-migration-name');
    const recordsField = document.getElementById('ai-sql-migration-records');
    const statusField = document.getElementById('ai-sql-migration-status');
    const sourceField = document.getElementById('ai-sql-migration-source');
    const targetField = document.getElementById('ai-sql-migration-target');
    const tablesField = document.getElementById('ai-sql-migration-tables');

    function render() {
      migrationsList.innerHTML = migrations.map((item) => `
        <li>
          <div class="dot ${item.status === 'Completed' ? 'green' : item.status === 'Running' ? 'yellow' : 'gray'}"></div>
          <div class="flex-1">
            <span class="font-medium">${item.name}</span>
            <span class="muted text-xs">${item.status} - ${item.records} records</span>
          </div>
          ${statusChip(item.status)}
          <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
          <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
        </li>`).join('');
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('sql-migration');
      const payload = {
        id,
        name: nameField.value.trim(),
        records: Number(recordsField.value).toLocaleString(),
        status: statusField.value
      };
      migrations = migrations.some((item) => item.id === id) ? migrations.map((item) => item.id === id ? payload : item) : [payload, ...migrations];
      save(storage.migrations, migrations);
      render();
      form.reset();
      idField.value = '';
      closeModal('ai-sql-migration-modal');
      setModalTitle('ai-sql-migration-modal', 'Migration Job');
    });

    migrationsList.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const item = migrations.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === 'edit') {
        idField.value = item.id;
        nameField.value = item.name;
        recordsField.value = String(item.records).replace(/,/g, '');
        statusField.value = item.status;
        setModalTitle('ai-sql-migration-modal', 'Edit Migration Job');
        document.getElementById('ai-sql-migration-modal')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        migrations = migrations.filter((entry) => entry.id !== item.id);
        save(storage.migrations, migrations);
        render();
      }
    });

    document.getElementById('ai-sql-start-migration')?.addEventListener('click', () => {
      const tables = tablesField?.value.trim();
      if (!tables) {
        alert('Enter one or more tables before starting a migration.');
        return;
      }
      const payload = {
        id: uid('sql-migration'),
        name: `${sourceField.value} to ${targetField.value}`,
        records: '1,000',
        status: 'Running'
      };
      migrations = [payload, ...migrations];
      save(storage.migrations, migrations);
      render();
      tablesField.value = '';
      alert(`Migration started for ${tables}`);
    });

    render();
  }
}

function initSettingsCrud() {
  const storage = {
    general: 'settingsGeneralState',
    projects: 'settingsProjectsState',
    credentials: 'settingsCredentialsState',
    users: 'settingsUsersState',
    notifications: 'settingsNotificationsState',
    security: 'settingsSecurityState',
    execution: 'settingsExecutionState',
    aiConfig: 'settingsAiConfigState',
    integrations: 'settingsIntegrationsState'
  };

  const seeds = {
    general: { appName: 'AI QA Copilot', timezone: 'UTC', language: 'English' },
    projects: [
      { id: 'set-proj-1', name: 'Demo Project', envs: '3 (Dev, Staging, Prod)', updated: 'Today' },
      { id: 'set-proj-2', name: 'E2E Tests', envs: '2 (QA, Prod)', updated: 'Yesterday' }
    ],
    credentials: [
      { id: 'cred-1', name: 'GitHub Token', desc: 'For CI/CD integration' },
      { id: 'cred-2', name: 'AWS Credentials', desc: 'For S3 storage' },
      { id: 'cred-3', name: 'OpenAI API Key', desc: 'For AI features' }
    ],
    users: [
      { id: 'user-1', name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active' },
      { id: 'user-2', name: 'Test Engineer', email: 'tester@example.com', role: 'Tester', status: 'Active' },
      { id: 'user-3', name: 'Viewer', email: 'viewer@example.com', role: 'Viewer', status: 'Active' }
    ],
    notifications: { email: true, slack: true, sms: false, failures: true, execution: true, scheduler: true },
    security: { twoFactor: true, strongPasswords: true, timeout: 30, whitelist: true, apiKey: false },
    execution: { requestTimeout: 30000, elementWait: 10000, pageTimeout: 30000, maxRetries: 3, retryDelay: 1000 },
    aiConfig: { model: 'GPT-4', temperature: '0.7', maxTokens: 2000, testGeneration: true, queryGeneration: true, codeCompletion: true },
    integrations: { GitHub: 'Connect', Jenkins: 'Configure', Slack: 'Connect' }
  };

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return Array.isArray(fallback) ? [...fallback] : { ...fallback };
      }
      return JSON.parse(raw);
    } catch (error) {
      console.error('Failed to load settings data', error);
      return Array.isArray(fallback) ? [...fallback] : { ...fallback };
    }
  }

  function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function uid(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  }

  function setModalTitle(modalId, title) {
    const modal = document.getElementById(modalId);
    const heading = modal?.querySelector('.modal-header h2');
    if (heading) heading.textContent = title;
  }

  const generalPanel = document.getElementById('settings-general-panel');
  if (generalPanel) {
    const state = load(storage.general, seeds.general);
    const appName = document.getElementById('settings-general-app-name');
    const timezone = document.getElementById('settings-general-timezone');
    const language = document.getElementById('settings-general-language');
    appName.value = state.appName;
    timezone.value = state.timezone;
    language.value = state.language;
    document.getElementById('settings-general-save')?.addEventListener('click', () => {
      save(storage.general, { appName: appName.value, timezone: timezone.value, language: language.value });
      alert('General settings saved');
    });
  }

  const projectsBody = document.getElementById('settings-projects-body');
  if (projectsBody) {
    let projects = load(storage.projects, seeds.projects);
    const form = document.getElementById('settings-project-form');
    const idField = document.getElementById('settings-project-id');
    const nameField = document.getElementById('settings-project-name');
    const envsField = document.getElementById('settings-project-envs');
    function render() {
      projectsBody.innerHTML = projects.map((item) => `
        <tr>
          <td><span class="font-medium">${item.name}</span></td>
          <td>${item.envs}</td>
          <td>${item.updated}</td>
          <td>
            <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
            <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
          </td>
        </tr>`).join('');
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('set-proj');
      const payload = { id, name: nameField.value.trim(), envs: envsField.value.trim(), updated: 'Just now' };
      projects = projects.some((item) => item.id === id) ? projects.map((item) => item.id === id ? payload : item) : [payload, ...projects];
      save(storage.projects, projects);
      render();
      form.reset();
      idField.value = '';
      closeModal('settings-project-modal');
      setModalTitle('settings-project-modal', 'Settings Project');
    });
    projectsBody.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const item = projects.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === 'edit') {
        idField.value = item.id;
        nameField.value = item.name;
        envsField.value = item.envs;
        setModalTitle('settings-project-modal', 'Edit Settings Project');
        document.getElementById('settings-project-modal')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        projects = projects.filter((entry) => entry.id !== item.id);
        save(storage.projects, projects);
        render();
      }
    });
    render();
  }

  const credentialsList = document.getElementById('settings-credentials-list');
  if (credentialsList) {
    let credentials = load(storage.credentials, seeds.credentials);
    const form = document.getElementById('settings-credential-form');
    const idField = document.getElementById('settings-credential-id');
    const nameField = document.getElementById('settings-credential-name');
    const descField = document.getElementById('settings-credential-desc');
    function render() {
      credentialsList.innerHTML = credentials.map((item) => `
        <li>
          <div class="flex-1">
            <span class="font-medium">${item.name}</span>
            <span class="muted text-xs">${item.desc}</span>
          </div>
          <span class="muted">••••••••</span>
          <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
          <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
        </li>`).join('');
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('cred');
      const payload = { id, name: nameField.value.trim(), desc: descField.value.trim() };
      credentials = credentials.some((item) => item.id === id) ? credentials.map((item) => item.id === id ? payload : item) : [payload, ...credentials];
      save(storage.credentials, credentials);
      render();
      form.reset();
      idField.value = '';
      closeModal('settings-credential-modal');
      setModalTitle('settings-credential-modal', 'Credential');
    });
    credentialsList.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const item = credentials.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === 'edit') {
        idField.value = item.id;
        nameField.value = item.name;
        descField.value = item.desc;
        setModalTitle('settings-credential-modal', 'Edit Credential');
        document.getElementById('settings-credential-modal')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        credentials = credentials.filter((entry) => entry.id !== item.id);
        save(storage.credentials, credentials);
        render();
      }
    });
    render();
  }

  const usersBody = document.getElementById('settings-users-body');
  if (usersBody) {
    let users = load(storage.users, seeds.users);
    const form = document.getElementById('settings-user-form');
    const idField = document.getElementById('settings-user-id');
    const nameField = document.getElementById('settings-user-name');
    const emailField = document.getElementById('settings-user-email');
    const roleField = document.getElementById('settings-user-role');
    function render() {
      usersBody.innerHTML = users.map((item) => `
        <tr>
          <td><span class="font-medium">${item.name}</span></td>
          <td>${item.email}</td>
          <td><span class="chip">${item.role}</span></td>
          <td><span class="chip success">${item.status}</span></td>
          <td>
            <button class="btn btn-sm btn-ghost" type="button" data-action="edit" data-id="${item.id}">Edit</button>
            <button class="btn btn-sm btn-ghost" type="button" data-action="delete" data-id="${item.id}">Delete</button>
          </td>
        </tr>`).join('');
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = idField.value || uid('user');
      const payload = { id, name: nameField.value.trim(), email: emailField.value.trim(), role: roleField.value, status: 'Active' };
      users = users.some((item) => item.id === id) ? users.map((item) => item.id === id ? payload : item) : [payload, ...users];
      save(storage.users, users);
      render();
      form.reset();
      idField.value = '';
      closeModal('settings-user-modal');
      setModalTitle('settings-user-modal', 'User');
    });
    usersBody.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const item = users.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === 'edit') {
        idField.value = item.id;
        nameField.value = item.name;
        emailField.value = item.email;
        roleField.value = item.role;
        setModalTitle('settings-user-modal', 'Edit User');
        document.getElementById('settings-user-modal')?.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        users = users.filter((entry) => entry.id !== item.id);
        save(storage.users, users);
        render();
      }
    });
    render();
  }

  const notificationsPanel = document.getElementById('settings-notifications-panel');
  if (notificationsPanel) {
    const state = load(storage.notifications, seeds.notifications);
    const fields = {
      email: document.getElementById('settings-notify-email'),
      slack: document.getElementById('settings-notify-slack'),
      sms: document.getElementById('settings-notify-sms'),
      failures: document.getElementById('settings-alert-failures'),
      execution: document.getElementById('settings-alert-execution'),
      scheduler: document.getElementById('settings-alert-scheduler')
    };
    Object.keys(fields).forEach((key) => { fields[key].checked = !!state[key]; });
    document.getElementById('settings-notifications-save')?.addEventListener('click', () => {
      save(storage.notifications, Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field.checked])));
      alert('Notification preferences saved');
    });
  }

  const securityPanel = document.getElementById('settings-security-panel');
  if (securityPanel) {
    const state = load(storage.security, seeds.security);
    const fields = {
      twoFactor: document.getElementById('settings-security-2fa'),
      strongPasswords: document.getElementById('settings-security-passwords'),
      timeout: document.getElementById('settings-security-timeout'),
      whitelist: document.getElementById('settings-security-whitelist'),
      apiKey: document.getElementById('settings-security-api-key')
    };
    fields.twoFactor.checked = state.twoFactor;
    fields.strongPasswords.checked = state.strongPasswords;
    fields.timeout.value = state.timeout;
    fields.whitelist.checked = state.whitelist;
    fields.apiKey.checked = state.apiKey;
    document.getElementById('settings-security-save')?.addEventListener('click', () => {
      save(storage.security, {
        twoFactor: fields.twoFactor.checked,
        strongPasswords: fields.strongPasswords.checked,
        timeout: Number(fields.timeout.value),
        whitelist: fields.whitelist.checked,
        apiKey: fields.apiKey.checked
      });
      alert('Security settings saved');
    });
  }

  const executionPanel = document.getElementById('settings-execution-panel');
  if (executionPanel) {
    const state = load(storage.execution, seeds.execution);
    const fields = {
      requestTimeout: document.getElementById('settings-execution-request-timeout'),
      elementWait: document.getElementById('settings-execution-element-wait'),
      pageTimeout: document.getElementById('settings-execution-page-timeout'),
      maxRetries: document.getElementById('settings-execution-max-retries'),
      retryDelay: document.getElementById('settings-execution-retry-delay')
    };
    Object.entries(fields).forEach(([key, field]) => { field.value = state[key]; });
    document.getElementById('settings-execution-save')?.addEventListener('click', () => {
      save(storage.execution, Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, Number(field.value)])));
      alert('Execution settings saved');
    });
  }

  const aiConfigPanel = document.getElementById('settings-ai-config-panel');
  if (aiConfigPanel) {
    const state = load(storage.aiConfig, seeds.aiConfig);
    const fields = {
      model: document.getElementById('settings-ai-model'),
      temperature: document.getElementById('settings-ai-temperature'),
      maxTokens: document.getElementById('settings-ai-max-tokens'),
      testGeneration: document.getElementById('settings-ai-test-generation'),
      queryGeneration: document.getElementById('settings-ai-query-generation'),
      codeCompletion: document.getElementById('settings-ai-code-completion')
    };
    fields.model.value = state.model;
    fields.temperature.value = state.temperature;
    fields.maxTokens.value = state.maxTokens;
    fields.testGeneration.checked = state.testGeneration;
    fields.queryGeneration.checked = state.queryGeneration;
    fields.codeCompletion.checked = state.codeCompletion;
    document.getElementById('settings-ai-config-save')?.addEventListener('click', () => {
      save(storage.aiConfig, {
        model: fields.model.value,
        temperature: fields.temperature.value,
        maxTokens: Number(fields.maxTokens.value),
        testGeneration: fields.testGeneration.checked,
        queryGeneration: fields.queryGeneration.checked,
        codeCompletion: fields.codeCompletion.checked
      });
      alert('AI configuration saved');
    });
  }

  const integrationButtons = document.querySelectorAll('[data-settings-integration]');
  if (integrationButtons.length) {
    const state = load(storage.integrations, seeds.integrations);
    integrationButtons.forEach((button) => {
      const name = button.getAttribute('data-settings-integration');
      if (state[name]) button.textContent = state[name];
      button.addEventListener('click', () => {
        const next = button.textContent.trim() === 'Connected' ? 'Configure' : 'Connected';
        button.textContent = next;
        state[name] = next;
        save(storage.integrations, state);
      });
    });
  }
}
