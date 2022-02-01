/* global chrome */
const bibleService = require('../src/bible-service');

chrome.contextMenus.create({
  id: 'ezraMenu',
  title: chrome.i18n.getMessage('copyVerse') + '「%s」',
  contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === 'ezraMenu') {
    requestCopyVerse();
  }
});

chrome.commands.onCommand.addListener(function (command) {
  if (command === 'copy-verse') {
    requestCopyVerse();
  }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.contentScriptQuery === 'queryVers') {
      bibleService.getVerses(request.bibleRef, sendResponse);
      return true;
    }
  });

function requestCopyVerse() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'copy-verse');
  });
}