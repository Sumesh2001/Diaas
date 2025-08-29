/**
 * Theme Management for diaas Website
 */

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('diaas-theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeToggle();
        this.setupSystemThemeListener();
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
            this.updateThemeToggleIcon();
        }
    }

    setupSystemThemeListener() {
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('diaas-theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveThemePreference();
        this.updateThemeToggleIcon();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Update meta theme color
        this.updateMetaThemeColor(theme);
        
        // Trigger theme change event
        this.dispatchThemeChangeEvent(theme);
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = theme === 'dark' ? '#1a1a1a' : '#ffffff';
    }

    updateThemeToggleIcon() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            themeToggle.title = `Switch to ${this.currentTheme === 'light' ? 'dark' : 'light'} theme`;
        }
    }

    saveThemePreference() {
        localStorage.setItem('diaas-theme', this.currentTheme);
    }

    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themeChange', {
            detail: { theme }
        });
        document.dispatchEvent(event);
    }

    getTheme() {
        return this.currentTheme;
    }

    // Preset theme configurations
    getThemeConfig(theme) {
        const configs = {
            light: {
                primary: '#ff6b35',
                secondary: '#2d6e5e',
                background: '#ffffff',
                surface: '#f8f9fa',
                text: '#333333'
            },
            dark: {
                primary: '#ff6b35',
                secondary: '#2d6e5e',
                background: '#1a1a1a',
                surface: '#2d2d2d',
                text: '#ffffff'
            }
        };
        
        return configs[theme] || configs.light;
    }
}

// Advanced Theme Effects
class ThemeEffects {
    constructor(themeManager) {
        this.themeManager = themeManager;
        this.init();
    }

    init() {
        this.setupThemeTransitions();
        this.setupThemeAnimations();
        this.listenToThemeChanges();
    }

    setupThemeTransitions() {
        // Add smooth transitions for theme changes
        const transitionElements = [
            'body',
            '.navbar',
            '.hero-section',
            '.feature-card',
            '.dropdown-menu'
        ];

        transitionElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease';
            });
        });
    }

    setupThemeAnimations() {
        // Theme-specific animations
        document.addEventListener('themeChange', (e) => {
            this.animateThemeChange(e.detail.theme);
        });
    }

    animateThemeChange(theme) {
        // Create a ripple effect from the theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            this.createRippleEffect(themeToggle, theme);
        }

        // Animate logo color change
        this.animateLogoTransition(theme);
    }

    createRippleEffect(button, theme) {
        const ripple = document.createElement('div');
        const rect = button.getBoundingClientRect();
        const size = Math.max(window.innerWidth, window.innerHeight) * 2;
        
        ripple.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: ${size}px;
            height: ${size}px;
            background: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'};
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            pointer-events: none;
            z-index: 9998;
        `;

        document.body.appendChild(ripple);

        // Trigger animation
        requestAnimationFrame(() => {
            ripple.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    animateLogoTransition(theme) {
        const logoIcons = document.querySelectorAll('.logo-icon');
        logoIcons.forEach(icon => {
            icon.style.transform = 'rotate(360deg) scale(1.2)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 300);
        });
    }

    listenToThemeChanges() {
        document.addEventListener('themeChange', (e) => {
            const theme = e.detail.theme;
            
            // Update chart colors if any charts are present
            this.updateChartColors(theme);
            
            // Update syntax highlighting if code blocks are present
            this.updateCodeHighlighting(theme);
        });
    }

    updateChartColors(theme) {
        // Implementation for updating chart colors based on theme
        const charts = document.querySelectorAll('[data-chart]');
        charts.forEach(chart => {
            // Update chart theme colors
            console.log(`Updating chart theme to: ${theme}`);
        });
    }

    updateCodeHighlighting(theme) {
        // Implementation for updating code syntax highlighting
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            block.className = block.className.replace(/theme-\w+/, `theme-${theme}`);
        });
    }
}

// Color Palette Manager
class ColorPalette {
    constructor() {
        this.palettes = {
            default: {
                primary: '#ff6b35',
                secondary: '#2d6e5e',
                accent: '#ff8c42'
            },
            ocean: {
                primary: '#0077be',
                secondary: '#003f5c',
                accent: '#00a8cc'
            },
            sunset: {
                primary: '#ff6b6b',
                secondary: '#4ecdc4',
                accent: '#45b7d1'
            }
        };
    }

    applyPalette(paletteName) {
        const palette = this.palettes[paletteName];
        if (palette) {
            document.documentElement.style.setProperty('--diaas-orange', palette.primary);
            document.documentElement.style.setProperty('--diaas-green', palette.secondary);
            document.documentElement.style.setProperty('--diaas-accent', palette.accent);
        }
    }

    createCustomPalette(colors) {
        const customPaletteName = 'custom-' + Date.now();
        this.palettes[customPaletteName] = colors;
        return customPaletteName;
    }
}

// Initialize theme management
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    const themeEffects = new ThemeEffects(themeManager);
    const colorPalette = new ColorPalette();
    
    // Make theme manager globally accessible
    window.diaasTheme = {
        themeManager,
        themeEffects,
        colorPalette
    };
});

// Utility functions for theme management
const ThemeUtils = {
    // Get current theme
    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    },

    // Check if dark theme is active
    isDarkTheme() {
        return this.getCurrentTheme() === 'dark';
    },

    // Get theme-appropriate color
    getThemeColor(lightColor, darkColor) {
        return this.isDarkTheme() ? darkColor : lightColor;
    },

    // Apply theme-specific styles to element
    applyThemeStyles(element, lightStyles, darkStyles) {
        const styles = this.isDarkTheme() ? darkStyles : lightStyles;
        Object.assign(element.style, styles);
    }
};

// Export for use in other modules
window.ThemeUtils = ThemeUtils;
