var ezraLinkifier = require('../src/ezra');
var BibleRefReader = require('../src/bibleRefReader');

QUnit.test('BibleRefReader.toVers', function (assert) {
  var bibleRefReader = new BibleRefReader(document);
  assert.strictEqual(bibleRefReader.readVers('1 - 4'), '1-4');
  assert.strictEqual(bibleRefReader.readVers('1─4'), '1-4');
  assert.strictEqual(bibleRefReader.readVers('1〜4'), '1-4');
  assert.strictEqual(bibleRefReader.readVers('12、25'), '12,25');
  assert.strictEqual(bibleRefReader.readVers('12、25、30'), '12,25,30');
});

QUnit.test('BibleRefReader.createBibleRefs', function (assert) {
  function refTest(ref, abbr, chap, vers) {
    var bibleRefReader = new BibleRefReader(document);
    var bibleRef = bibleRefReader.readRef(ref);
    var actual = bibleRef.abbr + ' ' + bibleRef.chap + ':' + bibleRef.vers;
    var expected = abbr + ' ' + chap + ':' + vers;
    assert.strictEqual(actual, expected);
  }
  refTest('出七16', '出', 7, '16');
  refTest('利未記 7:14', '利', 7, '14');
  refTest('猶3, 6', '猶', 1, '3,6');
  refTest('約壹一14', '約一', 1, '14');
  refTest('約一14', '約', 1, '14');
  refTest('創24：7，12，27，52', '創', 24, '7,12,27,52');
  refTest('約1: 1', '約', 1, '1');
  refTest('約 1 : 1', '約', 1, '1');
  refTest('約一：1–5，6', '約', 1, '1-5,6');
  refTest('約翰福音1:1', '約', 1, '1');
  refTest('西 1：16，20', '西', 1, '16,20');
  refTest('希伯來書4章8節', '來', 4, '8');
  refTest('希伯來書四章8節', '來', 4, '8');
  refTest('希伯來書第四章8節', '來', 4, '8');
  refTest('詩篇一百一十八篇8至9節', '詩', 118, '8-9');
  refTest('詩一百○六篇25', '詩', 106, '25');
  refTest('約叁1', '約三', 1, 1);
});

QUnit.test('BibleRefReader.linkify', function (assert) {
  function linkifyTest(text, expected) {
    var linkifiedHtml = bibleRefReader.linkify(text).reduce(
      (acc, cur) => acc + (cur.outerHTML || cur.nodeValue), '');
    assert.strictEqual(linkifiedHtml, expected);
  }
  linkifyTest('約翰福音1:1', link('約翰福音1:1'));
  linkifyTest('約四24，', link('約四24') + '，');
  linkifyTest('約四，', '約四，');
  linkifyTest('李約 2013.11.17', '李約 2013.11.17');
  linkifyTest('希伯來書4章8節', link('希伯來書4章8節'));
  linkifyTest('希伯來書四章8節', link('希伯來書四章8節'));
  linkifyTest('希伯來書第四章8節', link('希伯來書第四章8節'));
  linkifyTest('四章8節', '四章8節');
  linkifyTest('詩篇一百一十八篇8至9節', link('詩篇一百一十八篇8至9節'));
  linkifyTest('阿摩司書5：21〜24', link('阿摩司書5：21〜24'));
  linkifyTest('詩一百○六篇25', link('詩一百○六篇25'));
  linkifyTest('約1:1;2:1', link('約1:1') + ';' + link('2:1', '約2:1'));
  linkifyTest('約1:1,2:1', link('約1:1') + ',' + link('2:1', '約2:1'));
  linkifyTest('(約1:1)一段文字後(2:1)', `(${link('約1:1')})一段文字後(${link('2:1', '約2:1')})`);
  linkifyTest('約1:2,2:1', link('約1:2') + ',' + link('2:1', '約2:1'));
  linkifyTest('約1:1;2', link('約1:1;2'));
  linkifyTest('約1:2:3', link('約1:2') + ':3');
  linkifyTest('約一:1', link('約一:1'));
  linkifyTest('約一:1－2', link('約一:1－2'));
  linkifyTest('約一:1—2', link('約一:1—2'));
  linkifyTest('約一1、6', link('約一1、6'));
  linkifyTest('約一1～5，6', link('約一1～5，6'));
  linkifyTest('約七：1–5，6', link('約七：1–5，6'));
  linkifyTest('基督的血可洗淨我們的罪（約壹一7-9）', '基督的血可洗淨我們的罪（' + link('約壹一7-9') + '）');
  linkifyTest('要記得我們是從一個污穢骯髒的景況中被釋放出來（申廿六1-5；結十六3-5；詩五一5', 
              `要記得我們是從一個污穢骯髒的景況中被釋放出來（${link('申廿六1-5')}；${link('結十六3-5')}；${link('詩五一5')}`);
  linkifyTest('約叁 5', link('約叁 5'));
  linkifyTest('文字文字文字（約翰二書5）', `文字文字文字（${link('約翰二書5')}）`);
  linkifyTest('文字文字文字（約1：2）文字文字文字（約叁 5）', `文字文字文字（${link('約1：2')}）文字文字文字（${link('約叁 5')}）`);
  linkifyTest('文字文字文字（猶 5,7）文字文字文字（約叁 5）', `文字文字文字（${link('猶 5,7')}）文字文字文字（${link('約叁 5')}）`);
  linkifyTest('07:00-08:00', '07:00-08:00');
});

QUnit.test('ezraLinkifier.linkify', function (assert) {
  function linkifyTest(text, expected) {
    var fixture = document.getElementById('qunit-fixture');
    fixture.innerHTML = text;
    ezraLinkifier.linkify(fixture);
    assert.strictEqual(fixture.innerHTML, expected);
  }
  linkifyTest('<a class="ezra-bible-ref-link">ezra-bible-ref-link</a>', '<a class="ezra-bible-ref-link">ezra-bible-ref-link</a>');
  linkifyTest('經文在最右邊：約壹一1', linkified('經文在最右邊：{約壹一1}'));
  linkifyTest('同一textnode出現幾個經文約 1:1-5，第二個:約 1:2-4,7-10', linkified('同一textnode出現幾個經文{約 1:1-5}，第二個:{約 1:2-4,7-10}'));
});

function linkified(text) {
  return text.replace(/{(.*?)}/g, function (match, p1, offset, string) {
    return linkTheme(p1);
  });
}

function link(text, ref) {
  return '<a ezra-ref="載入中...(' + (ref || text) + ')" class="ezra-bible-ref-link">' + text + '</a>';
}

function linkTheme(text, ref) {
  return '<a ezra-ref="載入中...(' + (ref || text) + ')" class="ezra-bible-ref-link ezra-theme-arrows ezra-target">' + text + '</a>';
}