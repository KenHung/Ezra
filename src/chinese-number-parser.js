var numVal = { '○': 0, 零: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
var expVal = { 十: 10, 廿: 20, 卅: 30, 卌: 40, 百: 100 };
var nums = Object.keys(numVal);
var exps = Object.keys(expVal);

exports.supportedChars = nums.concat(exps).join('');

/**
 * Parses a Chinese number.
 * @param {string} num A Chinese number.
 */
exports.parse = function (num) {
  if (!isNaN(num)) {
    return +num;
  }
  else {
    if (containsExp(num)) {
      var acc = [];
      for (var i = 0; i < num.length; i++) {
        var n = num[i];
        if (isExp(n)) {
          if (acc.length === 0) {
            acc.push(1);
          }
          acc[acc.length - 1] *= expVal[n];
        } else {
          acc.push(numVal[n] || 0);
        }
      }
      return sumOf(acc);
    }
    else {
      var intStr = num.split('').map(function (n) { return numVal[n]; }).join('');
      return parseInt(intStr, 10);
    }
  }
};

function containsExp(num) {
  for (var i = 0; i < num.length; i++) {
    if (expVal[num[i]]) {
      return true;
    }
  }
  return false;
}

function isExp(num) { return expVal[num] ? true : false; }

function sumOf(nums) {
  var sum = 0;
  for (var i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum;
}
