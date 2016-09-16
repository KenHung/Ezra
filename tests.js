QUnit.test("toChap test", function (assert) {
    assert.strictEqual(toChap('七'), 7);
    assert.strictEqual(toChap('十二'), 12);
    assert.strictEqual(toChap('廿四'), 24);
    assert.strictEqual(toChap('六十八'), 68);
    assert.strictEqual(toChap('一百'), 100);
    assert.strictEqual(toChap('一百零五'), 105);
    assert.strictEqual(toChap('一百三十六'), 136);
});