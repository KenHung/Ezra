ezraLinkifier.linkify(document.body);

chrome.runtime.onMessage.addListener(function (request) {
  var selection = window.getSelection();
  if (selection.rangeCount > 0) {
    var msg = attachMsg('查詢中...', selection.getRangeAt(0));

    var bibleRefReader = new ezraLinkifier._BibleRefReader();
    var bibleRef = bibleRefReader.readRef(request.selectionText);
    if (bibleRef !== null) {
      bibleRef.getBibleText(
        (text) => {
          writeClipboard(text);
          detachMsg(msg, '已複製！');
        },
        (errMsg) => detachMsg(msg, '沒有經文！'));
    }
    else {
      detachMsg(msg, '沒有經文！');
    }
  }
});

function attachMsg(text, range) {
  var rect = range.getBoundingClientRect();
  var msg = document.createElement('div');
  msg.textContent = text;
  msg.style.borderRadius = '3px';
  msg.style.background = '#eee';
  msg.style.padding = '0.3em';
  msg.style.position = 'fixed';
  msg.style.top = rect.top + 'px';
  msg.style.left = rect.left + rect.width + 'px';
  msg.style.zIndex = 999999;
  document.body.appendChild(msg);
  return msg;
}

function detachMsg(msg, text) {
  msg.textContent = text;
  setTimeout(() => document.body.removeChild(msg), 1500);
}

function writeClipboard(str) {
  var setClipboardData = function (e) {
    e.clipboardData.setData('text/plain', str);
    e.preventDefault();
    document.removeEventListener('copy', setClipboardData);
  };
  document.addEventListener('copy', setClipboardData);
  document.execCommand('copy', false, null);
}