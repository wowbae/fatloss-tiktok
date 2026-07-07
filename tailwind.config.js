/** @type {import('tailwindcss').Config} */
// Дизайн-токены: цвета, шрифты, скругления, тайминги — единый источник правды
export default {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        bg: '#0f0f0f',
        'bg-card': '#1a1a1a',
        paper: '#FFFFFF',
        mist: '#F5F5F7',
        text: '#e8e4df',
        'text-dim': '#9a9590',
        'text-muted': '#6b6661',
        warm: '#d4a574',
        gold: '#c9b896',
        accent: {
          DEFAULT: '#FF6B35',
          hover: '#E85A28',
        },
        'off-black': '#0a0a0a',
        surface: '#141414',
        elevated: '#1e1e1e',
        'warm-v2': '#c9a97a',
        ember: '#d47b4a',
        'text-v2': '#eae6df',
        'text-dim-v2': '#9e9890',
        'text-muted-v2': '#6b6560',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Outfit', 'Inter', '"SF Pro Display"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        mobile: '480px',
      },
      minHeight: {
        touch: '44px',
      },
      transitionTimingFunction: {
        // ease-out-expo — премиальное замедление (Apple-style)
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
