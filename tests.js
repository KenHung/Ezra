var bibleRefReader = new ezraLinkifier._BibleRefReader(ezraLinkifier._abbr);
var abbrResolver = new ezraLinkifier._AbbrResolver();
var chineseNumParser = new ezraLinkifier._ChineseNumParser();

QUnit.test("AbbrResolver.toAbbr", function (assert) {
    assert.strictEqual(abbrResolver.toAbbr('啓'), '啟');
    assert.strictEqual(abbrResolver.toAbbr('啓示錄'), '啟');
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

QUnit.test("BibleRefReader.createBibleRefs", function (assert) {
    function refTest(ref, abbr, chap, vers) {
        var bibleRef = bibleRefReader.readRef(ref);
        var actual = bibleRef.abbr + ' ' + bibleRef.chap + ':' + bibleRef.vers;
        var expected = abbr + ' ' + chap + ':' + vers;
        assert.strictEqual(actual, expected);
    }
    refTest('出七16', '出', 7, '16');
    refTest('利未記 7:14', '利', 7, '14');
    refTest('猶3, 6', '猶', 1, '3,6');
    refTest('約一1:14', '約一', 1, '14');
    refTest('約壹一14', '約一', 1, '14');
    refTest('約一14', '約', 1, '14');
    refTest('創24：7，12，27，52', '創', 24, '7,12,27,52');
    refTest('啟19:10；20:8，9', '啟', 19, '10');
    refTest('約1: 1', '約', 1, '1');
    refTest('約 1 : 1', '約', 1, '1');
    refTest('約翰福音1:1', '約', 1, '1');
    refTest('西1 ： 16 ， 20', '西', 1, '16,20');
    refTest('希伯來書四章8節', '來', 4, '8');
    refTest('詩篇一百一十八篇8至9節', '詩', 118, '8-9');
});

QUnit.test("BibleRefReader.linkify", function (assert) {
    function linkifyTest(text, expected) {
        var linkifiedHtml = bibleRefReader.linkify(text);
        assert.strictEqual(linkifiedHtml, expected);
    }
    linkifyTest('約翰福音1:1', '<a title="載入中...(約翰福音1:1)" class="ezraBibleRefLink">約翰福音1:1</a>');
    linkifyTest('約四24，', '<a title="載入中...(約四24)" class="ezraBibleRefLink">約四24</a>，');
    linkifyTest('約四，', '約四，');
    linkifyTest('希伯來書四章8節', '<a title="載入中...(希伯來書四章8節)" class="ezraBibleRefLink">希伯來書四章8節</a>');
    linkifyTest('詩篇一百一十八篇8至9節', '<a title="載入中...(詩篇一百一十八篇8至9節)" class="ezraBibleRefLink">詩篇一百一十八篇8至9節</a>');
});