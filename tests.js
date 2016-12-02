var bibleRefReader = new ezraLinkifier._BibleRefReader(ezraLinkifier._abbr);
var abbrResolver = new ezraLinkifier._AbbrResolver();
var chineseNumParser = new ezraLinkifier._ChineseNumParser();

QUnit.test('AbbrResolver.toAbbr', function (assert) {
  assert.strictEqual(abbrResolver.toAbbr('啓'), '啟');
  assert.strictEqual(abbrResolver.toAbbr('啓示錄'), '啟');
});

QUnit.test('ChineseNumParser.parse', function (assert) {
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

QUnit.test('BibleRefReader.toVers', function (assert) {
  assert.strictEqual(bibleRefReader.readVers('1 - 4'), '1-4');
  assert.strictEqual(bibleRefReader.readVers('1─4'), '1-4');
  assert.strictEqual(bibleRefReader.readVers('12、25'), '12,25');
  assert.strictEqual(bibleRefReader.readVers('12、25、30'), '12,25,30');
});

QUnit.test('BibleRefReader.createBibleRefs', function (assert) {
  function refTest(ref, abbr, chap, vers) {
    var bibleRef = bibleRefReader.readRef(ref);
    var actual = bibleRef.abbr + ' ' + bibleRef.chap + ':' + bibleRef.vers;
    var expected = abbr + ' ' + chap + ':' + vers;
    assert.strictEqual(actual, expected);
  }
  refTest('出七16', '出', 7, '16');
  refTest('利未記 7:14', '利', 7, '14');
  //refTest('猶3, 6', '猶', 1, '3,6');
  refTest('約一1:14', '約一', 1, '14');
  refTest('約壹一14', '約一', 1, '14');
  refTest('約一14', '約', 1, '14');
  refTest('創24：7，12，27，52', '創', 24, '7,12,27,52');
  refTest('約1: 1', '約', 1, '1');
  refTest('約 1 : 1', '約', 1, '1');
  refTest('約翰福音1:1', '約', 1, '1');
  refTest('西1 ： 16 ， 20', '西', 1, '16,20');
  refTest('希伯來書四章8節', '來', 4, '8');
  refTest('詩篇一百一十八篇8至9節', '詩', 118, '8-9');
});

QUnit.test('BibleRefReader.linkify', function (assert) {
  function linkifyTest(text, expected) {
    var linkifiedHtml = bibleRefReader.linkify(text);
    assert.strictEqual(linkifiedHtml, expected);
  }
  function link(text, ref) {
    return '<a title="載入中...(' + (ref || text) + ')" class="ezraBibleRefLink">' + text + '</a>';
  }
  linkifyTest('約翰福音1:1', link('約翰福音1:1'));
  linkifyTest('約四24，', link('約四24') + '，');
  linkifyTest('約四，', '約四，');
  linkifyTest('李約 2013.11.17', '李約 2013.11.17');
  linkifyTest('希伯來書四章8節', link('希伯來書四章8節'));
  linkifyTest('四章8節', '四章8節');
  linkifyTest('詩篇一百一十八篇8至9節', link('詩篇一百一十八篇8至9節'));
  linkifyTest('約1:1;2:1', link('約1:1') + ';' + link('2:1', '約2:1'));
  linkifyTest('約1:1,2:1', link('約1:1') + ',' + link('2:1', '約2:1'));
  linkifyTest('約1:1;2', link('約1:1;2'));
  linkifyTest('約1:2:3', link('約1:2') + ':3');
  linkifyTest('約一:1', link('約一:1'));
  linkifyTest('約 1、6', link('約 1、6'));
  linkifyTest('約 1～5，6', link('約 1～5，6'));
});