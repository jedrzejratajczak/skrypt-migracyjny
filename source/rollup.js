import { rollup } from 'rollup';
import amd from 'rollup-plugin-amd';
import commonjs from '@rollup/plugin-commonjs';

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

const build = async () => {
  const config = {
    input: path,
    output: ['amd', 'cjs', 'es', 'iife', 'umd'].map((format) => ({
      file: `./dist/index.${format}.js`,
      format,
      name: path
        .split('/')
        .slice(-1)[0]
        .split('.')[0][0]
    })),
    plugins: [amd(), commonjs()]
  };

  const bundle = await rollup(config);

  await Promise.all(
    config.output.map((outputOptions) => bundle.write(outputOptions))
  );
};

const start = performance.now();
build()
  .then(() => console.log(`Execution time: ${performance.now() - start} ms`))
  .catch((err) => console.error(err));
