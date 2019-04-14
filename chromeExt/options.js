/* global chrome */

document.querySelector('#langLabel').innerHTML = chrome.i18n.getMessage('versesLang');
document.querySelector('#save').innerHTML = chrome.i18n.getMessage('save');
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

// Saves options to chrome.storage
function save_options() {
  var lang = document.getElementById('lang').value;
  chrome.storage.sync.set({
    lang: lang,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = '成了。';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    lang: 'zh-Hant',
  }, function(items) {
    document.getElementById('lang').value = items.lang;
  });
}