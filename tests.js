var bibleRefReader = new ezraLinkifier._BibleRefReader(ezraLinkifier._abbr);
var chineseNumParser = new ezraLinkifier._ChineseNumParser();

QUnit.test("BibleRefReader.readAbbr", function (assert) {
    assert.strictEqual(bibleRefReader.readAbbr('啓'), '啟');
    assert.strictEqual(bibleRefReader.readAbbr('啓示錄'), '啟');
});

QUnit.test("ChineseNumParser.parse", function (assert) {
    assert.strictEqual(chineseNumParser.parse('1948'), 1948);
    assert.strictEqual(chineseNumParser.parse('七'), 7);
    assert.strictEqual(chineseNumParser.parse('十二'), 12);
    assert.strictEqual(chineseNumParser.parse('廿四'), 24);
    assert.strictEqual(chineseNumParser.parse('卅九'), 39);
    assert.strictEqual(chineseNumParser.parse('六十八'), 68);
    assert.strictEqual(chineseNumParser.parse('一百'), 100);
    assert.strictEqual(chineseNumParser.parse('一百零五'), 105);
    assert.strictEqual(chineseNumParser.parse('一百三十六'), 136);
    assert.strictEqual(chineseNumParser.parse('一四七'), 147);
});

QUnit.test("BibleRefReader.toVers", function (assert) {
    assert.strictEqual(bibleRefReader.readVers('1 - 4'), '1-4');
    assert.strictEqual(bibleRefReader.readVers('1─4'), '1-4');
    assert.strictEqual(bibleRefReader.readVers('12、25'), '12,25');
    assert.strictEqual(bibleRefReader.readVers('12、25、30'), '12,25,30');
});