(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.average = factory());
})(this, (function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	/**
	 * Calculates the average of a set of numbers.
	 * Accepts any number of numbers as parameters, or an array of numbers.
	 * Ommits any non number value.
	 *
	 * @param {Number|Array} [...nums] A set of numbers or an array of numbers.
	 * @returns {Number} The average number of the set of data provided.
	 * @example
	 *
	 * average(5, 10, 50, -45, 6, 7); // => 5.5
	 * average([5, 10, 50, -45, 6, 7]); // => 5.5
	 *
	 * average(2, 4, 0, -0); // => 1.5
	 * average([2, 4, 0, -0]); // =>
	 *
	 * average(7); // => 7
	 * average([7]); // => 7
	 *
	 * average(0, -0); // => 0
	 * average([0, -0]); // => 0
	 *
	 * average(); // => 0
	 * average([]); // => 0
	 *
	 * average(Infinity, -Infinity, 0, -0, null, NaN, undefined, false, true, 'foo'); // => 0
	 * average([Infinity, -Infinity, 0, -0, null, NaN, undefined, false, true, 'foo']); // => 0
	 *
	 * average(5, 4, null, true, '12', Infinity); // => 0
	 * average([5, 4, null, true, '12', Infinity]); // => 0
	 */
	const average = (...nums) => {
	  let sum = 0;
	  let count = 0;
	  let len = nums.length;

	  if (len === 1 && Array.isArray(nums[0])) {
	    nums = nums[0];
	    len = nums.length;
	  }

	  while (len--) {
	    const num = nums[len];

	    if (Number.isFinite(num)) { // equivalent of
	      sum += num;
	      count += 1;
	    }
	  }

	  return count > 0 ? sum / count : 0;
	};

	var average_1 = average;

	var average$1 = /*@__PURE__*/getDefaultExportFromCjs(average_1);

	return average$1;

}));