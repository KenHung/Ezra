(function (ezraLinkifier, undefined) {
  // Ezra embeds Tether and Drop from HubSpot, which are MIT licensed
  /* Tether to be inserted */
  /* Drop to be inserted */
  var _Drop = Drop.createContext({
    classPrefix: 'ezra'
  });
  var bibleRefReader = new BibleRefReader();

  /**
   * Linkify all Bible references text within the DOM of the element.
   * @param {Element} element HTML element to be linkified.
   */
  ezraLinkifier.linkify = function (element) {
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
    for (var i = 0; i < ezraLinks.length; i++) {
      var link = ezraLinks[i];
      var ref = link.getAttribute('ezra-ref');
      if (ref !== null) {
        createDrop(link, ref);
      }
      else {
        // there should be something wrong if ref is null
        // maybe there is a link inserted manually but ezra-ref is missing
        // consider adding some notice for the site owner
      }
    }
  };

  function createDrop(link, refText) {
    var drop = new _Drop({
      classes: 'ezra-theme-arrows',
      target: link,
      content: document.createTextNode(refText),
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
      var ref = bibleRefReader.readRef(refText);
      ref.getBibleTextWithRef(function (text) {
        drop.content.innerText = text;
        drop.content.innerHTML
          += '<div class="ezra-seperator"></div>'
          + '<div class="ezra-footer"><a href="https://kenhung.github.io/Ezra/" target="_blank">Powered by Ezra</a></div>';
        drop.position();
      });
    });
  }

  // added for unit testing
  ezraLinkifier._BibleRefReader = BibleRefReader;
  ezraLinkifier._AbbrResolver = AbbrResolver;
  ezraLinkifier._ChineseNumParser = ChineseNumParser;

  function BibleRefReader() {
    var abbrResolver = new AbbrResolver();
    var chiNumParser = new ChineseNumParser();

    /**
     * Creates a regular expression for matching Bible references, probably the hardest code to understand in Ezra.
     * @param {string} exp Base regular expression.
     * @param {string} flags Regular expression flags.
     */
    function bibleRefExp(exp, flags) {
      return new RegExp(exp
        .replace('{B}', abbrResolver.bibleBooks) // to match '創世記'/'出埃及記'/'利未記'/'民數記'/'申命記'/.../'創'/'出'/'利'/'民'/'申'...
        .replace('{C}', '第?[' + chiNumParser.supportedChars + ']+|\\d+\\s*[{:}]') // to mach '第一章'/'第五篇'/'42:'...
        .replace('{S}', '\\s{:}第')
        .replace('{V}', '[{,}{-}{;}{VE}\\s\\d]*\\d') // to match '1-5'/'1-3, 6'/'1;5'/'1及4節'...
        .replace(/{:}/g, ':：︰篇章')
        .replace('{,}', ',，、和及')
        .replace('{-}', '\\-─–－—~～〜至')
        .replace(/{VE}/g, '節节')
        .replace(/{;}/g, ';；'), flags || '');
    }
    var bibleRef = bibleRefExp('({B})?\\s?({C})[{S}]*({V})[{VE}]?', 'g');

    /**
     * Converts text to text nodes with hyperlinks.
     * @param {string} text Text to be linkified.
     */
    this.linkify = function (text) {
      // different bible reference formats are handled: 約1:1 約1:1,2 約1:1;2 約1:2,3:4 約1:2;3:4
      var linkifiedNodes = [];
      var match;
      var lastBook = '';
      var lastIndex = 0;
      while ((match = bibleRef.exec(text)) !== null) {
        var ref = match[0];
        // check if verses accidentally matched the next Bible reference
        // for references like "約1:2,3:4", the match is "約1:2,3", the ",3" should not be counted as match  
        var strAfterMatch = text.substring(bibleRef.lastIndex); // ":4" in the example
        var verses = match[3].match(/\d+/g); // [2, 3] in the example
        if (strAfterMatch.search(bibleRefExp('\\s*[{:}]{V}')) === 0 && verses.length > 1) {
          var realRef = trimLast(ref, bibleRefExp('[{,}{;}\\s]+' + verses[verses.length - 1]));
          bibleRef.lastIndex -= (ref.length - realRef.length);
          ref = realRef;
        }
        var book = match[1];
        if (book !== undefined || lastBook !== '') {
          var titleRef = book !== undefined ? ref : lastBook + ref;
          var link = document.createElement('a');
          link.setAttribute('ezra-ref', '載入中...(' + titleRef + ')');
          link.className = 'ezra-bible-ref-link';
          link.innerText = ref;
        }
        else {
          // if no book is provided (e.g. 4:11), there will be no link created
        }
        var strBeforeMatch = text.substring(lastIndex, match.index);
        linkifiedNodes.push(document.createTextNode(strBeforeMatch));
        linkifiedNodes.push(link || document.createTextNode(ref));
        lastBook = book || lastBook;
        lastIndex = bibleRef.lastIndex;
      }
      linkifiedNodes.push(document.createTextNode(text.substring(lastIndex)));
      return linkifiedNodes;
    };
    function trimLast(ref, regex) {
      // preconditions: at least one match
      var matches = ref.match(regex);
      var newIndex = ref.lastIndexOf(matches[matches.length - 1]);
      return ref.substring(0, newIndex);
    }

    /**
     * Creates a Bible reference by text.
     * @param {string} ref A Bible reference text.
     */
    this.readRef = function (ref) {
      // preconditions: ref must contains a full bible reference
      var match = bibleRefExp('({B})\\s?({C})[{S}]*({V})').exec(ref);
      if (match !== null) {
        return new BibleRef(
          abbrResolver.toAbbr(match[1]),
          chiNumParser.parse(match[2].replace(bibleRefExp('[{:}\\s]', 'g'), '')),
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
        .replace(bibleRefExp('[{-}]', 'g'), '-')
        .replace(bibleRefExp('[{,}]', 'g'), ',')
        .replace(bibleRefExp('[{VE}\\s]', 'g'), '');
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
        if (contiansExp(num)) {
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
    function contiansExp(num) {
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
    var refText = '(' + abbr + ' ' + chap + ':' + vers + ')';

    /**
     * Gets Bible text and attaches reference text at the end.
     * @param {function(string):void} success Callback for successfully getting bible text with reference attached.
     * @param {function(string):void} fail Callback for failed query, error message will be passed as argument.
     */
    this.getBibleTextWithRef = function (success, fail) {
      this.getBibleText(function (bibleText) {
        success(bibleText + refText);
      }, fail || success);
    };

    /**
     * Gets Bible text from cache if possible.
     */
    this.getBibleText = function (success, fail) {
      BibleRef.versesCache = BibleRef.versesCache || {};
      var cache = BibleRef.versesCache;
      if (cache.hasOwnProperty(refText)) {
        success(cache[refText]);
      } else {
        getBibleTextFromFHL(function (text) {
          cache[refText] = text;
          success(text);
        }, fail || success);
      }
    };

    /**
     * Gets Bible text using FHL API and passes result to callback.
     * @param {function(string):void} success Callback for successfully getting bible text.
     * @param {function(string):void} fail Callback for failed query, error message will be passed as argument.
     */
    var getBibleTextFromFHL = function (success, fail) {
      var xhr = new XMLHttpRequest();
      xhr.onerror = function () {
        fail('無法連上伺服器。');
      };
      try {
        xhr.open('GET', 'https://bible.fhl.net/json/qb.php?chineses=' + abbr + '&chap=' + chap + '&sec=' + vers, false);
        xhr.send();
        if (xhr.status !== 200) {
          fail('未能查訽經文: XHR status = ' + xhr.status);
          return;
        }
        try {
          var resp = JSON.parse(xhr.responseText);
          if (resp.status !== 'success') {
            fail('未能查訽經文: FHL response text = ' + xhr.responseText);
            return;
          } else if (resp.record.length === 0) {
            fail('找不到記錄！是不是聖經中沒有這章節' + refText + '？');
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
          fail('未能查訽經文: ' + err);
        }
      }
      catch (err) {
        fail('未能查訽經文: ' + err);
      }
    };
  }

  ezraLinkifier.lang = 'zh-hk';

  function AbbrResolver() {
    // traditional Chinese and simplified Chinese parser cannot exist at the same time,
    // because words like '出', '利', '伯' can both be traditional or simplified Chinese
    var abbr = {
      創世記: '創',
      出埃及記: '出',
      利未記: '利',
      民數記: '民',
      申命記: '申',
      約書亞記: '書',
      士師記: '士',
      路得記: '得',
      撒母耳記上: '撒上',
      撒母耳記下: '撒下',
      列王紀上: '王上',
      列王紀下: '王下',
      歷代志上: '代上',
      歷代志下: '代下',
      以斯拉記: '拉',
      尼希米記: '尼',
      以斯帖記: '斯',
      約伯記: '伯',
      詩篇: '詩',
      箴言: '箴',
      傳道書: '傳',
      雅歌: '歌',
      以賽亞書: '賽',
      耶利米書: '耶',
      耶利米哀歌: '哀',
      以西結書: '結',
      但以理書: '但',
      何西阿書: '何',
      約珥書: '珥',
      阿摩司書: '摩',
      俄巴底亞書: '俄',
      約拿書: '拿',
      彌迦書: '彌',
      那鴻書: '鴻',
      哈巴谷書: '哈',
      西番雅書: '番',
      哈該書: '該',
      撒迦利亞書: '亞',
      瑪拉基書: '瑪',
      馬太福音: '太',
      馬可福音: '可',
      路加福音: '路',
      約翰福音: '約',
      使徒行傳: '徒',
      羅馬書: '羅',
      哥林多前書: '林前',
      哥林多後書: '林後',
      加拉太書: '加',
      以弗所書: '弗',
      腓立比書: '腓',
      歌羅西書: '西',
      帖撒羅尼迦前書: '帖前',
      帖撒羅尼迦後書: '帖後',
      提摩太前書: '提前',
      提摩太後書: '提後',
      提多書: '多',
      腓利門書: '門',
      希伯來書: '來',
      雅各書: '雅',
      彼得前書: '彼前',
      彼得後書: '彼後',
      約翰壹書: '約一',
      約翰貳書: '約二',
      約翰參書: '約三',
      猶大書: '猶',
      啟示錄: '啟',

      哥前: '林前',
      哥後: '林後',
      歌前: '林前',
      歌後: '林後',
      希: '來',
      約翰一書: '約一',
      約翰二書: '約二',
      約翰三書: '約三',
      約壹: '約一',
      約貳: '約二',
      約參: '約三',
      啓示錄: '啟',
      啓: '啟',

      创: '創',
      书: '書',
      诗: '詩',
      传: '傳',
      赛: '賽',
      结: '結',
      弥: '彌',
      鸿: '鴻',
      该: '該',
      亚: '亞',
      玛: '瑪',
      约: '約',
      罗: '羅',
      林后: '林後',
      帖后: '帖後',
      提后: '提後',
      门: '門',
      来: '來',
      彼后: '彼後',
      约一: '約一',
      约二: '約二',
      约三: '約三',
      犹: '猶',
      启: '啟',

      哥后: '林後',
      歌后: '林後',
      约翰一书: '約一',
      约翰二书: '約二',
      约翰三书: '約三',
      约壹: '約一',
      约贰: '約二',
      约参: '約三'
    };
    var books = Object.keys(abbr);
    var descending = function (a, b) { return b.length - a.length; };
    // sort by length descending, such that match of "約" will not override "約一"
    var abbrs = books.map(function (book) { return abbr[book]; }).sort(descending);
    this.bibleBooks = books.concat(abbrs).join('|');
    this.toAbbr = function (book) { return abbr[book] || book; };
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