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

var pattern = {
  book: function (books) {
    return '(' + books.map(function (book) { return abbr[book].join('|'); }).join('|') + ')';
  },

  chap: '(第?[' + chiNumParser.supportedChars + ']+' + chapSep + '?' // match chapter in Chinese  (e.g. 第四章 / 四)
      + '|\\d+' + chapSep + ')', // match chapter in Arabic numbers, separator is required (e.g. 4: / 4章)

  vers: '第?([\\s\\d' + versAnd + versTo + ';；節节]*\\d)[節节]?' // match verses (e.g. 第1節 / 1節至7節 / 1-5,6 / 1;3-5)
      + '(?!\\s?' + chapSep + ')' // prevent "約1:2,3" being matched for references like "約1:2,3:4"
};

var bibleRegex = {
  full: new RegExp(
    pattern.book(Object.keys(abbr)) + '?' // match books, which can be skipped like 約1:13;3:14
    + '\\s?' + pattern.chap + pattern.vers
    + '(?:[' + versTo + ']' + pattern.chap + pattern.vers + ')?', // match verses across multiple chapters (e.g. John 3:16-4:1))
    'g'),

  // match references without chapter (e.g. 2 John 5)
  skipChap: new RegExp(pattern.book(['俄', '門', '猶', '約二', '約三']) + '\\s?' + pattern.vers, 'g')
};

/**
 * Converts text to text nodes with hyperlinks.
 * @param {string} text Text to be linkified.
 */
module.exports = function detectBibleRef(text) {
  var results = [];
  var match;
  var lastBook = '';
  while ((match = bibleRegex.full.exec(text)) !== null) {
    var book = match[1] || lastBook;
    if (book) {
      results.push(new BibleRef(match[0], match.index, book, match[2], match[3]));
    }
    else {
      // if no book is provided (e.g. 4:11), there will be no link created
    }
    lastBook = book;
  }
  while ((match = bibleRegex.skipChap.exec(text)) !== null) {
    results.push(new BibleRef(match[0], match.index, match[1], '1', match[2]));
  }
  return results.sort(function (a, b) { return a.pos - b.pos; });
};

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
      if (book.search(pattern.book([stdAbbr])) >= 0) {
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
