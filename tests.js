QUnit.test("toAbbr test", function (assert) {
    assert.strictEqual(toAbbr('啓'), '啟');
    assert.strictEqual(toAbbr('啓示錄'), '啟');
});

QUnit.test("toChap test", function (assert) {
    assert.strictEqual(toChap('1948'), 1948);
    assert.strictEqual(toChap('七'), 7);
    assert.strictEqual(toChap('十二'), 12);
    assert.strictEqual(toChap('廿四'), 24);
    assert.strictEqual(toChap('六十八'), 68);
    assert.strictEqual(toChap('一百'), 100);
    assert.strictEqual(toChap('一百零五'), 105);
    assert.strictEqual(toChap('一百三十六'), 136);
});

QUnit.test("toVers test", function (assert) {
    assert.strictEqual(toVers('1 - 4'), '1-4');
    assert.strictEqual(toVers('1─4'), '1-4');
    assert.strictEqual(toVers('12、25'), '12,25');
    assert.strictEqual(toVers('12、25、30'), '12,25,30');
});