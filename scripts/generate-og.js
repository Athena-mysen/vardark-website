// Generate OG image as SVG → convert to PNG
// This creates a 1200x630 OG image for social media sharing

const fs = require('fs');
const { execSync } = require('child_process');

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070c14"/>
      <stop offset="100%" stop-color="#0c1624"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="rgba(56,189,248,0.12)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  </defs>
  
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  
  <!-- Grid lines -->
  <line x1="0" y1="0" x2="1200" y2="0" stroke="rgba(56,189,248,0.06)" stroke-width="1"/>
  <line x1="200" y1="0" x2="200" y2="630" stroke="rgba(56,189,248,0.04)" stroke-width="1"/>
  <line x1="400" y1="0" x2="400" y2="630" stroke="rgba(56,189,248,0.04)" stroke-width="1"/>
  <line x1="600" y1="0" x2="600" y2="630" stroke="rgba(56,189,248,0.04)" stroke-width="1"/>
  <line x1="800" y1="0" x2="800" y2="630" stroke="rgba(56,189,248,0.04)" stroke-width="1"/>
  <line x1="1000" y1="0" x2="1000" y2="630" stroke="rgba(56,189,248,0.04)" stroke-width="1"/>
  
  <!-- Logo -->
  <text x="80" y="120" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="700" letter-spacing="4">
    <tspan fill="#38bdf8">V</tspan><tspan fill="#eef4fb">ARDARK</tspan>
  </text>
  
  <!-- Main title -->
  <text x="80" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="700" fill="#eef4fb" letter-spacing="-1">Teknologi med</text>
  <text x="80" y="360" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="700" fill="#38bdf8" letter-spacing="-1">retning og mening</text>
  
  <!-- Subtitle -->
  <text x="80" y="430" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#7fa3c0" letter-spacing="0.5">AI · Sikkerhet · Smidig transformasjon</text>
  
  <!-- Tags -->
  <rect x="80" y="490" width="100" height="32" rx="4" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.2)" stroke-width="1"/>
  <text x="130" y="512" font-family="system-ui" font-size="14" fill="#7fa3c0" text-anchor="middle" font-weight="500">TOGAF</text>
  
  <rect x="200" y="490" width="130" height="32" rx="4" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.2)" stroke-width="1"/>
  <text x="265" y="512" font-family="system-ui" font-size="14" fill="#7fa3c0" text-anchor="middle" font-weight="500">SAFe Agilist</text>
  
  <rect x="350" y="490" width="80" height="32" rx="4" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.2)" stroke-width="1"/>
  <text x="390" y="512" font-family="system-ui" font-size="14" fill="#7fa3c0" text-anchor="middle" font-weight="500">CEH</text>
  
  <rect x="450" y="490" width="120" height="32" rx="4" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.2)" stroke-width="1"/>
  <text x="510" y="512" font-family="system-ui" font-size="14" fill="#7fa3c0" text-anchor="middle" font-weight="500">DevSecOps</text>
  
  <!-- Domain -->
  <text x="80" y="590" font-family="system-ui" font-size="20" fill="#3d5a73" font-weight="500">vardark.no</text>
  
  <!-- Bottom accent line -->
  <rect x="0" y="625" width="1200" height="5" fill="#38bdf8" opacity="0.6"/>
</svg>`;

const svgPath = '/tmp/og-image.svg';
const pngPath = 'public/og-image.png';

fs.writeFileSync(svgPath, svg);

// Try sips (macOS) for conversion
try {
  // First try with rsvg-convert if available
  execSync(`which rsvg-convert && rsvg-convert -w 1200 -h 630 ${svgPath} -o ${pngPath}`, { stdio: 'pipe' });
  console.log('Generated OG image with rsvg-convert');
} catch {
  try {
    // Fallback: use sips via a temp file approach
    execSync(`sips -s format png ${svgPath} --out ${pngPath} 2>/dev/null`, { stdio: 'pipe' });
    console.log('Generated OG image with sips');
  } catch {
    // Last resort: just use the SVG as og-image
    fs.copyFileSync(svgPath, 'public/og-image.svg');
    console.log('Could not convert to PNG, using SVG');
    console.log('Install rsvg-convert: brew install librsvg');
  }
}
