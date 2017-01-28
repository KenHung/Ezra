ezraLinkifier.linkify(document.body);

chrome.runtime.onMessage.addListener(function (request) {
  var selection = window.getSelection();
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0),
      rect = range.getBoundingClientRect();

    var div = document.createElement('div');
    div.textContent = '載入中...';
    div.style.borderRadius = '5px';
    div.style.background = '#eee';
    div.style.padding = '0.5em';
    div.style.position = 'fixed';
    div.style.top = rect.top + rect.height + 'px';
    div.style.left = rect.left + rect.width + 'px';
    div.style.zIndex = 9999;
    document.body.appendChild(div);

    var bibleRefReader = new ezraLinkifier._BibleRefReader();
    var bibleRef = bibleRefReader.readRef(request.selectionText);
    // error handling needed    
    bibleRef.getBibleText(function (text) {
      writeClipboard(text);
      // error handling needed
      div.textContent = '已複製！';
      setTimeout(() => document.body.removeChild(div), 1500);
    });
  }
});

function writeClipboard(str) {
  var setClipboardData = function (e) {
    e.clipboardData.setData('text/plain', str);
    e.preventDefault();
  };
  document.addEventListener('copy', setClipboardData);
  document.execCommand('copy', false, null);
  document.removeEventListener('copy', setClipboardData);
}