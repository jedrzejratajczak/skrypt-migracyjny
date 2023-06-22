import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['index.js'],
  format: 'cjs',
  outfile: 'index.js'
});

// Promise.all(
//   ['esm', 'iife', 'cjs'].map((format) =>
//     esbuild.build({
//       entryPoints: [path],
//       format,
//       outfile: `dist/index.${format}.js`
//     })
//   )
// );
