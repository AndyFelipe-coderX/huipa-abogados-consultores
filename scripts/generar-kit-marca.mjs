import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  sharp = require('c:/Users/juipa/Downloads/02_LUCRO/andy-jc-legal-studio/node_modules/sharp');
}

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const salida = 'c:\\Users\\juipa\\Downloads\\Juipa-Asociados-kit-de-marca';
const tmp = path.join(raiz, '.tmp-marca');

fs.rmSync(tmp, { recursive: true, force: true });
fs.mkdirSync(tmp, { recursive: true });

// Carpetas del kit
const dirs = [
  '00-guia',
  '01-logotipo',
  '02-perfil',
  '03-portadas',
  '04-publicaciones',
  '05-fuentes',
  '06-firma-de-correo'
];
for (const d of dirs) {
  fs.mkdirSync(path.join(salida, d), { recursive: true });
}

const CHROME =
  process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// Colores oficiales de Juipa & Asociados (extraídos del CSS del sitio)
const COLORES = {
  tinta: '#1B1916',        // Warm black
  tinta2: '#4A453E',       // Secondary warm dark
  burdeos: '#7D1D2C',      // Burdeos acento institucional
  burdeosDark: '#5E1621',  // Burdeos banda urgencias
  papel: '#F5F1EA',        // Marfil pergamino claro
  papel2: '#ECE6DC',       // Marfil suave alternativo
  gris: '#7D766B',         // Muted labels
  linea: '#D9D0C2',        // Bordes y divisores
  blanco: '#FFFFFF',
  dorado: '#D2A777',       // Latón cálido modo noche
  negroPuro: '#000000',
};

// Cargar fuentes locales en WOFF2 y convertir a Base64
const woff2FrauncesNormal = fs.readFileSync(
  path.join(raiz, 'node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2')
).toString('base64');

const woff2FrauncesItalic = fs.readFileSync(
  path.join(raiz, 'node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2')
).toString('base64');

const woff2Inter = fs.readFileSync(
  path.join(raiz, 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')
).toString('base64');

const cssFuentes = `
@font-face {
  font-family: 'Fraunces';
  src: url('data:font/woff2;base64,${woff2FrauncesNormal}') format('woff2');
  font-weight: 300 700;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: 'Fraunces';
  src: url('data:font/woff2;base64,${woff2FrauncesItalic}') format('woff2');
  font-weight: 300 700;
  font-style: italic;
  font-display: block;
}
@font-face {
  font-family: 'Inter';
  src: url('data:font/woff2;base64,${woff2Inter}') format('woff2');
  font-weight: 300 700;
  font-style: normal;
  font-display: block;
}
`;

const captura = (html, archivo, w, h, escala = 2) => {
  const f = path.join(tmp, archivo + '.html');
  fs.writeFileSync(f, html);
  const url = 'file:///' + f.replace(/\\/g, '/');
  const png = path.join(tmp, archivo + '.png');
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
    '--default-background-color=00000000',
    `--window-size=${w},${h}`, `--force-device-scale-factor=${escala}`,
    '--screenshot=' + png, url,
  ], { stdio: 'ignore' });
  return { png, url };
};

const imprimirPdf = (url, destino) => {
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer',
    '--print-to-pdf=' + destino, url,
  ], { stdio: 'ignore' });
};

console.log('🚀 Iniciando generación del Kit de Marca de Juipa & Asociados...');

// ============================================================================
// 1. DESCARGA DE FUENTES TTF INSTALABLES (05-fuentes)
// ============================================================================
console.log('📦 1/7 Descargando fuentes tipográficas instalables (.TTF)...');
const fuentesAportar = [
  {
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/fraunces/Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf',
    nombre: 'Fraunces-Variable.ttf'
  },
  {
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/fraunces/Fraunces-Italic%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf',
    nombre: 'Fraunces-Variable-Italic.ttf'
  },
  {
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf',
    nombre: 'Inter-Variable.ttf'
  },
  {
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter-Italic%5Bopsz%2Cwght%5D.ttf',
    nombre: 'Inter-Variable-Italic.ttf'
  }
];

for (const f of fuentesAportar) {
  const dest = path.join(salida, '05-fuentes', f.nombre);
  if (!fs.existsSync(dest)) {
    try {
      const res = await fetch(f.url);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buf);
        console.log(`   ✓ ${f.nombre} (${(buf.length / 1024).toFixed(0)} KB)`);
      }
    } catch (err) {
      console.warn(`   ! Error descargando ${f.nombre}:`, err.message);
    }
  } else {
    console.log(`   ✓ ${f.nombre} (ya presente)`);
  }
}

fs.writeFileSync(path.join(salida, '05-fuentes', 'LEAME-INSTALACION.txt'),
`CÓMO INSTALAR LAS FUENTES DE JUIPA & ASOCIADOS
============================================================================

1. En Windows:
   - Selecciona los archivos .ttf (Fraunces e Inter).
   - Haz clic derecho y elige "Instalar" o "Instalar para todos los usuarios".
   - Listo. Ya aparecerán disponibles en Microsoft Word, PowerPoint, Excel, Adobe Illustrator, Photoshop, etc.

2. En Canva:
   - Ingresa a Canva → Configuración de Marca (Brand Hub) → Tipografías de marca.
   - Haz clic en "Subir tipografía" y selecciona los archivos .ttf de esta carpeta.

3. Licencia:
   - Ambas fuentes están bajo la licencia SIL Open Font License (OFL).
   - 100% libres y gratuitas para uso personal y comercial sin regalías.
`);

// ============================================================================
// 2. LOGOTIPOS Y MONOGRAMAS (01-logotipo)
// ============================================================================
console.log('🎨 2/7 Generando logotipos y monogramas...');

const htmlLogoHorizontal = (colorTexto, colorAmp, colorBajada, colorLinea, bg = 'transparent') => `
<!doctype html><html><head><meta charset="utf-8"><style>
${cssFuentes}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: ${bg};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 60px 80px;
}
.brand-wrap {
  display: inline-flex;
  align-items: center;
  gap: 32px;
}
.brand-title {
  font-family: 'Fraunces', serif;
  font-size: 78px;
  font-weight: 400;
  letter-spacing: -0.02em;
  color: ${colorTexto};
  white-space: nowrap;
  line-height: 1;
}
.brand-amp {
  font-style: italic;
  font-weight: 400;
  color: ${colorAmp};
  margin: 0 4px;
}
.divider {
  width: 2px;
  height: 52px;
  background-color: ${colorLinea};
}
.brand-sub {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${colorBajada};
  white-space: nowrap;
  line-height: 1.4;
}
</style></head><body>
<div class="brand-wrap">
  <div class="brand-title">Juipa<span class="brand-amp">&amp;</span>Asociados</div>
  <div class="divider"></div>
  <div class="brand-sub">Abogados y Consultores</div>
</div>
</body></html>
`;

const htmlMonograma = (bg, colorLetra, conRadio = true) => `
<!doctype html><html><head><meta charset="utf-8"><style>
${cssFuentes}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: transparent;
  width: 512px;
  height: 512px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tile {
  width: 512px;
  height: 512px;
  background: ${bg};
  ${conRadio ? 'border-radius: 110px;' : ''}
  display: flex;
  align-items: center;
  justify-content: center;
}
.j {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 340px;
  line-height: 1;
  color: ${colorLetra};
  transform: translate(-4px, -18px);
}
</style></head><body>
<div class="tile"><span class="j">J</span></div>
</body></html>
`;

// Variantes de logotipo
const variantesLogo = [
  { id: 'logotipo-tinta',                  texto: COLORES.tinta,  amp: COLORES.burdeos, bajada: COLORES.gris,   linea: COLORES.linea,   bg: 'transparent' },
  { id: 'logotipo-blanco',                 texto: '#FFFFFF',      amp: COLORES.dorado,  bajada: 'rgba(255,255,255,0.78)', linea: 'rgba(255,255,255,0.3)', bg: 'transparent' },
  { id: 'logotipo-negro',                  texto: '#000000',      amp: '#000000',       bajada: '#000000',      linea: '#000000',       bg: 'transparent' },
  { id: 'logotipo-burdeos',                texto: COLORES.burdeos,amp: COLORES.burdeos, bajada: COLORES.burdeos,linea: COLORES.burdeos, bg: 'transparent' },
  { id: 'logotipo-tinta-sobre-papel',      texto: COLORES.tinta,  amp: COLORES.burdeos, bajada: COLORES.tinta2, linea: COLORES.linea,   bg: COLORES.papel },
  { id: 'logotipo-blanco-sobre-burdeos',   texto: '#FFFFFF',      amp: COLORES.dorado,  bajada: COLORES.papel,  linea: 'rgba(255,255,255,0.4)', bg: COLORES.burdeos },
];

for (const v of variantesLogo) {
  const html = htmlLogoHorizontal(v.texto, v.amp, v.bajada, v.linea, v.bg);
  const { png, url } = captura(html, v.id, 1600, 300, 2);
  
  // Guardar PNG trimmed con padding en 01-logotipo
  const salidaPng = path.join(salida, '01-logotipo', v.id + '.png');
  await sharp(png)
    .trim({ threshold: 1 })
    .extend({ top: 32, bottom: 32, left: 48, right: 48, background: v.bg === 'transparent' ? { r: 0, g: 0, b: 0, alpha: 0 } : v.bg })
    .png({ compressionLevel: 9 })
    .toFile(salidaPng);

  // Guardar PDF vectorial
  const salidaPdf = path.join(salida, '01-logotipo', v.id + '.pdf');
  imprimirPdf(url, salidaPdf);

  // SVG autocontenido con fuentes base64
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 180" width="1100" height="180">
  <defs>
    <style>
      ${cssFuentes}
      .title { font-family: 'Fraunces', serif; font-size: 58px; font-weight: 400; fill: ${v.texto}; }
      .amp { font-family: 'Fraunces', serif; font-size: 58px; font-style: italic; font-weight: 400; fill: ${v.amp}; }
      .sub { font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 600; letter-spacing: 0.32em; text-transform: uppercase; fill: ${v.bajada}; }
      .div { fill: ${v.linea}; }
    </style>
  </defs>
  ${v.bg !== 'transparent' ? `<rect width="100%" height="100%" fill="${v.bg}"/>` : ''}
  <g transform="translate(40, 105)">
    <text class="title">Juipa<tspan class="amp">&amp;</tspan>Asociados</text>
    <rect class="div" x="535" y="-48" width="2" height="54"/>
    <text class="sub" x="560" y="-18">ABOGADOS Y CONSULTORES</text>
  </g>
</svg>`;
  fs.writeFileSync(path.join(salida, '01-logotipo', v.id + '.svg'), svgContent, 'utf8');
}

// Monogramas
const monogramas = [
  { id: 'monograma-burdeos',    bg: COLORES.burdeos, letra: COLORES.papel, radio: true },
  { id: 'monograma-tinta',      bg: COLORES.tinta,   letra: COLORES.papel, radio: true },
  { id: 'monograma-claro',      bg: COLORES.papel,   letra: COLORES.burdeos, radio: true },
  { id: 'monograma-sin-fondo',  bg: 'transparent',   letra: COLORES.burdeos, radio: false },
  { id: 'monograma-blanco',     bg: 'transparent',   letra: '#FFFFFF', radio: false },
];

for (const m of monogramas) {
  const html = htmlMonograma(m.bg, m.letra, m.radio);
  const { png, url } = captura(html, m.id, 512, 512, 2);
  
  const destPng = path.join(salida, '01-logotipo', m.id + '.png');
  await sharp(png).resize(1024, 1024).png({ compressionLevel: 9 }).toFile(destPng);

  if (m.bg !== 'transparent') {
    const destPdf = path.join(salida, '01-logotipo', m.id + '.pdf');
    imprimirPdf(url, destPdf);
  }

  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <style>
      ${cssFuentes}
      .j { font-family: 'Fraunces', serif; font-style: italic; font-weight: 400; font-size: 340px; fill: ${m.letra}; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  ${m.bg !== 'transparent' ? `<rect width="512" height="512" ${m.radio ? 'rx="110"' : ''} fill="${m.bg}"/>` : ''}
  <text x="252" y="246" class="j">J</text>
</svg>`;
  fs.writeFileSync(path.join(salida, '01-logotipo', m.id + '.svg'), svgContent, 'utf8');
}

// ============================================================================
// 3. FOTOS DE PERFIL PARA REDES (02-perfil)
// ============================================================================
console.log('📱 3/7 Generando fotos de perfil por plataforma...');

const perfiles = [
  { nombre: 'whatsapp-business-640', tam: 640 },
  { nombre: 'facebook-instagram-1080', tam: 1080 },
  { nombre: 'linkedin-empresa-400', tam: 400 },
  { nombre: 'linkedin-personal-o-x-400', tam: 400 },
  { nombre: 'gmail-google-500', tam: 500 },
];

for (const p of perfiles) {
  // 1. Versión Monograma (Burdeos con J marfil)
  const monoBase = path.join(salida, '01-logotipo', 'monograma-burdeos.png');
  await sharp(monoBase)
    .resize(p.tam, p.tam)
    .png({ compressionLevel: 9 })
    .toFile(path.join(salida, '02-perfil', `${p.nombre}-monograma.png`));

  // 2. Versión Logotipo completo sobre loseta
  const htmlTileLogo = `<!doctype html><html><head><meta charset="utf-8"><style>
  ${cssFuentes}
  body {
    margin: 0;
    width: ${p.tam}px;
    height: ${p.tam}px;
    background: ${COLORES.papel};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
    box-sizing: border-box;
  }
  .title {
    font-family: 'Fraunces', serif;
    font-size: ${p.tam * 0.105}px;
    font-weight: 400;
    color: ${COLORES.tinta};
    line-height: 1.1;
  }
  .amp {
    font-style: italic;
    color: ${COLORES.burdeos};
  }
  .sub {
    font-family: 'Inter', sans-serif;
    font-size: ${p.tam * 0.024}px;
    font-weight: 600;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: ${COLORES.gris};
    margin-top: ${p.tam * 0.026}px;
  }
  .seal {
    width: ${p.tam * 0.18}px;
    height: ${p.tam * 0.18}px;
    background: ${COLORES.burdeos};
    border-radius: ${p.tam * 0.04}px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${p.tam * 0.035}px;
  }
  .seal-j {
    font-family: 'Fraunces', serif;
    font-style: italic;
    color: ${COLORES.papel};
    font-size: ${p.tam * 0.12}px;
    transform: translate(-1px, -4px);
  }
  </style></head><body>
  <div class="seal"><span class="seal-j">J</span></div>
  <div class="title">Juipa <span class="amp">&amp;</span> Asociados</div>
  <div class="sub">ABOGADOS Y CONSULTORES</div>
  </body></html>`;

  const { png } = captura(htmlTileLogo, `tile-${p.nombre}`, p.tam, p.tam, 1);
  await sharp(png)
    .resize(p.tam, p.tam)
    .png({ compressionLevel: 9 })
    .toFile(path.join(salida, '02-perfil', `${p.nombre}-logotipo.png`));
}

// ============================================================================
// 4. PORTADAS EN MEDIDAS EXACTAS (03-portadas)
// ============================================================================
console.log('🖼️  4/7 Generando portadas de redes sociales (oscuras y claras)...');

const plantillasPortada = [
  { id: 'facebook-1640x624', w: 1640, h: 624 },
  { id: 'linkedin-empresa-1128x191', w: 1128, h: 191 },
  { id: 'linkedin-personal-1584x396', w: 1584, h: 396 },
  { id: 'x-twitter-1500x500', w: 1500, h: 500 },
  { id: 'youtube-2560x1440', w: 2560, h: 1440 },
];

const renderHtmlPortada = (w, h, oscura = true) => {
  const bg = oscura ? COLORES.burdeosDark : COLORES.papel;
  const cTexto = oscura ? '#FFFFFF' : COLORES.tinta;
  const cAmp = oscura ? COLORES.dorado : COLORES.burdeos;
  const cSub = oscura ? 'rgba(255,255,255,0.72)' : COLORES.gris;
  const cLine = oscura ? 'rgba(255,255,255,0.22)' : COLORES.linea;
  const cClaim = oscura ? COLORES.papel : COLORES.burdeos;
  const cTagline = oscura ? 'rgba(255,255,255,0.85)' : COLORES.tinta2;
  const escala = Math.min(w / 1200, 1.8);

  return `<!doctype html><html><head><meta charset="utf-8"><style>
  ${cssFuentes}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: ${w}px;
    height: ${h}px;
    background: ${bg};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${Math.max(28, h * 0.12)}px ${Math.max(40, w * 0.08)}px;
    position: relative;
    overflow: hidden;
  }
  .accent-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${Math.max(4, h * 0.015)}px;
    background: ${COLORES.burdeos};
  }
  .header {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .brand {
    font-family: 'Fraunces', serif;
    font-size: ${Math.max(22, 38 * escala)}px;
    font-weight: 400;
    color: ${cTexto};
  }
  .brand em {
    font-style: italic;
    color: ${cAmp};
  }
  .tag {
    font-family: 'Inter', sans-serif;
    font-size: ${Math.max(10, 12 * escala)}px;
    font-weight: 600;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: ${cSub};
    border-left: 2px solid ${cLine};
    padding-left: 18px;
  }
  .claim-wrap {
    max-width: ${w * 0.75}px;
  }
  .claim {
    font-family: 'Fraunces', serif;
    font-size: ${Math.max(24, 46 * escala)}px;
    font-weight: 300;
    line-height: 1.15;
    color: ${cTexto};
  }
  .claim b {
    font-weight: 400;
    font-style: italic;
    color: ${cClaim};
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid ${cLine};
    padding-top: ${Math.max(12, h * 0.04)}px;
    font-family: 'Inter', sans-serif;
    font-size: ${Math.max(11, 14 * escala)}px;
    color: ${cTagline};
  }
  .badge {
    color: ${cAmp};
    font-weight: 600;
  }
  </style></head><body>
  <div class="accent-bar"></div>
  <div class="header">
    <div class="brand">Juipa <em>&amp;</em> Asociados</div>
    <div class="tag">Abogados y Consultores</div>
  </div>
  <div class="claim-wrap">
    <div class="claim">Defendemos tu <b>libertad</b>, tus derechos y tus intereses.</div>
  </div>
  <div class="footer">
    <div>Penal · Policial · Constitucional · Disciplinario · Civil · Laboral</div>
    <div>Huánuco, Perú &nbsp;·&nbsp; <span class="badge">WhatsApp +51 925 544 692</span></div>
  </div>
  </body></html>`;
};

for (const p of plantillasPortada) {
  // Versión Oscura
  const htmlOscura = renderHtmlPortada(p.w, p.h, true);
  const capOscura = captura(htmlOscura, `${p.id}-oscura`, p.w, p.h, 1);
  await sharp(capOscura.png).resize(p.w, p.h).png({ compressionLevel: 9 })
    .toFile(path.join(salida, '03-portadas', `${p.id}-oscura.png`));

  // Versión Clara
  const htmlClara = renderHtmlPortada(p.w, p.h, false);
  const capClara = captura(htmlClara, `${p.id}-clara`, p.w, p.h, 1);
  await sharp(capClara.png).resize(p.w, p.h).png({ compressionLevel: 9 })
    .toFile(path.join(salida, '03-portadas', `${p.id}-clara.png`));

  // También guardar copias SVG para diseñadores
  const svgOscura = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${p.w} ${p.h}" width="${p.w}" height="${p.h}">
  <defs><style>${cssFuentes}</style></defs>
  <rect width="100%" height="100%" fill="${COLORES.burdeosDark}"/>
  <rect width="100%" height="6" fill="${COLORES.burdeos}"/>
  <text x="60" y="${p.h * 0.28}" font-family="Fraunces, serif" font-size="42" fill="#FFFFFF">Juipa <tspan fill="${COLORES.dorado}" font-style="italic">&amp;</tspan> Asociados</text>
  <text x="60" y="${p.h * 0.55}" font-family="Fraunces, serif" font-size="46" font-weight="300" fill="#FFFFFF">Defendemos tu <tspan font-style="italic" fill="${COLORES.dorado}">libertad</tspan>, tus derechos y tus intereses.</text>
  <line x1="60" y1="${p.h * 0.82}" x2="${p.w - 60}" y2="${p.h * 0.82}" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  <text x="60" y="${p.h * 0.91}" font-family="Inter, sans-serif" font-size="16" fill="rgba(255,255,255,0.8)">Penal · Policial · Constitucional · Disciplinario · Civil · Laboral</text>
  <text x="${p.w - 60}" y="${p.h * 0.91}" font-family="Inter, sans-serif" font-size="16" fill="${COLORES.dorado}" font-weight="600" text-anchor="end">Huánuco, Perú · WhatsApp +51 925 544 692</text>
</svg>`;
  fs.writeFileSync(path.join(salida, '03-portadas', `${p.id}-oscura.svg`), svgOscura, 'utf8');

  const svgClara = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${p.w} ${p.h}" width="${p.w}" height="${p.h}">
  <defs><style>${cssFuentes}</style></defs>
  <rect width="100%" height="100%" fill="${COLORES.papel}"/>
  <rect width="100%" height="6" fill="${COLORES.burdeos}"/>
  <text x="60" y="${p.h * 0.28}" font-family="Fraunces, serif" font-size="42" fill="${COLORES.tinta}">Juipa <tspan fill="${COLORES.burdeos}" font-style="italic">&amp;</tspan> Asociados</text>
  <text x="60" y="${p.h * 0.55}" font-family="Fraunces, serif" font-size="46" font-weight="300" fill="${COLORES.tinta}">Defendemos tu <tspan font-style="italic" fill="${COLORES.burdeos}">libertad</tspan>, tus derechos y tus intereses.</text>
  <line x1="60" y1="${p.h * 0.82}" x2="${p.w - 60}" y2="${p.h * 0.82}" stroke="${COLORES.linea}" stroke-width="1"/>
  <text x="60" y="${p.h * 0.91}" font-family="Inter, sans-serif" font-size="16" fill="${COLORES.tinta2}">Penal · Policial · Constitucional · Disciplinario · Civil · Laboral</text>
  <text x="${p.w - 60}" y="${p.h * 0.91}" font-family="Inter, sans-serif" font-size="16" fill="${COLORES.burdeos}" font-weight="600" text-anchor="end">Huánuco, Perú · WhatsApp +51 925 544 692</text>
</svg>`;
  fs.writeFileSync(path.join(salida, '03-portadas', `${p.id}-clara.svg`), svgClara, 'utf8');
}

// ============================================================================
// 5. PLANTILLAS DE PUBLICACIONES SOCIALES (04-publicaciones)
// ============================================================================
console.log('📣 5/7 Generando plantillas para posts, historias y tarjeta OG...');

// Post cuadrado 1080x1080
const htmlPost = `<!doctype html><html><head><meta charset="utf-8"><style>
${cssFuentes}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  width: 1080px;
  height: 1080px;
  background: ${COLORES.papel};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 80px;
  position: relative;
  overflow: hidden;
}
.border-frame {
  position: absolute;
  inset: 24px;
  border: 1px solid ${COLORES.linea};
  pointer-events: none;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand-title {
  font-family: 'Fraunces', serif;
  font-size: 38px;
  font-weight: 400;
  color: ${COLORES.tinta};
}
.brand-title em {
  font-style: italic;
  color: ${COLORES.burdeos};
}
.brand-tag {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${COLORES.gris};
  margin-top: 4px;
}
.seal {
  width: 58px;
  height: 58px;
  background: ${COLORES.burdeos};
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.seal-j {
  font-family: 'Fraunces', serif;
  font-style: italic;
  color: ${COLORES.papel};
  font-size: 38px;
  transform: translate(-1px, -4px);
}
.content {
  margin: 60px 0;
}
.eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${COLORES.burdeos};
  margin-bottom: 24px;
}
.headline {
  font-family: 'Fraunces', serif;
  font-size: 68px;
  font-weight: 300;
  line-height: 1.1;
  color: ${COLORES.tinta};
  max-width: 14ch;
}
.headline em {
  font-style: italic;
  font-weight: 400;
  color: ${COLORES.burdeos};
}
.description {
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  line-height: 1.55;
  color: ${COLORES.tinta2};
  margin-top: 32px;
  max-width: 28ch;
}
.footer {
  border-top: 2px solid ${COLORES.linea};
  padding-top: 36px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.areas-list {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: ${COLORES.tinta2};
}
.contact-cta {
  text-align: right;
  font-family: 'Inter', sans-serif;
}
.contact-city {
  font-size: 14px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${COLORES.gris};
}
.contact-phone {
  font-size: 22px;
  font-weight: 700;
  color: ${COLORES.burdeos};
  margin-top: 6px;
}
</style></head><body>
<div class="border-frame"></div>
<div class="header">
  <div>
    <div class="brand-title">Juipa <em>&amp;</em> Asociados</div>
    <div class="brand-tag">Abogados y Consultores</div>
  </div>
  <div class="seal"><span class="seal-j">J</span></div>
</div>
<div class="content">
  <div class="eyebrow">Defensa Legal Especializada</div>
  <div class="headline">Defendemos tu <em>libertad</em>, tus derechos y tus intereses.</div>
  <div class="description">Atención presencial en Huánuco y representación en audiencias judiciales y diligencias en todo el Perú.</div>
</div>
<div class="footer">
  <div class="areas-list">
    <div>• Derecho Penal y Procesal Penal</div>
    <div>• Derecho Policial y Régimen Disciplinario</div>
    <div>• Constitucional, Civil y Laboral</div>
  </div>
  <div class="contact-cta">
    <div class="contact-city">Huánuco, Perú</div>
    <div class="contact-phone">WhatsApp +51 925 544 692</div>
  </div>
</div>
</body></html>`;

const capPost = captura(htmlPost, 'post-1080x1080', 1080, 1080, 1);
await sharp(capPost.png).resize(1080, 1080).png({ compressionLevel: 9 })
  .toFile(path.join(salida, '04-publicaciones', 'post-1080x1080.png'));

// Historia vertical 1080x1920 (WhatsApp Status / Instagram Story)
const htmlStory = `<!doctype html><html><head><meta charset="utf-8"><style>
${cssFuentes}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  width: 1080px;
  height: 1920px;
  background: ${COLORES.burdeosDark};
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 120px 90px;
  position: relative;
  overflow: hidden;
}
.accent-border {
  position: absolute;
  inset: 32px;
  border: 1px solid rgba(255,255,255,0.18);
  pointer-events: none;
}
.top-brand {
  text-align: center;
}
.seal {
  width: 90px;
  height: 90px;
  background: ${COLORES.burdeos};
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}
.seal-j {
  font-family: 'Fraunces', serif;
  font-style: italic;
  color: ${COLORES.papel};
  font-size: 58px;
  transform: translate(-2px, -6px);
}
.brand-name {
  font-family: 'Fraunces', serif;
  font-size: 48px;
  font-weight: 400;
}
.brand-name em {
  font-style: italic;
  color: ${COLORES.dorado};
}
.brand-tag {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  margin-top: 10px;
}
.main-content {
  margin: auto 0;
}
.eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${COLORES.dorado};
  margin-bottom: 30px;
}
.title {
  font-family: 'Fraunces', serif;
  font-size: 86px;
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 40px;
}
.title em {
  font-style: italic;
  font-weight: 400;
  color: ${COLORES.dorado};
}
.sub {
  font-family: 'Inter', sans-serif;
  font-size: 30px;
  line-height: 1.5;
  color: rgba(255,255,255,0.88);
  max-width: 24ch;
}
.cards {
  display: grid;
  gap: 20px;
  margin-top: 50px;
}
.card-item {
  background: rgba(255,255,255,0.06);
  border-left: 4px solid ${COLORES.dorado};
  padding: 24px 30px;
  font-family: 'Inter', sans-serif;
  font-size: 26px;
}
.bottom-cta {
  background: ${COLORES.papel};
  color: ${COLORES.tinta};
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  font-family: 'Inter', sans-serif;
}
.cta-title {
  font-size: 16px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${COLORES.gris};
}
.cta-phone {
  font-size: 38px;
  font-weight: 800;
  color: ${COLORES.burdeos};
  margin-top: 8px;
}
.cta-note {
  font-size: 18px;
  color: ${COLORES.tinta2};
  margin-top: 8px;
}
</style></head><body>
<div class="accent-border"></div>
<div class="top-brand">
  <div class="seal"><span class="seal-j">J</span></div>
  <div class="brand-name">Juipa <em>&amp;</em> Asociados</div>
  <div class="brand-tag">Abogados y Consultores</div>
</div>
<div class="main-content">
  <div class="eyebrow">Defensa Legal · Huánuco, Perú</div>
  <div class="title">Defendemos tu <em>libertad</em>, tus derechos y tus intereses.</div>
  <div class="sub">Asesoría directa y litigación en audiencia.</div>
  <div class="cards">
    <div class="card-item">⚖️ Derecho Penal y Urgencias Policiales</div>
    <div class="card-item">🛡️ Ley N.° 30714 (Sancionador PNP y Fuero Militar)</div>
    <div class="card-item">📜 Garantías Constitucionales, Civil y Laboral</div>
  </div>
</div>
<div class="bottom-cta">
  <div class="cta-title">Consultas y Urgencias Legales</div>
  <div class="cta-phone">+51 925 544 692</div>
  <div class="cta-note">Atención presencial en Huánuco y virtual a nivel nacional</div>
</div>
</body></html>`;

const capStory = captura(htmlStory, 'historia-1080x1920', 1080, 1920, 1);
await sharp(capStory.png).resize(1080, 1920).png({ compressionLevel: 9 })
  .toFile(path.join(salida, '04-publicaciones', 'historia-1080x1920.png'));

// Imagen para compartir enlaces (Open Graph) 1200x630
const htmlOg = `<!doctype html><html><head><meta charset="utf-8"><style>
${cssFuentes}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  width: 1200px;
  height: 630px;
  background: ${COLORES.papel};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 72px;
  position: relative;
  overflow: hidden;
}
.accent-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: ${COLORES.burdeos};
}
.header {
  display: flex;
  align-items: center;
  gap: 20px;
}
.brand {
  font-family: 'Fraunces', serif;
  font-size: 42px;
  font-weight: 400;
  color: ${COLORES.tinta};
}
.brand em {
  font-style: italic;
  color: ${COLORES.burdeos};
}
.tag {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${COLORES.gris};
  border-left: 2px solid ${COLORES.linea};
  padding-left: 18px;
}
.main {
  max-width: 900px;
}
.headline {
  font-family: 'Fraunces', serif;
  font-size: 58px;
  font-weight: 300;
  line-height: 1.1;
  color: ${COLORES.tinta};
}
.headline em {
  font-style: italic;
  font-weight: 400;
  color: ${COLORES.burdeos};
}
.footer {
  border-top: 1px solid ${COLORES.linea};
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  color: ${COLORES.tinta2};
}
.badge {
  font-weight: 700;
  color: ${COLORES.burdeos};
}
</style></head><body>
<div class="accent-line"></div>
<div class="header">
  <div class="brand">Juipa <em>&amp;</em> Asociados</div>
  <div class="tag">Abogados y Consultores</div>
</div>
<div class="main">
  <div class="headline">Defendemos tu <em>libertad</em>, tus derechos y tus intereses.</div>
</div>
<div class="footer">
  <div>Penal · Policial · Constitucional · Sancionador · Civil · Laboral</div>
  <div>Huánuco, Perú &nbsp;·&nbsp; <span class="badge">WhatsApp +51 925 544 692</span></div>
</div>
</body></html>`;

const capOg = captura(htmlOg, 'og-1200x630', 1200, 630, 2);
const ogDestino = path.join(salida, '04-publicaciones', 'imagen-para-compartir-enlaces-1200x630.png');
await sharp(capOg.png).resize(1200, 630).png({ compressionLevel: 9 })
  .toFile(ogDestino);

// Copiar también al public/ de la web para el sitio en vivo
fs.copyFileSync(ogDestino, path.join(raiz, 'public', 'og-image.png'));
console.log('   ✓ og-image.png sincronizado en public/ de la web');

// ============================================================================
// 6. FIRMA DE CORREO ELECTRÓNICO (06-firma-de-correo)
// ============================================================================
console.log('✉️  6/7 Generando firma HTML para correo (Gmail, Outlook, webmail)...');

const htmlFirma = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Firma de correo · Juipa &amp; Asociados</title>
<style>
body {
  margin: 0;
  padding: 36px;
  background: #F5F1EA;
  font-family: 'Segoe UI', Arial, sans-serif;
}
.instrucciones {
  max-width: 640px;
  margin: 0 0 28px;
  background: #FFFFFF;
  border: 1px solid #D9D0C2;
  border-left: 4px solid #7D1D2C;
  padding: 18px 22px;
  font-size: 13.5px;
  line-height: 1.6;
  color: #4A453E;
  border-radius: 4px;
}
.instrucciones strong { color: #1B1916; }
.firma-contenedor {
  background: #FFFFFF;
  display: inline-block;
  padding: 30px 36px;
  border: 1px solid #D9D0C2;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
}
</style>
</head>
<body>

<div class="instrucciones">
  <strong>Cómo instalar esta firma en Gmail o webmail:</strong>
  <ol style="margin: 8px 0 0 18px; padding: 0;">
    <li>Selecciona la firma que aparece abajo (desde el logotipo hasta el aviso de confidencialidad).</li>
    <li>Cópiala con <code>Ctrl + C</code> (o <code>Cmd + C</code> en Mac).</li>
    <li>En Gmail, haz clic en el engranaje ⚙️ → <em>Ver todos los ajustes</em> → pestaña <em>General</em> → sección <strong>Firma</strong>.</li>
    <li>Crea una nueva firma, pega con <code>Ctrl + V</code> y guarda los cambios al final de la página.</li>
    <li>Reemplaza el texto <em>[Nombre y Apellidos]</em> y <em>[Cargo / Especialidad]</em> por tus datos reales.</li>
  </ol>
</div>

<!-- ===== FIRMA OFICIAL: COPIAR DESDE AQUÍ ===== -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;color:#1B1916;border-collapse:collapse;max-width:580px">
  <tr>
    <td style="padding:0 0 14px 0">
      <a href="https://juipa-abogados-consultores.vercel.app/" target="_blank" style="text-decoration:none;color:#1B1916">
        <span style="font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#1B1916;letter-spacing:-0.02em">
          Juipa <span style="font-style:italic;color:#7D1D2C">&amp;</span> Asociados
        </span>
        <br>
        <span style="font-family:'Segoe UI',Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.32em;text-transform:uppercase;color:#7D766B">
          Abogados y Consultores · Huánuco
        </span>
      </a>
    </td>
  </tr>
  <tr>
    <td style="padding:0 0 2px 0;font-size:15px;font-weight:bold;color:#1B1916">
      [Nombre y Apellidos del Abogado]
    </td>
  </tr>
  <tr>
    <td style="padding:0 0 10px 0;font-size:12.5px;color:#7D1D2C;font-weight:600">
      Abogado · Juipa &amp; Asociados · Reg. C.A.H.
    </td>
  </tr>
  <tr>
    <td style="padding:0 0 12px 0;font-size:13px;color:#4A453E;line-height:1.6">
      📱 <strong>WhatsApp:</strong> <a href="https://wa.me/51925544692" style="color:#7D1D2C;text-decoration:none;font-weight:bold">+51 925 544 692</a><br>
      📍 <strong>Sede:</strong> Huánuco, Perú (Atención presencial previa cita y virtual a nivel nacional)<br>
      🌐 <strong>Web:</strong> <a href="https://juipa-abogados-consultores.vercel.app/" style="color:#1B1916;text-decoration:underline">juipa-abogados-consultores.vercel.app</a>
    </td>
  </tr>
  <tr>
    <td style="padding:10px 0 0 0;border-top:3px solid #7D1D2C;font-size:11.5px;font-weight:600;color:#1B1916;letter-spacing:0.02em">
      Defendemos tu libertad, tus derechos y tus intereses.
    </td>
  </tr>
  <tr>
    <td style="padding:4px 0 0 0;font-size:11px;color:#7D766B">
      Penal · Policial (Ley N.° 30714) · Constitucional · Sancionador · Civil · Laboral · Litigación Oral
    </td>
  </tr>
  <tr>
    <td style="padding:12px 0 0 0;font-size:10.5px;line-height:1.45;color:#7D766B">
      <em>Aviso de confidencialidad:</em> Este mensaje y sus archivos adjuntos son para uso exclusivo de su destinatario y pueden contener información confidencial o sujeta a secreto profesional. Si usted no es el destinatario indicado, le rogamos notificar al remitente de inmediato y eliminar este correo sin copiarlo ni divulgarlo.
    </td>
  </tr>
</table>
<!-- ===== FIRMA OFICIAL: COPIAR HASTA AQUÍ ===== -->

</body>
</html>`;

fs.writeFileSync(path.join(salida, '06-firma-de-correo', 'firma-gmail.html'), htmlFirma, 'utf8');

// ============================================================================
// 7. GUÍA DE MARCA OFICIAL EN MARKDOWN Y PDF (00-guia)
// ============================================================================
console.log('📖 7/7 Generando Guía de Marca (.md y .pdf)...');

const guiaMarkdown = `# Juipa & Asociados · Guía de Marca Oficial

Versión oficial de octubre de 2026. Esta guía y todos los recursos de este kit nacen de la misma arquitectura gráfica, los mismos colores y la misma tipografía utilizada en el sitio web oficial del estudio.

---

## 1. Qué hay en el kit

| Carpeta | Contenido | Para qué sirve |
|---|---|---|
| \`01-logotipo\` | Logotipos en tinta, blanco, negro, burdeos (PNG alta resolución de 2400 px con fondo transparente, SVG vectorial y PDF) y el monograma «J» en todas sus variantes | Documentos judiciales, minutas, cartas notariales, carátulas de expedientes, imprenta, bordados y proveedores gráficos |
| \`02-perfil\` | Fotos de perfil cuadradas en medidas exactas por plataforma en dos versiones: monograma y logotipo completo | WhatsApp Business, Facebook, Instagram, LinkedIn y cuenta de Google/Gmail |
| \`03-portadas\` | Banners en las medidas oficiales de Facebook, LinkedIn (página de estudio y perfil personal), X (Twitter) y YouTube, en versión oscura y clara | Cabeceras de perfiles y páginas en redes sociales |
| \`04-publicaciones\` | Plantilla de publicación cuadrada (1080×1080), plantilla de historia vertical (1080×1920) y la tarjeta para compartir enlaces web (1200×630) | Difusión de pronunciamientos, artículos y estados de WhatsApp |
| \`05-fuentes\` | Las tipografías oficiales en formato instalable (.TTF) con licencia SIL Open Font (uso libre y comercial) | Microsoft Word, PowerPoint, Canva, Adobe Illustrator |
| \`06-firma-de-correo\` | Firma HTML profesional para Gmail, Outlook y correo corporativo con aviso de confidencialidad legal | Correos electrónicos formales con clientes y autoridades |

---

## 2. El Logotipo y el Monograma

### El Logotipo Horizontal
El logotipo institucional está compuesto por tres elementos esenciales:
1. **La denominación:** «Juipa & Asociados» compuesta en **Fraunces** (peso regular 400), con el signo de unión **«&» en cursiva burdeos**, que aporta calidez, nobleza y distinción humana.
2. **El filete vertical:** Una línea divisoria proporcional que equilibra la lectura y separa el apellido fundacional de la función del despacho.
3. **La bajada institucional:** «ABOGADOS Y CONSULTORES» en **Inter**, versalitas espaciadas con amplio tracking (\`0.32em\`), que otorgan sobriedad técnica y formalidad.

### Versiones del Logotipo
* \`logotipo-tinta\`: La versión **principal**. Diseñada para usarse sobre papel blanco, papel pergamino (\`#F5F1EA\`) o membretes formales.
* \`logotipo-blanco\`: Para usarse sobre fondos oscuros, fotografías uniformes o sobre el color burdeos institucional.
* \`logotipo-negro\`: Para sellos de jebe, trámites judiciales de una sola tinta, fojas de expedientes y fotocopias.
* \`logotipo-burdeos\`: Variante monocromática en el burdeos oficial (\`#7D1D2C\`).

### El Monograma «J»
El monograma es la letra «J» en cursiva editorial enmarcada en una loseta con esquinas suavemente redondeadas. 
* **Por qué existe:** En teléfonos celulares las fotos de perfil se reducen a 40 píxeles y se recortan en círculo. El logotipo largo resulta ilegible a ese tamaño; el monograma «J», en cambio, mantiene una legibilidad inmediata, memorable y prestigiosa.
* **Dónde se usa:** Foto de perfil de WhatsApp Business, Instagram, LinkedIn, ícono de pestaña web (favicon).

### Reglas de Uso
1. **Proporción obligatoria:** Nunca estirar ni comprimir el logotipo. En Word, PowerPoint o Canva arrastrar siempre desde las esquinas manteniendo pulsada la tecla Shift si fuera necesario.
2. **Área de respeto:** Mantener un margen libre a su alrededor equivalente como mínimo a la altura de la letra «J».
3. **Sin efectos decorativos:** Queda estrictamente prohibido aplicar sombras paralelas borrosas, degradados de color arcoíris, biseles 3D o trazos gruesos de contorno.

---

## 3. Paleta de Colores

| Color | HEX | RGB | CMYK aproximado | Función dentro de la marca |
|---|---|---|---|---|
| **Tinta Principal** | \`#1B1916\` | 27, 25, 22 | 68, 65, 68, 80 | Textos principales, logotipo principal, lectura |
| **Burdeos Institucional** | \`#7D1D2C\` | 125, 29, 44 | 25, 95, 75, 40 | Acento de prestigio, ampersand (&), botones principales |
| **Burdeos Urgencias** | \`#5E1621\` | 94, 22, 33 | 35, 95, 75, 55 | Franja de urgencias penales, portadas oscuras |
| **Papel Pergamino** | \`#F5F1EA\` | 245, 241, 234 | 3, 3, 6, 0 | Fondo editorial principal (modo día), calidez humana |
| **Papel Secundario** | \`#ECE6DC\` | 236, 230, 220 | 5, 5, 10, 0 | Fondos de tarjetas, barra superior |
| **Gris Cálido** | \`#7D766B\` | 125, 118, 107 | 45, 42, 50, 15 | Bajadas, etiquetas secundarias, metadatos |
| **Línea Divisoria** | \`#D9D0C2\` | 217, 208, 194 | 12, 12, 18, 0 | Filetes sutiles, bordes de separación |
| **Latón Dorado** | \`#D2A777\` | 210, 167, 119 | 15, 30, 60, 5 | Acento cálido en modo noche y detalles dorados |
| **Blanco Puro** | \`#FFFFFF\` | 255, 255, 255 | 0, 0, 0, 0 | Fondo de documentos impresos y versiones en negativo |

---

## 4. Tipografías

| Familia | Peso | Aplicación | Características |
|---|---|---|---|
| **Fraunces** | 300 (Light), 400 (Regular), Italic | Logotipo, monograma «J», titulares principales | Serif editorial de inspiración clásica con acabado contemporáneo. Comunica distinción, rigor jurídico y nobleza. |
| **Inter** | 400 (Regular), 600 (SemiBold), 700 (Bold) | Subtítulo «Abogados y Consultores», textos de lectura, datos de contacto | Tipografía de alta precisión geométrica diseñada para legibilidad perfecta en pantallas y documentos legales. |

---

## 5. Medidas Oficiales por Red Social

| Plataforma | Elemento | Medida exacta | Archivo recomendado |
|---|---|---|---|
| **WhatsApp Business** | Foto de perfil | 640 × 640 px (circular) | \`02-perfil/whatsapp-business-640-monograma.png\` |
| **LinkedIn Empresa** | Foto de perfil | 400 × 400 px | \`02-perfil/linkedin-empresa-400-monograma.png\` |
| **LinkedIn Empresa** | Banner de cabecera | 1128 × 191 px | \`03-portadas/linkedin-empresa-1128x191-oscura.png\` |
| **LinkedIn Personal** | Portada personal | 1584 × 396 px | \`03-portadas/linkedin-personal-1584x396-oscura.png\` |
| **Facebook** | Foto de perfil | 1080 × 1080 px | \`02-perfil/facebook-instagram-1080-monograma.png\` |
| **Facebook** | Portada de página | 1640 × 624 px | \`03-portadas/facebook-1640x624-oscura.png\` |
| **Instagram** | Foto de perfil | 1080 × 1080 px | \`02-perfil/facebook-instagram-1080-monograma.png\` |
| **Google / Gmail** | Foto de cuenta | 500 × 500 px | \`02-perfil/gmail-google-500-monograma.png\` |
| **X (Twitter)** | Cabecera | 1500 × 500 px | \`03-portadas/x-twitter-1500x500-oscura.png\` |
| **YouTube** | Banner de canal | 2560 × 1440 px | \`03-portadas/youtube-2560x1440-oscura.png\` |

---

## 6. Textos Listos para Pegar en Perfiles

### Descripción Corta (Eslogan de LinkedIn y Bio de Instagram / Facebook - 120 caracteres)
> Defendemos tu libertad, tus derechos y tus intereses. Estudio jurídico en Huánuco, Perú. WhatsApp: +51 925 544 692.

### Descripción de WhatsApp Business (hasta 256 caracteres)
> Juipa & Asociados · Abogados y Consultores. Defensa especializada en Derecho Penal, Policial (Ley 30714), Disciplinario, Constitucional, Civil y Laboral. Sede en Huánuco y atención a nivel nacional. Escríbanos para evaluar su caso.

### Mensaje de Bienvenida en WhatsApp Business
> Estimado/a, gracias por comunicarse con Juipa & Asociados · Abogados y Consultores. Por favor indíquenos su nombre y un breve resumen de su consulta o urgencia legal. Un abogado de nuestro equipo revisará su caso para responderle a la brevedad.

### Mensaje de Ausencia en WhatsApp Business
> Gracias por comunicarse con Juipa & Asociados. Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00. Si su caso corresponde a una detención policial o urgencia penal de flagrancia, por favor indíquelo para activar nuestra línea de guardia.

### Acerca de (LinkedIn / Facebook - Información institucional completa)
> Juipa & Asociados · Abogados y Consultores es un despacho fundado por la familia Juipa con sede en Huánuco y ejercicio en todo el territorio peruano.
>
> Nuestro compromiso es el patrocinio legal directo, riguroso y humano: el abogado que estudia el expediente y prepara la estrategia es el mismo profesional que asiste a las diligencias y litiga en audiencia frente a jueces y fiscales.
>
> Áreas de Práctica:
> • Derecho Penal y Procesal Penal (asistencia en detenciones, flagrancia, prisiones preventivas, juicios orales y recursos de casación).
> • Derecho Policial (procedimientos disciplinarios bajo la Ley N.° 30714, Inspectoría, Fuero Militar Policial y reincorporaciones).
> • Derecho Constitucional (Hábeas Corpus en detenciones arbitrarias y Demandas de Amparo).
> • Derecho Sancionador y Disciplinario (PAD en el régimen de la Ley SERVIR).
> • Derecho Civil y Procesal Civil (desalojos, sucesiones, posesión, prescripciones y contratos).
> • Derecho Laboral (despidos arbitrarios, reposiciones y cobro de beneficios sociales).
> • Litigación Oral (técnicas de interrogatorio, contraexamen y alegatos de clausura).
>
> Sede: Huánuco, Perú.
> WhatsApp: +51 925 544 692

### Especialidades para LinkedIn (Etiquetas sugeridas)
> Derecho Penal, Derecho Policial, Ley 30714, Fuero Militar Policial, Litigación Oral, Hábeas Corpus, Derecho Constitucional, Procedimiento Administrativo Disciplinario, Derecho Laboral, Derecho Civil, Defensa Legal, Asesoría Jurídica, Huánuco, Perú.

---

## 7. Tono de Voz y Filosofía

* **Voz sobria y dignified:** No usamos sensacionalismo ni promesas vacías de "éxito 100% garantizado". Explicamos con claridad la norma procesal y el estado real del caso.
* **Cercanía sin informalidad:** Se trata al cliente con respeto, empatía y dignidad. Frente a la adversidad penal o laboral, el despacho es un bastión de seguridad y defensa de sus derechos fundamentales.
* **Titular insignia:**
  > **«Defendemos tu libertad, tus derechos y tus intereses.»**

---

## 8. Lo que NUNCA se debe hacer

1. **No usar clichés de internet:** Queda terminantemente prohibido usar imágenes de martillos de madera de juez estadounidense, balanzas de la justicia doradas o fotos genéricas de apretones de manos en oficinas vidriadas.
2. **No alterar el nombre:** El apellido fundacional del estudio se escribe siempre con **J** (**Juipa & Asociados**), nunca con otra consonante.
3. **No deformar las proporciones tipográficas:** Jamás distorsionar el logotipo vertical u horizontalmente.
4. **No omitir el ampersand institucional:** El ampersand (\`&\`) es parte del alma visual del estudio y siempre se destaca en cursiva y con el tono burdeos institucional.
`;

fs.writeFileSync(path.join(salida, '00-guia', 'GUIA-DE-MARCA.md'), guiaMarkdown, 'utf8');

// Generar PDF estilizado de la Guía de Marca
const htmlGuiaPdf = `<!doctype html><html><head><meta charset="utf-8"><style>
${cssFuentes}
@page {
  size: A4;
  margin: 22mm 20mm;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Inter', sans-serif;
  color: ${COLORES.tinta};
  background: #FFFFFF;
  line-height: 1.6;
  font-size: 11pt;
}
.header-pdf {
  border-bottom: 2px solid ${COLORES.burdeos};
  padding-bottom: 18px;
  margin-bottom: 28px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.title-pdf {
  font-family: 'Fraunces', serif;
  font-size: 26pt;
  font-weight: 400;
  color: ${COLORES.tinta};
}
.title-pdf em {
  font-style: italic;
  color: ${COLORES.burdeos};
}
.subtitle-pdf {
  font-size: 8.5pt;
  font-weight: 600;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${COLORES.gris};
}
.tag-badge {
  font-size: 9pt;
  background: ${COLORES.papel};
  border: 1px solid ${COLORES.linea};
  padding: 6px 14px;
  border-radius: 4px;
  font-weight: 600;
  color: ${COLORES.burdeos};
}
h2 {
  font-family: 'Fraunces', serif;
  font-size: 16pt;
  color: ${COLORES.burdeos};
  margin: 24pt 0 10pt;
  border-bottom: 1px solid ${COLORES.linea};
  padding-bottom: 4pt;
  page-break-after: avoid;
}
h3 {
  font-size: 12pt;
  font-weight: 600;
  color: ${COLORES.tinta};
  margin: 14pt 0 6pt;
  page-break-after: avoid;
}
p, li {
  margin-bottom: 8pt;
  color: ${COLORES.tinta2};
  font-size: 10pt;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 12pt 0 18pt;
  font-size: 9pt;
}
th, td {
  border: 1px solid ${COLORES.linea};
  padding: 7pt 10pt;
  text-align: left;
}
th {
  background: ${COLORES.papel};
  color: ${COLORES.tinta};
  font-weight: 600;
}
blockquote {
  border-left: 3px solid ${COLORES.burdeos};
  padding: 8pt 14pt;
  background: ${COLORES.papel};
  margin: 10pt 0;
  font-style: italic;
  color: ${COLORES.tinta};
}
code {
  font-family: Consolas, monospace;
  background: ${COLORES.papel};
  padding: 1pt 4pt;
  border-radius: 3pt;
  font-size: 8.5pt;
  color: ${COLORES.burdeos};
}
.color-swatch {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  vertical-align: middle;
  margin-right: 6px;
  border: 1px solid rgba(0,0,0,0.1);
}
</style></head><body>
<div class="header-pdf">
  <div>
    <div class="title-pdf">Juipa <em>&amp;</em> Asociados</div>
    <div class="subtitle-pdf">Manual y Guía de Identidad de Marca</div>
  </div>
  <div class="tag-badge">Huánuco, Perú · 2026</div>
</div>

<p>Este manual reúne las especificaciones técnicas de diseño, proporciones, paleta de colores, tipografías y reglas de aplicación gráfica para <strong>Juipa &amp; Asociados · Abogados y Consultores</strong>.</p>

<h2>1. Qué hay en el kit de marca</h2>
<table>
  <tr><th>Carpeta</th><th>Contenido</th><th>Uso recomendado</th></tr>
  <tr><td><code>01-logotipo</code></td><td>Logotipos horizontales (tinta, blanco, negro, burdeos en PNG, SVG y PDF) y monogramas «J»</td><td>Documentos formales, contratos, membretes, expedientes e imprenta.</td></tr>
  <tr><td><code>02-perfil</code></td><td>Fotos de perfil cuadradas por plataforma (monograma y logotipo)</td><td>WhatsApp Business, Facebook, Instagram, LinkedIn, Google.</td></tr>
  <tr><td><code>03-portadas</code></td><td>Banners en medidas oficiales de redes (oscura y clara)</td><td>Cabeceras de perfiles en LinkedIn, Facebook, X y YouTube.</td></tr>
  <tr><td><code>04-publicaciones</code></td><td>Plantillas de post (1080×1080), historia (1080×1920) y tarjeta OG</td><td>Redes sociales, estados de WhatsApp y enlaces compartidos.</td></tr>
  <tr><td><code>05-fuentes</code></td><td>Fuentes instalables (.TTF) Fraunces e Inter con licencia libre</td><td>Instalación en computadoras para Word, PowerPoint y Canva.</td></tr>
  <tr><td><code>06-firma-de-correo</code></td><td>Firma HTML lista para pegar en Gmail y Outlook con aviso legal</td><td>Comunicaciones profesionales por correo electrónico.</td></tr>
</table>

<h2>2. Identidad del Logotipo y Monograma</h2>
<p>El logotipo institucional equilibra la elegancia de la tipografía serif <strong>Fraunces</strong> con la precisión técnica de <strong>Inter</strong>. El signo <em>«&amp;»</em> se destaca en cursiva con el color burdeos noble del estudio.</p>
<p><strong>El Monograma «J»:</strong> Diseñado para fotos de perfil en teléfonos móviles. Dado que WhatsApp e Instagram recortan las imágenes en un círculo muy pequeño, el monograma «J» garantiza distinción y reconocimiento inmediato.</p>

<h2>3. Paleta Oficial de Colores</h2>
<table>
  <tr><th>Color</th><th>Código HEX</th><th>RGB</th><th>Función</th></tr>
  <tr><td><span class="color-swatch" style="background:#1B1916"></span> Tinta Principal</td><td><code>#1B1916</code></td><td>27, 25, 22</td><td>Textos principales y logotipo sobre fondos claros.</td></tr>
  <tr><td><span class="color-swatch" style="background:#7D1D2C"></span> Burdeos Institucional</td><td><code>#7D1D2C</code></td><td>125, 29, 44</td><td>Acento de prestigio, ampersand (&amp;) y botones de acción.</td></tr>
  <tr><td><span class="color-swatch" style="background:#5E1621"></span> Burdeos Urgencias</td><td><code>#5E1621</code></td><td>94, 22, 33</td><td>Franja de urgencias penales y fondos oscuros.</td></tr>
  <tr><td><span class="color-swatch" style="background:#F5F1EA"></span> Papel Pergamino</td><td><code>#F5F1EA</code></td><td>245, 241, 234</td><td>Fondo editorial del sitio web y papelería.</td></tr>
  <tr><td><span class="color-swatch" style="background:#7D766B"></span> Gris Cálido</td><td><code>#7D766B</code></td><td>125, 118, 107</td><td>Subtítulos, etiquetas y metadatos secundarios.</td></tr>
  <tr><td><span class="color-swatch" style="background:#D2A777"></span> Latón Dorado</td><td><code>#D2A777</code></td><td>210, 167, 119</td><td>Acento de contraste nocturno y sellos de calidad.</td></tr>
</table>

<h2>4. Tipografías Corporativas</h2>
<p>• <strong>Fraunces:</strong> Tipografía serif para el logotipo y los titulares de mayor jerarquía. Transmite autoridad académica y cercanía humana.<br>
• <strong>Inter:</strong> Tipografía sans-serif para subtítulos en versalitas, cuerpo de lectura, contratos y datos de contacto.</p>

<h2>5. Tono de Voz y Titular Insignia</h2>
<blockquote>«Defendemos tu libertad, tus derechos y tus intereses.»</blockquote>
<p>La comunicación del estudio es digna, empática, transparente y técnicamente irreprochable. Se explican los derechos del cliente con sencillez y firmeza, evitando el hermetismo jurídico innecesario y desterrando falsas promesas.</p>
</body></html>`;

const tmpGuiaHtml = path.join(tmp, 'guia-pdf.html');
fs.writeFileSync(tmpGuiaHtml, htmlGuiaPdf);
const urlGuia = 'file:///' + tmpGuiaHtml.replace(/\\/g, '/');
imprimirPdf(urlGuia, path.join(salida, '00-guia', 'GUIA-DE-MARCA.pdf'));

// Limpieza de temporales
fs.rmSync(tmp, { recursive: true, force: true });

console.log('\n✨ ¡Kit de Marca completado exitosamente!');
console.log(`📁 Ubicación final: ${salida}\n`);

// Resumen del contenido generado
for (const d of dirs) {
  const p = path.join(salida, d);
  const files = fs.readdirSync(p);
  console.log(`  📂 ${d}/ (${files.length} archivos)`);
  for (const f of files.slice(0, 5)) {
    const st = fs.statSync(path.join(p, f));
    console.log(`     • ${f} (${(st.size / 1024).toFixed(1)} KB)`);
  }
  if (files.length > 5) {
    console.log(`     ... y ${files.length - 5} archivos más.`);
  }
}
