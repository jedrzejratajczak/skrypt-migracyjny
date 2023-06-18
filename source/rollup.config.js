import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es'
  },
  plugins: [commonjs(), nodeResolve()]
};

/////////

import { select, confirm, input } from '@inquirer/prompts';
import esbuild from 'esbuild';

console.clear();

const purpose = await select({
  message: 'Wybierz przeznaczenie swojej biblioteki:',
  choices: [
    {
      name: 'Biblioteka serwerowa',
      value: 'server',
      description:
        '\nBiblioteki serwerowe są używane w środowiskach serwerowych, np. Node.js.'
    },
    {
      name: 'Biblioteka przeglądarkowa',
      value: 'browser',
      description:
        '\nBiblioteki przeglądarkowe są używane w środowisku przeglądarki.'
    },
    {
      name: 'Biblioteka uniwersalna',
      value: 'universal',
      description:
        '\nBiblioteki uniwersalne są używane zarówno w środowisku serwerowym, jak i przeglądarki.'
    }
  ]
});

const path = await input({
  message:
    'Wpisz ścieżkę do głównego pliku biblioteki (względem bieżącej ścieżki):',
  validate: (value) => (value.length ? true : 'Wpisz poprawną ścieżkę.')
});

const confirmBuild = await confirm({
  message: 'Przejść do etapu budowania?'
});

if (!confirmBuild) {
  console.log('\nJeżeli zmienisz zdanie, uruchom skrypt ponownie.');
  process.exit(0);
}

const purposeMap = {
  server: 'serwerowej',
  browser: 'przeglądarkowej',
  universal: 'uniwersalnej'
};

console.log(
  `\nTrwa budowanie twojej biblioteki ${purposeMap[purpose]} ze ścieżki ${path}`
);

Promise.all(
  ['esm', 'iife', 'cjs'].map((format) =>
    esbuild.build({
      entryPoints: [path],
      format,
      outfile: `dist/index.${format}.js`
    })
  )
);

console.log('\nBudowanie zakończone!');
