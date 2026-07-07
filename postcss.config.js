// postcss-import → Tailwind → autoprefixer (именно в таком порядке)
export default {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
