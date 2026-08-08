document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const menuToggleBtn = document.getElementById('menu-toggle');
    const navLinksEl = document.getElementById('nav-links');
    const backToTopBtn = document.getElementById('back-to-top');
    const yearEl = document.getElementById('year');

    // ---------- Tema claro/escuro ----------
    const applyTheme = (theme) => {
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            root.removeAttribute('data-theme');
            themeIcon.className = 'fa-solid fa-moon';
        }
    };

    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const isLight = root.getAttribute('data-theme') === 'light';
        const newTheme = isLight ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // ---------- Menu mobile ----------
    menuToggleBtn.addEventListener('click', () => {
        navLinksEl.classList.toggle('open');
    });

    navLinksEl.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => navLinksEl.classList.remove('open'));
    });

    // ---------- Ano no rodapé ----------
    yearEl.textContent = new Date().getFullYear();

    // ---------- Botão voltar ao topo ----------
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('show', window.scrollY > 400);
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- Animação ao rolar a página ----------
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach((el) => revealObserver.observe(el));

    // ---------- Link ativo na navbar ----------
    const sections = document.querySelectorAll('main section, header.hero');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-45% 0px -45% 0px' });

    sections.forEach((section) => navObserver.observe(section));
});
