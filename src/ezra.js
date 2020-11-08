/*! Ezra - Linkifiy Chinese Bible Reference <https://kenhung.github.io/Ezra/>
    Copyright (C) 2016  Ken Hung

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
(function (ezraLinkifier, undefined) {
  // Embedding prevents conflicts with  the components of web pages.
  /* import tether */
  /* import drop */
  /* import resources */
  /* import lang */
  /* import bibleService */
  /* global Drop */
  /* global Resources */
  /* global bibleService */

  /**
   * Linkify all Bible references text within the DOM of the element.
   * @param {Element} element HTML element to be linkified.
   */
  ezraLinkifier.linkify = function (element) {
    var bibleRefReader = new BibleRefReader();
    var dropFactory = new DropFactory(bibleRefReader, bibleService);

    var textNodes = getTextNodesIn(element);
    for (var i = 0; i < textNodes.length; i++) {
      if (textNodes[i].parentNode.nodeName !== 'A') {
        var linkifiedNodes = bibleRefReader.linkify(textNodes[i].nodeValue);
        var hasLink = linkifiedNodes.some(function (node) {
          return node.nodeName === 'A';
        });
        if (hasLink) {
          replaceWithNodes(textNodes[i], linkifiedNodes);
        }
      }
    }
    var ezraLinks = element.querySelectorAll('.ezra-bible-ref-link');
    for (i = 0; i < ezraLinks.length; i++) {
      var link = ezraLinks[i];
      var ref = link.getAttribute('ezra-ref');
      if (ref !== null) {
        dropFactory.create(link, ref);
      }
      else {
        // there should be something wrong if ref is null
        // maybe there is a link inserted manually but ezra-ref is missing
        // consider adding some notice for the site owner
      }
    }
  };

  function DropFactory(bibleRefReader, bibleService) {
    var _Drop = Drop.createContext({
      classPrefix: 'ezra'
    });

    this.create = function (link, initText) {
      var drop = new _Drop({
        classes: 'ezra-theme-arrows',
        target: link,
        content: document.createTextNode(initText),
        openOn: 'hover',
        constrainToScrollParent: false,
        tetherOptions: {
          constraints: [
            {
              to: 'window',
              attachment: 'together',
              pin: ['left', 'right']
            }
          ]
        }
      });
      drop.on('open', function () {
        var linkSize = window.getComputedStyle(this.target).fontSize;
        this.content.style.fontSize = linkSize;

        this.content.innerText = initText;
        var ref = bibleRefReader.readRef(initText);
        var displayText = function (resp) {
          var text = resp.data || Resources[resp.errCode];
          drop.content.innerText = text;
          drop.position();
        };
        bibleService.getVerses(ref, displayText);
      });
    };
  }

  // added for unit testing
  ezraLinkifier._BibleRefReader = BibleRefReader;
  ezraLinkifier._AbbrResolver = AbbrResolver;
  ezraLinkifier._ChineseNumParser = ChineseNumParser;

  function BibleRefReader() {
    var abbrResolver = new AbbrResolver();
    var chiNumParser = new ChineseNumParser();

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
          abbrResolver.toAbbr(match[1]),
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

  function ChineseNumParser() {
    var numVal = { '○': 0, 零: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
    var expVal = { 十: 10, 廿: 20, 卅: 30, 卌: 40, 百: 100 };
    var nums = Object.keys(numVal);
    var exps = Object.keys(expVal);
    this.supportedChars = nums.concat(exps).join('');

    /**
     * Parses a Chinese number.
     * @param {string} num A Chinese number.
     */
    this.parse = function (num) {
      if (!isNaN(num)) {
        return +num;
      }
      else {
        if (containsExp(num)) {
          var acc = [];
          for (var i = 0; i < num.length; i++) {
            var n = num[i];
            if (isExp(n)) {
              if (acc.length === 0) {
                acc.push(1);
              }
              acc[acc.length - 1] *= expVal[n];
            } else {
              acc.push(numVal[n] || 0);
            }
          }
          return sumOf(acc);
        }
        else {
          var intStr = num.split('').map(function (n) { return numVal[n]; }).join('');
          return parseInt(intStr, 10);
        }
      }
    };
    function containsExp(num) {
      for (var i = 0; i < num.length; i++) {
        if (expVal[num[i]]) {
          return true;
        }
      }
      return false;
    }
    function isExp(num) { return expVal[num] ? true : false; }
    function sumOf(nums) {
      var sum = 0;
      for (var i = 0; i < nums.length; i++) {
        sum += nums[i];
      }
      return sum;
    }
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

  function AbbrResolver() {
    this.toAbbr = function (book) { return Resources.abbr[book] || book; };
  }

  /**
   * Gets all text nodes inside the DOM tree of a node.
   * @param {Node} node A DOM node.
   * @returns {Node[]} List of text nodes.
   */
  function getTextNodesIn(node) {
    var textNodes = [];
    /**
     * Recursively collects all text nodes inside the DOM tree of a node.
     * @param {Node} node A DOM node.
     */
    function getTextNodes(node) {
      if (node.nodeType == 3) {
        textNodes.push(node);
      } else {
        for (var i = 0; i < node.childNodes.length; i++) {
          getTextNodes(node.childNodes[i]);
        }
      }
    }
    getTextNodes(node);
    return textNodes;
  }

  /**
   * Replaces a old node with new nodes.
   * @param {Node} oldNode A node to be replaced.
   * @param {Node[]} newNodes New nodes to be inserted.
   */
  function replaceWithNodes(oldNode, newNodes) {
    for (var i = newNodes.length - 1; i > 0; i--) {
      oldNode.parentNode.insertBefore(newNodes[i], oldNode.nextSibling);
    }
    oldNode.parentNode.replaceChild(newNodes[0], oldNode);
  }
}(window.ezraLinkifier = window.ezraLinkifier || {}));