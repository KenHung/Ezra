/* global chrome */
/* global Resources */
/* global ezraLinkifier */

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

chrome.storage.sync.get({ lang: 'zh-Hant' }, 
  items => {
    Resources.setLang(items.lang);
    ezraLinkifier.linkify(document.body);
  });

chrome.runtime.onMessage.addListener(function (request) {
  if (request === 'copy-verse') {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      var msg = attachMsg('querying', selection.getRangeAt(0));
      var bibleRefReader = new ezraLinkifier._BibleRefReader();
      var bibleRef = bibleRefReader.readRef(selection.toString());
      if (bibleRef !== null) {
        bibleService.getVerses(bibleRef,
          resp => {
            if (resp.data) {
              writeClipboard(resp.data);
              detachMsg(msg, 'copied');
            }
            else {
              detachMsg(msg, Resources[resp.errCode]);
            }
          });
      }
      else {
        detachMsg(msg, 'noVerse');
      }
    }
  }
});

function attachMsg(msgCode, range) {
  var rect = range.getBoundingClientRect();
  var msg = document.createElement('div');
  msg.textContent = chrome.i18n.getMessage(msgCode) || msgCode;
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

function detachMsg(msg, msgCode) {
  msg.textContent = chrome.i18n.getMessage(msgCode) || msgCode;
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