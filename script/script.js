import { select, confirm, input } from '@inquirer/prompts';
import esbuild from 'esbuild';

console.clear();
console.log('=== Witaj w skrypcie! ===\n');
console.log('Wyeksportuj bibliotekę do różnych systemów modułów,');
console.log('co pozwoli Ci na wsparcie dla różnych środowisk i zastosowań.');

const purpose = await select({
  message: 'Wybierz przeznaczenie swojej biblioteki:',
  choices: [
    {
      name: 'Biblioteka serwerowa',
      value: 'server',
      description:
        '\nBiblioteki serwerowe są używane w środowiskach serwerowych, np. node.js'
    },
    {
      name: 'Biblioteka przeglądarkowa',
      value: 'browser',
      description:
        '\nBiblioteki przeglądarkowe są używane w środowisku przeglądarki'
    },
    {
      name: 'Biblioteka uniwersalna',
      value: 'universal',
      description:
        '\nBiblioteki uniwersalne są używane zarówno w środowisku serwerowym, jak i przeglądarki'
    }
  ]
});

const path = await input({
  message:
    'Type the main entry file for your library (relative to the current path):',
  validate: (value) => (value.length ? true : 'Please enter a valid path')
});

const confirmBuild = await confirm({
  message: 'Proceed to build step?'
});

if (!confirmBuild) {
  console.log('\nIf you wish to start over, run the script again.');
  process.exit(0);
}

console.log(`\nBuilding your ${purpose} package from ${path}`);

Promise.all([
  esbuild.build({
    entryPoints: [path],
    bundle: true,
    platform: 'node',
    outfile: '../outLib/index.cjs.js'
  }),
  esbuild.build({
    entryPoints: [path],
    bundle: true,
    outfile: '../outLib/index.var.js'
  })
]);

console.log('\nBuild complete!');
