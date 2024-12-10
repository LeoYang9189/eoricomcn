/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    tailwindcss: require('./tailwind.config.cjs'),
    autoprefixer: {},
  },
}