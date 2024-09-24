document.addEventListener('DOMContentLoaded', (event) => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') || 'dark-mode';
    body.classList.add(currentTheme);
    themeIcon.className = currentTheme === 'light-mode' ? 'fas fa-sun' : 'fas fa-moon';

    themeToggleBtn.addEventListener('click', () => {
        const isLightMode = body.classList.contains('light-mode');
        body.classList.toggle('light-mode', !isLightMode);
        body.classList.toggle('dark-mode', isLightMode);

        const newTheme = isLightMode ? 'dark-mode' : 'light-mode';
        themeIcon.className = isLightMode ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', newTheme);
    });
});
