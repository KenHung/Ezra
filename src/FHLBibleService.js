/* global Resources */
/* exported bibleService */
var bibleService = new FHLBibleService(Resources);

/**
 * Service for getting verses from FHL API (https://bible.fhl.net/json).
 */
function FHLBibleService(Resources) {
  /**
   * Gets Bible text and attaches reference text at the end.
   * @param {BibleRef} bibleRef Bible reference to query.
   * @param {function(string): void} callback Callback for getting bible text.
   */
  this.getVerses = function (bibleRef, callback) {
    // gets Bible text from cache if possible
    FHLBibleService.versesCache = FHLBibleService.versesCache || {};
    var cache = FHLBibleService.versesCache;
    if (cache.hasOwnProperty(bibleRef.refText)) {
      callback(cache[bibleRef.refText] + bibleRef.refText);
    }
    else {
      var cacheSuccess = function (text) {
        cache[bibleRef.refText] = text;
        callback(text + bibleRef.refText);
      };
      getVersesFromFHL(bibleRef, cacheSuccess, callback);
    }
  };

  /**
   * Gets Bible text using FHL API and passes result to callback.
   * @param {BibleRef} bibleRef Bible reference to query.
   * @param {function(string):void} success Callback for successfully getting bible text.
   * @param {function(string):void} fail Callback for failed query, error message will be passed as argument.
   */
  function getVersesFromFHL(bibleRef, success, fail) {
    var xhr = new XMLHttpRequest();
    xhr.onerror = function () {
      fail(Resources.err_cannot_connect);
    };
    xhr.onload = function () {
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
          fail(Resources.err_no_record + bibleRef.refText + '？');
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
      var url = 'https://bible.fhl.net/json/qb.php?chineses=' + bibleRef.abbr
        + '&chap=' + bibleRef.chap
        + '&sec=' + bibleRef.vers
        + '&gb=' + Resources.fhl_gb;
      xhr.open('GET', url, true);
      xhr.send();
    }
    catch (err) {
      fail(Resources.err_cannot_find_verse + err);
    }
  }
}