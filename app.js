// Cada projeto: para adicionar um novo, copie um bloco, troque os textos
// e coloque as imagens em assets/projetos/<pasta>/. "link" é opcional —
// deixe null quando o projeto não estiver publicado.
const projetos = [
    {
        titulo: 'Dízimo Digital',
        descricao: 'Sistema completo para gestão financeira de igrejas, com controle de dízimos, ofertas e membros.',
        tecnologias: ['Laravel', 'Bootstrap', 'MySQL'],
        icone: 'fa-solid fa-hand-holding-dollar',
        imagens: ['assets/projetos/dizimo-digital/1.svg', 'assets/projetos/dizimo-digital/2.svg'],
        link: null,
    },
    {
        titulo: 'Sunny Next',
        descricao: 'Plataforma para organização pessoal, reunindo tarefas, metas e rotina em um só lugar.',
        tecnologias: ['Laravel', 'Bootstrap', 'MySQL'],
        icone: 'fa-solid fa-sun',
        imagens: ['assets/projetos/sunny-next/1.svg', 'assets/projetos/sunny-next/2.svg'],
        link: null,
    },
    {
        titulo: 'Landing Page',
        descricao: 'Página para divulgação de um produto de marketing digital.',
        tecnologias: ['HTML', 'CSS'],
        icone: 'fa-solid fa-bullhorn',
        imagens: ['assets/projetos/landing-page/1.svg'],
        link: 'https://landingpagemktdigital.netlify.app/',
    },
];

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

    // ---------- Renderização dos projetos ----------
    const projetosGrid = document.getElementById('projetos-grid');

    projetosGrid.innerHTML = projetos.map((projeto, index) => `
        <article class="projeto-card">
            <div class="projeto-cover" data-abrir-galeria="${index}">
                <img src="${projeto.imagens[0]}" alt="Captura de tela do projeto ${projeto.titulo}">
                ${projeto.imagens.length > 1 ? `
                    <span class="gallery-badge"><i class="fa-solid fa-images"></i> ${projeto.imagens.length}</span>
                ` : ''}
            </div>
            <div class="projeto-body">
                <div class="projeto-icon"><i class="${projeto.icone}"></i></div>
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
                <div class="tags">
                    ${projeto.tecnologias.map((tec) => `<span>${tec}</span>`).join('')}
                </div>
                <div class="projeto-actions">
                    <button type="button" class="projeto-link" data-abrir-galeria="${index}">
                        Ver ${projeto.imagens.length > 1 ? 'Imagens' : 'Imagem'} <i class="fa-solid fa-images"></i>
                    </button>
                    ${projeto.link ? `
                        <a href="${projeto.link}" target="_blank" rel="noopener" class="projeto-link-icon" aria-label="Abrir projeto em nova aba">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    ` : ''}
                </div>
            </div>
        </article>
    `).join('');

    // ---------- Lightbox de imagens dos projetos ----------
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    let projetoAtual = 0;
    let imagemAtual = 0;

    const abrirLightbox = (projetoIndex, imagemIndex = 0) => {
        projetoAtual = projetoIndex;
        imagemAtual = imagemIndex;
        atualizarLightbox();
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const fecharLightbox = () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    };

    const atualizarLightbox = () => {
        const projeto = projetos[projetoAtual];
        lightboxImg.src = projeto.imagens[imagemAtual];
        lightboxImg.alt = `Captura de tela do projeto ${projeto.titulo}`;
        lightboxCaption.textContent = `${projeto.titulo} — ${imagemAtual + 1}/${projeto.imagens.length}`;
    };

    const proximaImagem = () => {
        const total = projetos[projetoAtual].imagens.length;
        imagemAtual = (imagemAtual + 1) % total;
        atualizarLightbox();
    };

    const imagemAnterior = () => {
        const total = projetos[projetoAtual].imagens.length;
        imagemAtual = (imagemAtual - 1 + total) % total;
        atualizarLightbox();
    };

    projetosGrid.querySelectorAll('[data-abrir-galeria]').forEach((el) => {
        el.addEventListener('click', () => abrirLightbox(Number(el.dataset.abrirGaleria)));
    });

    document.getElementById('lightbox-close').addEventListener('click', fecharLightbox);
    document.getElementById('lightbox-next').addEventListener('click', proximaImagem);
    document.getElementById('lightbox-prev').addEventListener('click', imagemAnterior);

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) fecharLightbox();
    });

    document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('open')) return;
        if (event.key === 'Escape') fecharLightbox();
        if (event.key === 'ArrowRight') proximaImagem();
        if (event.key === 'ArrowLeft') imagemAnterior();
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
