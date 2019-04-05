/* global chrome */

chrome.contextMenus.create({
  id: 'ezraMenu',
  title: '複製經文「%s」',
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
      getBibleTextFromFHL(request.abbr, request.chap, request.vers, request.Resources, sendResponse, sendResponse);
      return true;
    }
  });

function requestCopyVerse() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'copy-verse');
  });
}

/**
 * Gets Bible text using FHL API and passes result to callback.
 * @param {function(string):void} success Callback for successfully getting bible text.
 * @param {function(string):void} fail Callback for failed query, error message will be passed as argument.
 */
function getBibleTextFromFHL(abbr, chap, vers, Resources, success, fail) {
  var xhr = new XMLHttpRequest();
  xhr.onerror = function () {
    fail(Resources.err_cannot_connect);
  };
  xhr.onload = function() {
    if (xhr.status !== 200) {
      fail(Resources.err_cannot_find_verse + 'XHR status = ' + xhr.status);
      return;
    }
    try {
      var resp = JSON.parse(xhr.responseText);
      if (resp.status !== 'success') {
        fail(Resources.err_cannot_find_verse + 'FHL response text = ' + xhr.responseText);
        return;
      } else if (resp.record.length === 0) {
        var refText = '(' + abbr + ' ' + chap + ':' + vers + ')';
        fail(Resources.err_no_record + refText + '？');
        return;
      }
      var versesText = '';
      var lastSec = 0;
      for (var i = 0; i < resp.record.length; i++) {
        var record = resp.record[i];
        // insert '⋯⋯' if verses are not continuous
        if (i > 0 && record.sec > lastSec + 1) {
          versesText += '⋯⋯';
        }
        lastSec = record.sec;
        versesText += record.bible_text;
      }
      success(versesText);
    } catch (err) {
      fail(Resources.err_cannot_find_verse + err);
    }
  };
  try {
    var url = 'https://bible.fhl.net/json/qb.php?chineses=' + abbr
            + '&chap=' + chap 
            + '&sec=' + vers 
            + '&gb=' + Resources.fhl_gb;
    xhr.open('GET', url, true);
    xhr.send();
  }
  catch (err) {
    fail(Resources.err_cannot_find_verse + err);
  }
}