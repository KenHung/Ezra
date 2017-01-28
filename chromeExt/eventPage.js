chrome.contextMenus.create({
  "id": 'ezraMenu',
  "title": '複製經文「%s」',
  "contexts": ['selection']
});

chrome.contextMenus.onClicked.addListener(function (info) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { selectionText: info.selectionText });
  });
});