// Bundles src/ into a single self-contained script (fonts are inlined as
// data URIs) so the game runs from index.html with no server required.
import * as esbuild from 'esbuild';

const serve = process.argv.includes('--serve');

const options = {
  entryPoints: ['src/main.js'],
  bundle: true,
  format: 'iife',
  target: ['es2020'],
  outfile: 'dist/undersoul.js',
  minify: !serve,
  sourcemap: serve ? 'inline' : false,
  loader: { '.woff2': 'dataurl' },
  logLevel: 'info',
};

if (serve) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: '.', port: 8080 });
  console.log(`UNDERSOUL dev server: http://localhost:${port}/`);
} else {
  await esbuild.build(options);
}
