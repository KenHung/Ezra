/* global chrome */
const resources = require('../src/resources');
const linkify = require('../src/ezra');
const detectBibleRef = require('../src/bible-ref-detector');
const bibleService = require('../src/bible-service');

chrome.storage.sync.get({ lang: 'zh-Hant' },
  items => {
    resources.setLang(items.lang);
    linkify(document.body);
  });

chrome.runtime.onMessage.addListener((request) => {
  if (request === 'copy-verse') {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      var msg = attachMsg('querying', selection.getRangeAt(0));
      var bibleRefs = detectBibleRef(selection.toString());
      if (bibleRefs.length > 0) {
        bibleService.getVerses(bibleRefs[0],
          resp => {
            if (resp.data) {
              writeClipboard(resp.data);
              detachMsg(msg, 'copied');
            }
            else {
              detachMsg(msg, resources[resp.errCode]);
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
