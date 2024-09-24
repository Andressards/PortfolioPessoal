// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') || 'light-mode';
    body.classList.add(currentTheme);
    themeIcon.textContent = currentTheme === 'light-mode' ? '🌞' : '🌜';

    themeToggleBtn.addEventListener('click', () => {
        const isLightMode = body.classList.contains('light-mode');
        body.classList.toggle('light-mode', !isLightMode);
        body.classList.toggle('dark-mode', isLightMode);

        const newTheme = isLightMode ? 'dark-mode' : 'light-mode';
        themeIcon.textContent = isLightMode ? '🌜' : '🌞';
        localStorage.setItem('theme', newTheme);
    });
});
