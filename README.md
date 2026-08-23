# Vortyx — Official Website Source

This directory contains the source code for the official website of the **Vortyx** Android application. It is built using **Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion**.

🌐 **Live Website & Web Downloader:**
* **Primary (GitHub Pages):** [https://techscript.is-a.dev/Vortyx/](https://techscript.is-a.dev/Vortyx/)
* **Alternative Mirror 1 (Firebase):** [https://vortyx-app.web.app/](https://vortyx-app.web.app/)
* **Alternative Mirror 2 (Firebase):** [https://vortyx-app.firebaseapp.com/](https://vortyx-app.firebaseapp.com/)

---

## 🛠️ Project Structure

*   `src/app/` — Contains all App Router pages (`page.tsx`, `/download`, `/features`, `/screenshots`, `/contact`, `/privacy`, `/terms`, etc.).
*   `src/components/` — Reusable React components:
    *   `PhoneMockup.tsx` — Custom modern mobile device shell that automatically crops system bars from raw screenshots.
    *   `ScreenshotCarousel.tsx` — Responsive sliding carousel (desktop) and swipe layout (mobile) with full-screen zoom lightbox modal.
    *   `Navbar.tsx` & `Footer.tsx` — Sticky glassmorphic header and links section.
    *   `ThemeContext.tsx` — Context hook for Light/Dark mode state management.
*   `public/` — Public assets, including web icons, screenshots, and the release installer APK.

---

## 🚀 Local Development

To start the local development server:

1.  Make sure you have Node.js installed.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000/Vortyx](http://localhost:3000/Vortyx) in your browser.

---

## 📦 Static Export & Deployment

The website is configured to compile into a static HTML export suitable for hosting on **GitHub Pages**, **Vercel**, or **Netlify**:

### 1. Compile the Static Build
This exports the static files directly into the `out/` directory:
```bash
npm run build
```

### 2. Deploy to GitHub Pages
To publish the `/out` directory to the `gh-pages` branch (including hidden `.nojekyll` bypass files):
```bash
npx gh-pages -d out --dotfiles
```
