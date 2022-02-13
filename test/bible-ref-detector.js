var detectBibleRef = require('../src/bible-ref-detector');

QUnit.test('single Bible reference', function (assert) {
  function test(ref, abbr, chap, vers) {
    var bibleRef = detectBibleRef(ref)[0];
    var actual = bibleRef ? (bibleRef.abbr + ' ' + bibleRef.refsStr    ) : undefined;
    var expected = abbr + ' ' + chap + ':' + vers;
    assert.strictEqual(actual, expected, `ref: ${ref}`);
  }
  test('出七16', '出', 7, '16');
  test('利未記 7:14', '利', 7, '14');
  test('猶3, 6', '猶', 1, '3,6');
  test('Jude 3, 6', '猶', 1, '3,6');
  test('約壹一14', '約一', 1, '14');
  test('約一14', '約', 1, '14');
  test('John 1:14', '約', 1, '14');
  test('創24：7，12，27，52', '創', 24, '7,12,27,52');
  test('創24：7、12、27、52', '創', 24, '7,12,27,52');
  test('約1: 1', '約', 1, '1');
  test('約一：1 - 4', '約', 1, '1-4');
  test('約一：1–5，6', '約', 1, '1-5,6');
  test('約翰福音1:1', '約', 1, '1');
  test('西 1：16，20', '西', 1, '16,20');
  test('希伯來書4章8節', '來', 4, '8');
  test('希伯來書四章8節', '來', 4, '8');
  test('希伯來書第四章8節', '來', 4, '8');
  test('詩篇一百一十八篇8至9節', '詩', 118, '8-9');
  test('詩一百○六篇25', '詩', 106, '25');
  test('Ps 106:25', '詩', 106, '25');
  test('Ps. 106:25', '詩', 106, '25');
  test('約叁1', '約三', 1, 1);
  test('約叁 5', '約三', 1, 5);
  test('阿摩司書5：21〜24', '摩', 5, '21-24');
});

QUnit.test('trim last comma', function (assert) {
  var bibleRef = detectBibleRef('約四24，')[0];
  assert.strictEqual(bibleRef.text, '約四24');
  assert.strictEqual(bibleRef.abbr, '約');
  assert.deepEqual(bibleRef.refs, { 4: '24' });
});

QUnit.test('multiple Bible references in John', function (assert) {
  function test(text, expected, ...refs) {
    var bibleRefs = detectBibleRef(text);
    var actual = bibleRefs.map(b => b.text);
    assert.deepEqual(actual, expected);
    if (refs.length > 0) {
      var actualRefs = bibleRefs.map(b => b.refs);
      assert.deepEqual(actualRefs, refs);
    }
  }
  test('約1:1;2:1', ['約1:1', '2:1'], { 1: '1' }, { 2: '1' });
  test('約1:1,2:1', ['約1:1', '2:1'], { 1: '1' }, { 2: '1' });
  test('約1:2,2:1', ['約1:2', '2:1'], { 1: '2' }, { 2: '1' });
  test('約1:2-2:5', ['約1:2-2:5'], { 1: '2-200', 2: '1-5' });
  test('約11:2-12:5', ['約11:2-12:5'], { 11: '2-200', 12: '1-5' });
  test('約一:1', ['約一:1']);
  test('約一:1－2', ['約一:1－2']);
  test('約一:1—2', ['約一:1—2']);
  test('約一1、6', ['約一1、6']);
  test('約一1～5，6', ['約一1～5，6']);
  test('約七：1–5，6', ['約七：1–5，6']);
});

QUnit.test('multiple Bible references embedded', function (assert) {
  function test(text, expected) {
    var bibleRefs = detectBibleRef(text);
    var actual = bibleRefs.map(b => b.pos);
    assert.deepEqual(actual, expected);
  }
  test('(約1:1)一段文字後(2:1)', [1, 12]);
  test('基督的血可洗淨我們的罪（約壹一7-9）', [12]);
  test('要記得我們是從一個污穢骯髒的景況中被釋放出來（申廿六1-5；結十六3-5；詩五一5', [23, 30, 37]);
  test('文字文字文字（約翰二書5）', [7]);
  test('文字文字文字（約叁 5）文字文字文字（約1：2）', [7, 19]);
  test('文字文字文字（猶 5,7）文字文字文字（約叁 5）', [7, 20]);

});

QUnit.test('no Bible reference', function (assert) {
  function test(text) {
    var actual = detectBibleRef(text);
    assert.deepEqual(actual, []);
  }
  test('約四，');
  test('李約 2013.11.17');
  test('四章8節');
  test('07:00-08:00');
  test('Jba 1:1');
});
