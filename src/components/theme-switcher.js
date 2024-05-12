class ThemeSwitcher extends HTMLElement {
  connectedCallback() {
    const defaultTheme = 'light';

    const applyTheme = (theme) => {
      const selectedButton = this.querySelector(`[data-theme="${theme}"]`);
      if (selectedButton) {
        this.querySelectorAll('button').forEach((button) => {
          button.setAttribute('aria-pressed', button === selectedButton ? 'true' : 'false');
        });
        document.documentElement.setAttribute('data-selected-theme', theme);
        localStorage.setItem('selected-theme', theme);
      }
    };

    const handleThemeSelection = (event) => {
      const target = event.target;
      const theme = target.getAttribute('data-theme');
      if (target.getAttribute('aria-pressed') !== 'true') {
        applyTheme(theme);
      }
    };

    const setInitialTheme = () => {
      const savedTheme = localStorage.getItem('selected-theme');
      if (savedTheme && savedTheme !== defaultTheme) {
        applyTheme(savedTheme);
      }
    };

    setInitialTheme();

    this.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        handleThemeSelection(event);
      }
    });
  }
}

customElements.define('theme-switcher', ThemeSwitcher);