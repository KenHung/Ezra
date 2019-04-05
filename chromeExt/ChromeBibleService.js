/* global chrome */
/* exported bibleService */
/**
 * Created for Chrome 73, since cross-origin requests are not allowed.
 * So a message is sent to background page for cross-origin request.
 */
var bibleService = {
  getVerses: function (bibleRef, callback) {
    chrome.runtime.sendMessage({ contentScriptQuery: 'queryVers', bibleRef: bibleRef }, callback);
  }
};