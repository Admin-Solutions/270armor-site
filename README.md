# 2/70 Armor "Iron Tigers" - Desert Storm Living History

A living history project preserving the stories of 2nd Battalion, 70th Armor Regiment during Operation Desert Storm 1991.

## About

This site honors the soldiers of 2/70 Armor who served in Operation Desert Storm, including:
- Battalion history and organization
- Timeline from deployment to homecoming
- Primary source video footage
- Information about the book "Bandit" by Mark T. Gerges
- The Forward Together Project connection
- Resources for Gulf War veterans

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### GitHub Pages

1. Install gh-pages:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Add to `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/270armor-site",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.js`:
   ```js
   export default defineConfig({
     base: '/270armor-site/',
     plugins: [react()],
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Netlify

1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel

1. Push to GitHub
2. Import project to Vercel
3. Framework preset: Vite
4. Deploy

### Manual Deployment

1. Run `npm run build`
2. Upload contents of `dist/` folder to your web host

## Project Structure

```
270armor-site/
├── public/
│   └── favicon.ico
├── src/
│   ├── App.jsx        # Main React component
│   ├── index.css      # Styles
│   └── main.jsx       # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Tech Stack

- React 18
- Vite
- CSS (custom, no framework)
- Google Fonts (Bebas Neue, Source Serif 4, Inter)

## Contributing

If you served with 2/70 Armor or have photos, stories, or memories to share, we want to hear from you.

## Links

- [Bandit on Amazon](https://www.amazon.com/Bandit-Inside-Company-Battles-Campaigns/dp/1985903903)
- [Forward Together Project](https://theforwardtogetherproject.org)
- [National Desert Storm Memorial](https://www.ndswm.org)
- [VA Gulf War Health Resources](https://www.va.gov/health-care/health-needs-conditions/health-issues-related-to-service-era/gulf-war/)

## License

This project is dedicated to preserving the memory and stories of all who served with 2/70 Armor.

---

**Strike Swiftly** 🐅
