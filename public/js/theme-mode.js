document.addEventListener('DOMContentLoaded', () => {

    let themeStylesheet = document.getElementById('theme-mode');
    let themeToggle = document.getElementById('theme-toggle');
    let sectionTheme = document.getElementById('main');

    themeToggle.addEventListener('click', () => {

        if(themeStylesheet.href.includes('light')){
            themeStylesheet.href = 'css/theme/dark-theme.css';
            themeToggle.innerText = 'Light mode';
            sectionTheme.classList.add('is-dark')
            sectionTheme.classList.remove('is-light')

            return;
        }

        themeStylesheet.href = 'css/theme/light-theme.css';
        themeToggle.innerText = 'Dark mode';
        sectionTheme.classList.add('is-light');
        sectionTheme.classList.remove('is-dark')

    })

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        themeToggle.click();
    }
})
