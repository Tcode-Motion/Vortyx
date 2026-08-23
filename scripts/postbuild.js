const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '..', 'out');

if (!fs.existsSync(outDir)) {
  console.error('out/ directory does not exist. Run next build first.');
  process.exit(1);
}

// 1. Ensure .nojekyll
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
console.log('Created out/.nojekyll');

// 2. Ensure CNAME exists if needed
const cnameFile = path.resolve(__dirname, '..', 'public', 'CNAME');
if (fs.existsSync(cnameFile)) {
  fs.copyFileSync(cnameFile, path.join(outDir, 'CNAME'));
}

// 3. Mirror root assets to out/Vortyx for subpath compatibility
const vortyxDir = path.join(outDir, 'Vortyx');
if (!fs.existsSync(vortyxDir)) {
  fs.mkdirSync(vortyxDir, { recursive: true });
}

function copyRecursive(src, dest, ignoreDirs = []) {
  if (!fs.existsSync(src)) return;
  const items = fs.readdirSync(src);
  for (const item of items) {
    if (ignoreDirs.includes(item)) continue;
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyRecursive(srcPath, destPath, ignoreDirs);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 4. Flatten Next.js RSC payload files (__next.route/__PAGE__.txt -> __next.route.__PAGE__.txt)
function fixRscPayloadFiles(targetDir) {
  if (!fs.existsSync(targetDir)) return;
  const entries = fs.readdirSync(targetDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('__next.')) {
        const pageTxt = path.join(fullPath, '__PAGE__.txt');
        if (fs.existsSync(pageTxt)) {
          const flatTxt = path.join(targetDir, `${entry.name}.__PAGE__.txt`);
          fs.copyFileSync(pageTxt, flatTxt);
        }
      }
      fixRscPayloadFiles(fullPath);
    }
  }
}

// Mirror all pages and chunks to out/Vortyx
console.log('Mirroring out/ content to out/Vortyx/ for GitHub Pages subpath compatibility...');
copyRecursive(outDir, vortyxDir, ['Vortyx', '.git']);

// Apply RSC payload aliases to both out/ and out/Vortyx/
fixRscPayloadFiles(outDir);
fixRscPayloadFiles(vortyxDir);

console.log('Post-build sync complete. out/ is ready for dual root and subpath hosting.');
