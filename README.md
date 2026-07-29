# tortilladepatatas.org — Cuaderno & Ciencia Culinaria

An open culinary notebook and food safety guide for the authentic Spanish Omelette (*Tortilla de Patatas*). Built with **Astro**, **React**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 How Build & Publishing Works (Static HTML vs. Vite Bundles)

When you run `npm run build`, Astro performs **Static Site Generation (SSG)**:

1. **Static HTML Pages**: Astro pre-renders every route and language variant (`/es/`, `/en/`, `/de/`, `/es/builder`, `/es/science`, `/es/recipes`, etc.) into static `.html` files inside the `dist/` directory. This delivers ultra-fast page loads, zero-JS initial renders, and maximum SEO performance.
2. **Optimized Client JS Bundles**: For interactive React components marked with `client:load` (such as the interactive **Tortilla Builder**, **Header/Language Drawer**, and **Interactive Cards**), Vite bundles minimal JavaScript required for client hydration.
3. **Zero-Server Requirement**: The resulting `dist/` directory is completely standalone and static. You do **not** need a Node.js server to run the live application.

---

## 📥 How to Download & Publish This Project

### 1. Export / Download Code
- **Via AI Studio**: Click **Settings** in the top right, then choose **Export to GitHub** or **Download ZIP**.
- Unzip the project folder on your machine (or clone your exported GitHub repository).

---

### 2. Local Installation & Development

Make sure you have **Node.js** (v18+ recommended) installed.

```bash
# Install dependencies
npm install

# Start local development server (runs on http://localhost:3000)
npm run dev
```

---

### 3. Build for Production

Generate the static production build:

```bash
npm run build
```

This creates the output folder `dist/` containing all static HTML files, CSS, images, and optimized Vite JavaScript bundles.

To preview the production build locally:

```bash
npm run preview
```

---

### 4. Publishing to Web Hosting

You can publish the generated `dist/` folder to any static hosting provider for free:

#### Option A: Vercel / Netlify / Cloudflare Pages
1. Connect your GitHub repository to **Vercel**, **Netlify**, or **Cloudflare Pages**.
2. Set the configuration settings:
   - **Framework Preset**: `Astro`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click **Deploy**.

#### Option B: GitHub Pages
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Choose **GitHub Actions** as the source and select the default Astro workflow.

#### Option C: Standard Web Server (Apache / Nginx / Shared Hosting)
1. Run `npm run build` locally.
2. Upload the contents of the `dist/` directory directly to your web server's `public_html` or root directory via FTP / SFTP.

---

## 🛠️ Project Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Runs the Astro development server on `http://localhost:3000` |
| **Production Build** | `npm run build` | Builds static HTML pages & Vite assets into `/dist` |
| **Preview** | `npm run preview` | Serves the production `/dist` build locally |
| **Linter** | `npm run lint` | Runs Oxlint for fast TypeScript/JSX code analysis |

---

## 📁 Project Structure

```
├── astro.config.mjs     # Astro configuration & React integration
├── package.json         # Dependencies and scripts
├── public/              # Static assets (images, icons)
└── src/
    ├── components/      # React & Astro components
    │   ├── home/        # Hero, Feature Grid, Builder Teaser
    │   ├── layout/      # Header, Footer, Sub-nav
    │   └── ui/          # Radix & Tailwind UI primitives
    ├── layouts/         # Base & Page Astro layouts
    ├── lib/             # i18n translations & culinary math engine
    ├── pages/           # Astro routes with i18n static paths ([lang]/)
    └── index.css        # Global Tailwind CSS styles
```
