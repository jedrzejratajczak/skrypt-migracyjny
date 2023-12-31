import { rollup } from 'rollup';
import amd from 'rollup-plugin-amd';
import commonjs from '@rollup/plugin-commonjs';

const build = async () => {
  const config = {
    input: '../tests/js-utils/src/pickBy.js',
    output: ['amd', 'cjs', 'es', 'iife', 'umd'].map((format) => ({
      file: `./dist/index.${format}.js`,
      format,
      name: 'pickBy'
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
