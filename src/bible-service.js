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
    var cached = Object.hasOwnProperty.call(versesCache, bibleRefStr);
    if (cached) {
      callback({ data: versesCache[bibleRefStr] + resources.refText(bibleRef) });
    }
    else {
      var bibleText = [];
      var success = function (chap, text) {
        bibleText.push({ chap: chap, text: text });
        if (bibleText.length == Object.keys(bibleRef.refs).length) {
          bibleText.sort(function (a, b) { return a.chap - b.chap; });
          versesCache[bibleRefStr] = bibleText.map(function (b) { return b.text; }).join('');
          callback({ data: versesCache[bibleRefStr] + resources.refText(bibleRef) });
        }
      };
      var fail = function (errCode, errMsg) {
        callback({ errCode: errCode, errMsg: errMsg });
      };
      for (var chap in bibleRef.refs) {
        var queryParams = {
          chineses: resources.getLocalAbbr(bibleRef.abbr),
          chap: chap,
          sec: bibleRef.refs[chap],
          gb: resources.fhl.gb
        };
        getVersesFromFHL(queryParams, success, fail);
      }
    }
  };

  /**
   * Gets Bible text using FHL API and passes result to callback.
   * @param {Object} queryParams Bible reference to query.
   * @param {function(int, string): void} success Callback for successfully getting bible text.
   * @param {function(string, any): void} fail Callback for failed query, error message will be passed as argument.
   */
  function getVersesFromFHL(queryParams, success, fail) {
    var xhr = new XMLHttpRequest();
    var url = 'https://bible.fhl.net/json/qb.php?'
      + 'chineses=' + queryParams.chineses
      + '&chap=' + queryParams.chap
      + '&sec=' + queryParams.sec
      + '&gb=' + queryParams.gb;
    xhr.open('GET', url, true);
    xhr.onload = function () {
      if (xhr.status !== 200) {
        fail(BibleServiceError.verseNotFound, 'XHR status = ' + xhr.status);
        return;
      }
      try {
        var resp = JSON.parse(xhr.responseText);
        if (resp.record.length === 0) {
          fail(BibleServiceError.refInvalid);
          return;
        }
        var bibleText = concatBibleText(resp.record);
        success(resp.record[0].chap, bibleText);
      } catch (err) {
        fail(BibleServiceError.verseNotFound, err);
      }
    };
    xhr.onerror = function () {
      fail(BibleServiceError.connectFail);
    };
    xhr.send();
  }
}

function concatBibleText(records) {
  var versesText = '';
  var lastSec = 0;
  for (var i = 0; i < records.length; i++) {
    var record = records[i];
    // insert '⋯⋯' if verses are not continuous
    if (i > 0 && record.sec > lastSec + 1) {
      versesText += '⋯⋯';
    }
    lastSec = record.sec;
    versesText += record.bible_text;
  }
  return versesText;
}
