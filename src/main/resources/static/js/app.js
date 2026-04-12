document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initAccordion();
  initNavHighlighter();
  initUserMenu();
  initSearch();
  initChat();
  initKeyboardNav();
  initPageRouter();
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
  }

  if (activeLink) {
    activeLink.classList.add('active');
    activeLink.setAttribute('aria-current', 'page');
  }
}

function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('[data-toggle-sidebar]');
  if (!sidebar || !toggle) return;

  const nav = sidebar.querySelector('.sidebar-nav');
  const footer = sidebar.querySelector('.sidebar-footer');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isCollapsed = sidebar.classList.toggle('collapsed');
    
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
