#!/usr/bin/env node
/**
 * Tree printer - imprime un árbol de archivos estilo:
 *
 * .
 * ├── apps/
 * │   ├── api/
 * │   │   └── src/
 * │   │       ├── app.module.ts
 * │   │       └── main.ts
 * └── ...
 *
 * Opciones:
 *   node tree.js [directorio] [--max-depth=N] [--include-hidden] [--ignore=a,b,c] [--extract-comments]
 *
 * Notas sobre comentarios (al final de cada línea):
 * - Si existe un archivo "tree.annotations.json" en el directorio raíz, se usarán sus mapeos { "ruta/relativa": "comentario" }.
 * - Con --extract-comments intentará leer el primer comentario del archivo (// ... o /* ... * / en JS/TS; # ... en Py) y lo añadirá.
 */

const fs = require('fs').promises;
const fssync = require('fs');
const path = require('path');

function parseArgs(argv) {
  const opts = {
    root: '.',
    maxDepth: Infinity,
    includeHidden: false,
    ignore: ['.git', 'node_modules'],
    extractComments: false,
  };

  const args = argv.slice(2);
  for (const arg of args) {
    if (arg === '-h' || arg === '--help') {
      printHelpAndExit();
    } else if (arg.startsWith('--max-depth=')) {
      const v = parseInt(arg.split('=')[1], 10);
      if (!Number.isNaN(v) && v >= 0) opts.maxDepth = v;
    } else if (arg === '--include-hidden') {
      opts.includeHidden = true;
    } else if (arg.startsWith('--ignore=')) {
      const list = arg.split('=')[1] || '';
      opts.ignore = list.split(',').map(s => s.trim()).filter(Boolean);
    } else if (arg === '--extract-comments') {
      opts.extractComments = true;
    } else if (arg.startsWith('--')) {
      console.error(`Opción desconocida: ${arg}`);
      printHelpAndExit(1);
    } else {
      opts.root = arg;
    }
  }
  return opts;
}

function printHelpAndExit(code = 0) {
  console.log(`Uso:
  node tree.js [directorio] [--max-depth=N] [--include-hidden] [--ignore=a,b,c] [--extract-comments]

Ejemplos:
  node tree.js .
  node tree.js apps --max-depth=3 --ignore=dist,build --include-hidden
  node tree.js --extract-comments

Comentarios:
  - Puedes crear un archivo "tree.annotations.json" en el directorio raíz con:
      {
        "apps/api/src/app.module.ts": "Módulo raíz de la API",
        "apps/outbox-publisher/src/publisher.service.ts": "Servicio que publica eventos del outbox"
      }
  - Con --extract-comments, se intentará usar el primer comentario del archivo como descripción.
`);
  process.exit(code);
}

function normalizeRel(p) {
  return p.split(path.sep).join('/');
}

function shouldIgnore(name, relPathNormalized, ignoreList, includeHidden) {
  if (!includeHidden && name.startsWith('.')) return true;
  if (ignoreList && ignoreList.length) {
    for (const pat of ignoreList) {
      if (!pat) continue;
      // Ignora si el nombre del ítem coincide o si la ruta relativa contiene el patrón
      if (name === pat || relPathNormalized.includes(pat)) return true;
    }
  }
  return false;
}

async function tryLoadAnnotations(root) {
  const file = path.join(root, 'tree.annotations.json');
  try {
    const txt = await fs.readFile(file, 'utf8');
    const data = JSON.parse(txt);
    if (data && typeof data === 'object') return data;
  } catch (_) {}
  return {};
}

async function extractFirstComment(fullPath) {
  // Solo para ciertos tipos de archivo
  const exts = ['.js', '.ts', '.jsx', '.tsx', '.py'];
  const ext = path.extname(fullPath).toLowerCase();
  if (!exts.includes(ext)) return null;

  try {
    const fh = await fs.open(fullPath, 'r');
    try {
      const buf = await fh.readFile({ encoding: 'utf8' });
      const head = buf.slice(0, 8192); // leemos hasta 8KB
      const lines = head.split(/\r?\n/);

      // Quitar cabeceras vacías
      while (lines.length && lines[0].trim() === '') lines.shift();

      if (!lines.length) return null;

      const first = lines[0];

      // JS/TS: línea simple //
      const m1 = first.match(/^\s*\/\/\s*(.+)$/);
      if (m1) return m1[1].trim();

      // JS/TS: bloque /* ... */
      const m2 = head.match(/^\s*\/\*\s*([\s\S]*?)\s*\*\//);
      if (m2) {
        // Tomamos la primera línea significativa del bloque
        const blk = m2[1].split(/\r?\n/).map(s => s.trim()).filter(Boolean);
        if (blk.length) return blk[0];
      }

      // Python: línea simple #
      const m3 = first.match(/^\s*#\s*(.+)$/);
      if (m3) return m3[1].trim();

      return null;
    } finally {
      await fh.close();
    }
  } catch (_) {
    return null;
  }
}

async function buildTree(root, opts) {
  const annotations = await tryLoadAnnotations(root);
  const lines = [];

  async function walk(currentDir, prefix, depth) {
    if (depth > opts.maxDepth) return;

    let dirents;
    try {
      dirents = await fs.readdir(currentDir, { withFileTypes: true });
    } catch (err) {
      lines.push(`${prefix}└── [inaccesible]: ${path.basename(currentDir)} // ${err.message}`);
      return;
    }

    // Filtrar y ordenar: primero carpetas, luego archivos
    const entries = dirents
      .filter(d => {
        const rel = normalizeRel(path.relative(root, path.join(currentDir, d.name)));
        return !shouldIgnore(d.name, rel, opts.ignore, opts.includeHidden);
      })
      .sort((a, b) => {
        const ad = a.isDirectory();
        const bd = b.isDirectory();
        if (ad !== bd) return ad ? -1 : 1;
        return a.name.localeCompare(b.name, 'es');
      });

    const lastIndex = entries.length - 1;

    for (let i = 0; i < entries.length; i++) {
      const d = entries[i];
      const isLast = i === lastIndex;
      const branch = isLast ? '└── ' : '├── ';
      const nextPrefix = prefix + (isLast ? '    ' : '│   ');

      const fullPath = path.join(currentDir, d.name);
      const rel = normalizeRel(path.relative(root, fullPath));

      let displayName = d.name;
      let suffix = '';

      // Añadir "/" a carpetas
      if (d.isDirectory()) {
        displayName = d.name + '/';
      }

      // Symlinks: mostrar destino
      let isLink = false;
      try {
        const lst = await fs.lstat(fullPath);
        isLink = lst.isSymbolicLink();
        if (isLink) {
          const target = await fs.readlink(fullPath).catch(() => null);
          if (target) suffix += ` -> ${target}`;
        }
      } catch (_) {}

      // Comentarios desde annotations
      const noteFromAnnotations = annotations[rel];

      // Comentarios extraídos del archivo
      let noteFromFile = null;
      if (opts.extractComments && !d.isDirectory() && !isLink) {
        noteFromFile = await extractFirstComment(fullPath);
      }

      const comment = noteFromAnnotations || noteFromFile;
      const commentStr = comment ? ` // ${comment}` : '';

      lines.push(`${prefix}${branch}${displayName}${suffix}${commentStr}`);

      if (d.isDirectory()) {
        await walk(fullPath, nextPrefix, depth + 1);
      }
    }
  }

  // Línea raíz con "."
  lines.push('.');
  await walk(root, '', 1);
  return lines.join('\n');
}

async function main() {
  const opts = parseArgs(process.argv);
  const rootAbs = path.resolve(opts.root);

  if (!fssync.existsSync(rootAbs)) {
    console.error(`No existe el directorio: ${opts.root}`);
    process.exit(1);
  }
  const stat = fssync.statSync(rootAbs);
  if (!stat.isDirectory()) {
    console.error(`La ruta no es un directorio: ${opts.root}`);
    process.exit(1);
  }

  const output = await buildTree(rootAbs, opts);
  console.log(output);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});