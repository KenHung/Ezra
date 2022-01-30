var Resources = require('./lang/resources');
var chiNumParser = require('./chineseNumParser');

module.exports = function BibleRefReader(document) {
  var chapSep = '[:：︰篇章]';
  var versAnd = ',，、和及';
  var versTo = '\\-─–－—~～〜至';
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
    + chapPattern + '?' // cover some books that only have single chapter (e.g. 猶太書1節)
    + versPattern, 'g');

  var fullBibleRef = new RegExp(
    booksPattern
    + '\\s?'
    + chapPattern + '?'
    + versPattern);

  /**
   * Converts text to text nodes with hyperlinks.
   * @param {string} text Text to be linkified.
   */
  this.linkify = function (text) {
    var tempLinkifiedNodes = [];
    var match;
    var lastBook = '';
    var lastIndex = 0;
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
      var book = match[1];
      if (book !== undefined || lastBook !== '') {
        var titleRef = book !== undefined ? ref : lastBook + ref;
        var link = createLink(ref, titleRef);
      }
      else {
        // if no book is provided (e.g. 4:11), there will be no link created
      }
      var strBeforeMatch = text.substring(lastIndex, match.index);
      tempLinkifiedNodes.push(document.createTextNode(strBeforeMatch));
      tempLinkifiedNodes.push(link || document.createTextNode(ref));
      lastBook = book || lastBook;
      lastIndex = bibleRef.lastIndex;
    }
    tempLinkifiedNodes.push(document.createTextNode(text.substring(lastIndex)));

    var linkifiedNodes = [];
    // to match books that only has one chapter: '猶 3, 6'/'約叁2'/...
    var linkHtml = createLink('$&', '$&').outerHTML.replace(/&amp;/g, '&');
    for (var temp = 0; temp < tempLinkifiedNodes.length; temp++) {
      var tempNode = tempLinkifiedNodes[temp];
      if (tempNode.nodeName === '#text') {
        var newHtml = tempNode.nodeValue.replace(singleChapBibleRef, linkHtml);
        var newNodes = htmlToElement(newHtml);
        for (var newN = 0; newN < newNodes.length; newN++) {
          var newNode = newNodes[newN];
          linkifiedNodes.push(newNode);
        }
      }
      else {
        linkifiedNodes.push(tempNode);
      }
    }
    return linkifiedNodes;
  };
  function createLink(text, titleRef) {
    var link = document.createElement('a');
    link.setAttribute('ezra-ref', Resources.loading + '...(' + titleRef + ')');
    link.className = 'ezra-bible-ref-link';
    link.innerText = text;
    return link;
  }
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
   * @param {String} HTML representing a single element
   * @return {Element}
   */
  function htmlToElement(html) {
    var temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.childNodes;
  }

  this.summarize = function (text, refDataList) {
    var match;
    while ((match = bibleRef.exec(text)) !== null) {
      var ref = match[0];
      var bibleRef = this.readRef(ref);
      bibleService.getVerses(bibleRef, function (resp) {
        var text = resp.data || Resources[resp.errCode];
        var refMatch = /(.*)\((.*)\)/.exec(text);
        refDataList.push({
          ref: refMatch[2],
          verses: refMatch[1]
        });
      });
    }
  };

  /**
   * Creates a Bible reference by text.
   * @param {string} ref A Bible reference text.
   */
  this.readRef = function (ref) {
    // preconditions: ref must contains a full bible reference
    var match = fullBibleRef.exec(ref);
    if (match !== null) {
      var chapSepRegex = new RegExp(chapSep, 'g');
      return new BibleRef(
        toAbbr(match[1]),
        match[2] !== undefined ? chiNumParser.parse(match[2].replace(chapSepRegex, '')) : 1,
        this.readVers(match[3]));
    }
    else {
      return null;
    }
  };

  /**
   * Converts or removes unsupported string for query. (e.g. '1，4' => '1,4' / '1及4節' => '1,4' / ...)
   * @param {string} vers Verses string.
   */
  this.readVers = function (vers) {
    return vers
      .replace(new RegExp('[' + versTo + ']', 'g'), '-')
      .replace(new RegExp('[' + versAnd + ']', 'g'), ',')
      .replace(/[節节\s]/g, '');
  };
}

/**
 * A Bible reference containing one or multiple verse.
 * @constructor
 * @param {string} abbr Book of Bible. (in Chinese abbreviation, e.g. 創，出，利，民，申，⋯⋯)
 * @param {number} chap Chapter of the Book.
 * @param {string} vers Verses of the chapter, range is supported. (e.g. 1-3 / 1,3,7 / 1-5,10 / ...)
 */
function BibleRef(abbr, chap, vers) {
  this.abbr = abbr;
  this.chap = chap;
  this.vers = vers;
  this.refText = '(' + abbr + ' ' + chap + ':' + vers + ')';
  this.lang = Resources.fhl_gb;
}

function toAbbr(book) { 
  return Resources.abbr[book] || book;
}
