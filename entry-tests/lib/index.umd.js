(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'b'], factory);
  } else if (
    typeof exports === 'object' &&
    typeof exports.nodeName !== 'string'
  ) {
    // CommonJS
    factory(exports, require('b'));
  } else {
    // Browser globals
    factory((root.commonJsStrict = {}), root.b);
  }
})(typeof self !== 'undefined' ? self : this, function (exports, b) {
  // Use b in some fashion.

  // attach properties to the exports object to define
  // the exported module properties.
  exports.printUMD = function () {
    console.log('printUMD: Hello world');
  };
});
