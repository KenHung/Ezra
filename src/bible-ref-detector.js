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
  // match standard Bible references, and chapter can be skipped (e.g. 約1:13;3:14)
  standard: new RegExp(
    pattern.book(Object.keys(abbr)) + '?' + '\\s?' + pattern.chap + pattern.vers, 'g'),

  // match verses across multiple chapters (e.g. John 3:16-4:1))
  multiChap: new RegExp(
    pattern.book(Object.keys(abbr)) + '\\s?' + pattern.chap + pattern.vers
    + '[' + versTo + ']' + pattern.chap + pattern.vers, 'g'),

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
  while ((match = bibleRegex.multiChap.exec(text)) !== null) {
    results.push(new BibleRef(match[0], match.index, match[1], match[2], match[3], match[4], match[5]));
  }
  while ((match = bibleRegex.standard.exec(text)) !== null) {
    var book = match[1] || lastBook;
    var notMatched = results.every(function (r) {
      return match.index < r.pos || match.index >= r.pos + r.text.length;
    });
    if (book && notMatched) {
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
function BibleRef(text, pos, book, chap, vers, endChap, endVers) {
  this.text = text;
  this.pos = pos;

  this.abbr = toStdAbbr(book);

  chap = toStdChap(chap);
  vers = toStdVers(vers);
  this.refs = {};
  if (endChap && endVers) {
    endChap = toStdChap(endChap);
    endVers = toStdVers(endVers);

    this.refs[chap] = vers + '-200';
    for (var c = chap + 1; c < endChap; c++) {
      this.refs[c] = '1-200';
    }
    this.refs[endChap] = '1-' + endVers;

    this.refsStr = chap + ':' + vers + '-' + endChap + ':' + endVers;
  }
  else {
    this.refs[chap] = vers;
    this.refsStr = chap + ':' + vers;
  }

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

  function toStdChap(chap) {
    return chiNumParser.parse(chap.replace(new RegExp(chapSep, 'g'), ''));
  }

  /**
   * Converts or removes unsupported string for query. (e.g. '1，4' => '1,4' / '1及4節' => '1,4' / ...)
   * @param {string} vers Verses string.
   */
  function toStdVers(vers) {
    return vers
      .replace(new RegExp('[' + versTo + ']', 'g'), '-')
      .replace(new RegExp('[' + versAnd + ']', 'g'), ',')
      .replace(/[節节\s]/g, '');
  }
}
