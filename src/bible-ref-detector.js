var abbr = require('./resources/abbr-zh.json');
var abbrEn = require('./resources/abbr-en.json');
var chiNumParser = require('./chinese-number-parser');

for (var book in abbr) {
  if (Object.hasOwnProperty.call(abbr, book)) {
    var enAbbrRegex = abbrEn[book].map(function (a) { return a.replace('.', '\\.?'); });
    abbr[book] = abbr[book].concat(enAbbrRegex);
  }
}
var chapSep = '[:：︰篇章]';
var versAnd = ',，、和及';
var versTo = '\\-─–－—~～〜至';
var semiCol = ';；';

var versPattern = '第?([\\s\\d' + versAnd + versTo + semiCol + '節节]*\\d)[節节]?';

var bibleRef = new RegExp(
  pattern(Object.keys(abbr)) + '?' // books can be skipped for matching latter part of 約1:13;3:14
  + '\\s?'
  + '(第?[' + chiNumParser.supportedChars + ']+' + chapSep + '?' // separator is optional: 第四章21節 / 四21
  + '|\\d+' + chapSep + ')' // the separator is required for chapter digit (e.g. 4:)
  + versPattern, 'g');

var singleChapBibleRef = new RegExp(
  pattern(['俄', '門', '猶', '約二', '約三']) + '\\s?' + versPattern, 'g');

function pattern(books) {
  return '(' + books.map(function (book) { return abbr[book].join('|'); }).join('|') + ')';
}

/**
* Converts text to text nodes with hyperlinks.
* @param {string} text Text to be linkified.
*/
module.exports = function detectBibleRef(text) {
  var results = [];
  var match;
  var lastBook = '';
  while ((match = bibleRef.exec(text)) !== null) {
    var ref = match[0];
    var vers = match[3];
    // check if verses accidentally matched the next Bible reference
    // for references like "約1:2,3:4", the match is "約1:2,3", the ",3" should not be counted as match  
    var remaining = text.substring(bibleRef.lastIndex); // ":4" in the example
    var verses = vers.match(/\d+/g); // [2, 3] in the example
    if (remaining.search(new RegExp('\\s?' + chapSep + versPattern)) === 0 && verses.length > 1) {
      var redundantVers = new RegExp('[' + versAnd + semiCol + '-\\s]+' + verses[verses.length - 1]); // ",3" in the example
      vers = trimLast(vers, redundantVers);
      var realRef = trimLast(ref, redundantVers);
      bibleRef.lastIndex -= (ref.length - realRef.length);
      ref = realRef;
    }
    var book = match[1] || lastBook;
    if (book) {
      results.push(new BibleRef(ref, match.index, book, match[2], vers));
    }
    else {
      // if no book is provided (e.g. 4:11), there will be no link created
    }
    lastBook = book;
  }
  while ((match = singleChapBibleRef.exec(text)) !== null) {
    results.push(new BibleRef(match[0], match.index, match[1], '1', match[2]));
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

/**
 * A Bible reference containing one or multiple verses.
 */
function BibleRef(text, pos, book, chap, vers) {
  this.text = text;
  this.pos = pos;

  this.abbr = toStdAbbr(book);
  this.chap = chiNumParser.parse(chap.replace(new RegExp(chapSep, 'g'), ''));
  this.vers = readVers(vers);

  function toStdAbbr(book) {
    for (var stdAbbr in abbr) {
      if (abbr[stdAbbr].indexOf(book) >= 0) {
        return stdAbbr;
      }
    }
    for (stdAbbr in abbr) {
      if (book.search(pattern([stdAbbr])) >= 0) {
        return stdAbbr;
      }
    }
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
  }
}
