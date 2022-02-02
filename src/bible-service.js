var resources = require('./resources');

module.exports = new FHLBibleService();

var BibleServiceError = Object.freeze({
  'connectFail': 'connectFail',
  'verseNotFound': 'verseNotFound',
  'refInvalid': 'refInvalid',
});

/**
 * Service for getting verses from FHL API (https://bible.fhl.net/json).
 */
function FHLBibleService() {
  var versesCache = {};

  /**
   * Gets Bible text and attaches reference text at the end.
   * @param {BibleRef} bibleRef Bible reference to query.
   * @param {function(any): void} callback Callback for getting bible text.
   */
  this.getVerses = function (bibleRef, callback) {
    var bibleRefStr = resources.fhl.gb + resources.refText(bibleRef);
    if (versesCache.hasOwnProperty(bibleRefStr)) {
      callback({ data: versesCache[bibleRefStr] + resources.refText(bibleRef) });
    }
    else {
      var cacheSuccess = function (text) {
        versesCache[bibleRefStr] = text;
        callback({ data: text + resources.refText(bibleRef) });
      };
      var fail = function (errCode, errMsg) {
        callback({ errCode: errCode, errMsg: errMsg });
      };
      getVersesFromFHL(bibleRef, cacheSuccess, fail);
    }
  };

  /**
   * Gets Bible text using FHL API and passes result to callback.
   * @param {BibleRef} bibleRef Bible reference to query.
   * @param {function(string): void} success Callback for successfully getting bible text.
   * @param {function(string, any): void} fail Callback for failed query, error message will be passed as argument.
   */
  function getVersesFromFHL(bibleRef, success, fail) {
    var xhr = new XMLHttpRequest();
    xhr.onerror = function () {
      fail(BibleServiceError.connectFail);
    };
    xhr.onload = function () {
      if (xhr.status !== 200) {
        fail(BibleServiceError.verseNotFound, 'XHR status = ' + xhr.status);
        return;
      }
      try {
        var resp = JSON.parse(xhr.responseText);
        if (resp.status !== 'success') {
          fail(BibleServiceError.verseNotFound, 'FHL response text = ' + xhr.responseText);
          return;
        } else if (resp.record.length === 0) {
          fail(BibleServiceError.refInvalid);
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
        fail(BibleServiceError.verseNotFound, err);
      }
    };
    try {
      var url = 'https://bible.fhl.net/json/qb.php?chineses=' + resources.getLocalAbbr(bibleRef.abbr)
        + '&chap=' + bibleRef.chap
        + '&sec=' + bibleRef.vers
        + '&gb=' + resources.fhl.gb;
      xhr.open('GET', url, true);
      xhr.send();
    }
    catch (err) {
      fail(BibleServiceError.verseNotFound, err);
    }
  }
}
