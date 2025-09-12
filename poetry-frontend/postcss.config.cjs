/*
 File: postcss.config.cjs
 Purpose: PostCSS pipeline enabling Tailwind and autoprefixer so @tailwind and
 @apply directives are processed and not flagged by raw CSS linters.
 All Rights Reserved. Arodi Emmanuel
*/
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
