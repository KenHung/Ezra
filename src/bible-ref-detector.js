var Resources = require('./lang/resources');
Resources.add('zh-Hans', require('./lang/zh-Hans.js'));
Resources.add('zh-Hant', require('./lang/zh-Hant.js'));

var chiNumParser = require('./chinese-number-parser');
var chapSep = '[:：︰篇章]';
var versAnd = ',，、和及';
var versTo = '\\-─–－—~～〜至';

module.exports = function BibleRefDetector() {
  var semiCol = ';；';

  var booksPattern = '(' + Resources.namesOfAllBooks + ')';
  var singleChapBooksPattern = '(' + Resources.singleChapterBooks + ')';
  var chapPattern
    = '(第?[' + chiNumParser.supportedChars + ']+' + chapSep + '?' // separator is optional: 第四章21節 / 四21
    + '|\\d+' + chapSep + ')'; // the separator is required for chapter digit (e.g. 4:)
  var versPattern = '第?([' + versAnd + versTo + semiCol + '節节\\s\\d]*\\d)[節节]?';

  var bibleRef = new RegExp(
    booksPattern + '?' // books can be skipped for matching latter part of 約1:13;3:14
    + '\\s?'
    + chapPattern
    + versPattern, 'g');

  var singleChapBibleRef = new RegExp(
    singleChapBooksPattern
    + '\\s?'
    + versPattern, 'g');

  /**
   * Converts text to text nodes with hyperlinks.
   * @param {string} text Text to be linkified.
   */
  this.detect = function (text) {
    var results = [];
    var match;
    var lastBook = '';
    while ((match = bibleRef.exec(text)) !== null) {
      var ref = match[0];
      // check if verses accidentally matched the next Bible reference
      // for references like "約1:2,3:4", the match is "約1:2,3", the ",3" should not be counted as match  
      var remaining = text.substring(bibleRef.lastIndex); // ":4" in the example
      var verses = match[3].match(/\d+/g); // [2, 3] in the example
      if (remaining.search(new RegExp('\\s?' + chapSep + versPattern)) === 0 && verses.length > 1) {
        var redundantVers = new RegExp('[' + versAnd + semiCol + '\\s]+' + verses[verses.length - 1]); // ",3" in the example
        var realRef = trimLast(ref, redundantVers);
        bibleRef.lastIndex -= (ref.length - realRef.length);
        ref = realRef;
      }
      var book = match[1] || lastBook;
      if (book !== undefined) {
        results.push(new BibleRef(ref, match.index, book, match[2], match[3]));
      }
      else {
        // if no book is provided (e.g. 4:11), there will be no link created
      }
      lastBook = book;
    }
    return results;
  };

  function trimLast(ref, regex) {
    var matches = ref.match(regex);
    if (matches) {
      var newIndex = ref.lastIndexOf(matches[matches.length - 1]);
      return ref.substring(0, newIndex);
    }
    else {
      return ref;
    }
  }
}

/**
 * A Bible reference containing one or multiple verses.
 */
function BibleRef(text, pos, book, chap, vers) {
  this.text = text;
  this.pos = pos;

  this.abbr = toAbbr(book);
  this.chap = chiNumParser.parse(chap.replace(new RegExp(chapSep, 'g'), ''));
  this.vers = readVers(vers);

  this.refText = '(' + this.abbr + ' ' + this.chap + ':' + this.vers + ')';
  this.lang = Resources.fhl_gb;

  function toAbbr(book) {
    return Resources.abbr[book] || book;
  }

  /**
   * Converts or removes unsupported string for query. (e.g. '1，4' => '1,4' / '1及4節' => '1,4' / ...)
   * @param {string} vers Verses string.
   */
  function readVers(vers) {
    return vers
      .replace(new RegExp('[' + versTo + ']', 'g'), '-')
      .replace(new RegExp('[' + versAnd + ']', 'g'), ',')
      .replace(/[節节\s]/g, '');
  };
}