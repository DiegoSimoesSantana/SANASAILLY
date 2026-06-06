module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-night': '#0a0713',
        'brand-purple': '#8a2be2',
        'brand-turquoise': '#40e0d0',
        'brand-pink': '#ff1493',
        'brand-orange': '#ff8c00',
        'brand-gold': '#ffd54d',
      },
      boxShadow: {
        glow: '0 18px 40px rgba(255, 20, 147, 0.2)',
      },
    },
  },
  plugins: [],
};
