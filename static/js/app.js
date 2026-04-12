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
    activeSection = 'page-monitoring';
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
    activeSection = 'page-api-automation';
  } else if (currentPath.startsWith('/load-testing')) {
    activeSection = 'page-load-testing';
  } else if (currentPath.startsWith('/ai-sql')) {
    activeSection = 'page-ai-sql';
  } else if (currentPath.startsWith('/settings')) {
    activeSection = 'page-settings';
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
  } else if (currentPath === '/monitoring') {
    activeLink = document.querySelector('.nav-link[href="/monitoring"]');
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
    document.querySelectorAll('.nav-child').forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.startsWith(href.replace(/^\//, ''))) {
        activeLink = link;
      }
    });
    if (!activeLink) activeLink = document.querySelector('.nav-child[href="/api-automation/dashboard"]');
  } else if (currentPath.startsWith('/load-testing')) {
    document.querySelectorAll('.nav-child').forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.startsWith(href.replace(/^\//, ''))) {
        activeLink = link;
      }
    });
    if (!activeLink) activeLink = document.querySelector('.nav-child[href="/load-testing/dashboard"]');
  } else if (currentPath.startsWith('/ai-sql')) {
    document.querySelectorAll('.nav-child').forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.startsWith(href.replace(/^\//, ''))) {
        activeLink = link;
      }
    });
    if (!activeLink) activeLink = document.querySelector('.nav-child[href="/ai-sql/runner"]');
  } else if (currentPath.startsWith('/settings')) {
    document.querySelectorAll('.nav-child').forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.startsWith(href.replace(/^\//, ''))) {
        activeLink = link;
      }
    });
    if (!activeLink) activeLink = document.querySelector('.nav-child[href="/settings/general"]');
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
      const isOpen = accordion.classList.toggle('open');
      
      if (isOpen) {
        children.style.maxHeight = children.scrollHeight + 'px';
        children.style.opacity = '1';
        button.setAttribute('aria-expanded', 'true');
      } else {
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
