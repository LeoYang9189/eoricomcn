/** @type {import('postcss').Config} */
export default {
  plugins: {
    tailwindcss: {
      config: './tailwind.config.cjs'
    },
    autoprefixer: {},
  },
}