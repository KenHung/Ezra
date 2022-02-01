var chineseNumParser = require('../src/chinese-number-parser');

QUnit.test('Chinese numbers parsing', function (assert) {
  assert.strictEqual(chineseNumParser.parse('1948'), 1948);
  assert.strictEqual(chineseNumParser.parse('七'), 7);
  assert.strictEqual(chineseNumParser.parse('十二'), 12);
  assert.strictEqual(chineseNumParser.parse('廿四'), 24);
  assert.strictEqual(chineseNumParser.parse('卅九'), 39);
  assert.strictEqual(chineseNumParser.parse('六十八'), 68);
  assert.strictEqual(chineseNumParser.parse('一百'), 100);
  assert.strictEqual(chineseNumParser.parse('一百零五'), 105);
  assert.strictEqual(chineseNumParser.parse('一百○五'), 105);
  assert.strictEqual(chineseNumParser.parse('一百三十六'), 136);
  assert.strictEqual(chineseNumParser.parse('一四七'), 147);
});
