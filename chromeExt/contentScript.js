/* global chrome */
/* exported bibleService */

/**
 * Created for Chrome 73, since cross-origin requests are not allowed in content scripts.
 * So a message is sent to background page for cross-origin request.
 * https://www.chromium.org/Home/chromium-security/extension-content-script-fetches
 */
var bibleService = {
  getVerses: function (bibleRef, callback) {
    chrome.runtime.sendMessage({ contentScriptQuery: 'queryVers', bibleRef: bibleRef }, callback);
  }
};

ezraLinkifier.linkify(document.body);

chrome.runtime.onMessage.addListener(function (request) {
  if (request === 'copy-verse') {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      var msg = attachMsg('查詢中...', selection.getRangeAt(0));
      var bibleRefReader = new ezraLinkifier._BibleRefReader();
      var bibleRef = bibleRefReader.readRef(selection.toString());
      if (bibleRef !== null) {
        bibleRef.getBibleText(
          (text) => {
            writeClipboard(text);
            detachMsg(msg, '已複製！');
          },
          (errMsg) => detachMsg(msg, errMsg));
      }
      else {
        detachMsg(msg, '沒有經文！');
      }
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