var ezraLinkifier = require('../src/ezra');

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