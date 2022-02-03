/* global chrome */

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

function requestCopyVerse() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'copy-verse');
  });
}
