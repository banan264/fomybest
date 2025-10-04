```js
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## postcss.config.cjs

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
export default defineConfig({
  base: '/fomybest/',
  plugins: [react()],
})
```
