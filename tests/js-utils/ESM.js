import pickBy from './dist/index.es.js';

const object = Object.create({
  e: 5
});

Object.defineProperties(object, {
  a: {
    value: 1,
    enumerable: true
  },
  b: {
    value: '2',
    enumerable: true
  },
  c: {
    value: 3,
    enumerable: true
  },
  d: {
    value: 4,
    enumerable: false
  }
});

console.log(
  pickBy(object, function (value) {
    return typeof value === 'number';
  })
);
// => { a: 1, c: 3 }

console.log(
  pickBy(
    object,
    function (value) {
      return typeof value === 'number';
    },
    false
  )
);
// => { a: 1, c: 3, e: 5 }

console.log(
  pickBy(object, function (value) {
    return typeof value === 'function';
  })
);
// => {}

console.log(
  pickBy(object, function (_, key) {
    return key === 'a';
  })
);
// => { a: 1 }

console.log(
  pickBy(object, function (_, key) {
    return key === 'd'; // property "d" is not enumerable
  })
);
