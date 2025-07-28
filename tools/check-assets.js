
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, '..', 'src');
const publicDir = path.join(__dirname, '..', 'public');

function findAssetReferences(dir, extensions = ['.jsx', '.js', '.css']) {
  const references = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDirectory(fullPath);
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        // Find image references
        const imageMatches = content.match(/(?:src|href)=["']([^"']*\.(jpg|jpeg|png|gif|svg|webp|ico))["']/gi);
        if (imageMatches) {
          imageMatches.forEach(match => {
            const src = match.match(/["']([^"']*)["']/)[1];
            references.push({
              file: path.relative(path.join(__dirname, '..'), fullPath),
              asset: src,
              type: 'image'
            });
          });
        }
        
        // Find CSS references
        const cssMatches = content.match(/(?:href|import)=?["']([^"']*\.css)["']/gi);
        if (cssMatches) {
          cssMatches.forEach(match => {
            const src = match.match(/["']([^"']*)["']/)[1];
            if (src.startsWith('http')) {
              references.push({
                file: path.relative(path.join(__dirname, '..'), fullPath),
                asset: src,
                type: 'external-css'
              });
            }
          });
        }
        
        // Find external URLs
        const urlMatches = content.match(/https?:\/\/[^\s"'<>]+/gi);
        if (urlMatches) {
          urlMatches.forEach(url => {
            if (url.includes('font') || url.includes('cdn') || url.includes('googleapis')) {
              references.push({
                file: path.relative(path.join(__dirname, '..'), fullPath),
                asset: url,
                type: 'external-url'
              });
            }
          });
        }
      }
    }
  }
  
  scanDirectory(dir);
  return references;
}

console.log('🔍 Scanning for asset references...\n');

const srcReferences = findAssetReferences(srcDir);
const publicReferences = findAssetReferences(publicDir, ['.html']);

const allReferences = [...srcReferences, ...publicReferences];

if (allReferences.length === 0) {
  console.log('✅ No problematic asset references found!');
} else {
  console.log('📋 Found asset references:\n');
  
  allReferences.forEach(ref => {
    console.log(`📁 ${ref.file}`);
    console.log(`   ${ref.type}: ${ref.asset}`);
    
    if (ref.type === 'image' && !ref.asset.startsWith('http')) {
      const assetPath = path.join(publicDir, ref.asset);
      const exists = fs.existsSync(assetPath);
      console.log(`   Status: ${exists ? '✅ EXISTS' : '❌ MISSING'}`);
    }
    console.log('');
  });
}
