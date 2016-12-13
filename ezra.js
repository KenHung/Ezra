(function (ezraLinkifier, undefined) {
  ezraLinkifier.linkify = function (element) {
    var bibleRefReader = new BibleRefReader();
    var textNodes = getTextNodesIn(element);
    for (var i = 0; i < textNodes.length; i++) {
      if (textNodes[i].parentNode.nodeName !== 'A') {
        var linkifiedHtml = bibleRefReader.linkify(textNodes[i].nodeValue);
        var linkified = linkifiedHtml.length > textNodes[i].nodeValue.length;
        if (linkified) {
          var linkifiedNodes = createNodes(linkifiedHtml);
          replaceWithNodes(textNodes[i], linkifiedNodes);
        }
      }
    }
    var _Drop = Drop.createContext({
      classPrefix: 'ezra'
    });
    var ezraLinks = element.querySelectorAll('.ezraBibleRefLink');
    for (var i = 0; i < ezraLinks.length; i++) {
      var link = ezraLinks[i];
      var d = new _Drop({
        classes: 'ezra-theme-arrows',
        target: link,
        content: link.getAttribute('title'),
        openOn: 'hover',
        constrainToScrollParent: false,
        tetherOptions: {
          constraints: [
            {
              to: 'window',
              attachment: 'together',
              pin: true
            }
          ]
        }
      });
      d.on('open', function () {
        var ref = bibleRefReader.readRef(this.content.innerText);
        var drop = this;
        ref.getBibleText(function (bibleText) {
          drop.content.innerHTML = bibleText
            + '<div class="ezraBibleRefSeperator"></div>'
            + '<div class="ezraBibleRefFooter"><a href="https://kenhung.github.io/Ezra/" target="_blank">Powered by Ezra</a></div>';
          drop.position();
        });
      });
    }
  };

  // added for unit testing
  ezraLinkifier._BibleRefReader = BibleRefReader;
  ezraLinkifier._AbbrResolver = AbbrResolver;
  ezraLinkifier._ChineseNumParser = ChineseNumParser;

  function BibleRefReader() {
    var abbrResolver = new AbbrResolver();
    var chiNumParser = new ChineseNumParser();
    function bibleRefExp(exp, flags) {
      return new RegExp(exp
        .replace('{B}', abbrResolver.bibleBooks)
        .replace('{C}', '[' + chiNumParser.supportedChars + ']+|\\d+\\s*[{:}]')
        .replace('{S}', '\\s{:}篇章第')
        .replace('{V}', '[{,}{-}{;}{VE}\\s\\d]*\\d')
        .replace(/{:}/g, ':：︰')
        .replace('{,}', ',，、和及')
        .replace('{-}', '\\-─–~～至')
        .replace(/{VE}/g, '節节')
        .replace(/{;}/g, ';；'), flags || '');
    }
    var bibleRef = bibleRefExp('({B})?\\s?({C})[{S}]*({V})[{VE}]?', 'g');
    this.linkify = function (text) {
      // different bible referance formats are handled: 約1:1 約1:1,2 約1:1;2 約1:2,3:4 約1:2;3:4
      var linkifiedHtml = '';
      var match;
      var lastBook = '';
      var lastIndex = 0;
      while ((match = bibleRef.exec(text)) !== null) {
        var ref = match[0];
        // check if verses accidently matched the next bilble reference
        // for referances like "約1:2,3:4", the match is "約1:2,3", the ",3" should not be counted as match  
        var strAfterMatch = text.substring(bibleRef.lastIndex); // ":4" in the example
        var verses = match[3].match(/\d+/g); // [2, 3] in the example
        if (strAfterMatch.search(bibleRefExp('\\s*[{:}]{V}')) === 0 && verses.length > 1) {
          var realRef = trimLast(ref, bibleRefExp('[{,}{;}\\s]+' + verses[verses.length - 1]));
          bibleRef.lastIndex -= (ref.length - realRef.length);
          ref = realRef;
        }
        var book = match[1];
        var link = '';
        if (book !== undefined || lastBook !== '') {
          var titleRef = book !== undefined ? ref : lastBook + ref;
          link = '<a title="載入中...(' + titleRef + ')" class="ezraBibleRefLink">' + ref + '</a>';
        }
        var strBeforeMatch = text.substring(lastIndex, match.index);
        linkifiedHtml += strBeforeMatch + link || ref;
        lastBook = book || lastBook;
        lastIndex = bibleRef.lastIndex;
      }
      linkifiedHtml += text.substring(lastIndex);
      return linkifiedHtml;
    };
    function trimLast(ref, regex) {
      // preconditions: at least one match
      var matches = ref.match(regex);
      var newIndex = ref.lastIndexOf(matches[matches.length - 1]);
      return ref.substring(0, newIndex);
    }
    this.readRef = function (ref) {
      // preconditions: ref must contains a full bible referance
      var match = bibleRefExp('({B})\\s?({C})[{S}]*({V})').exec(ref);
      return new BibleRef(
        abbrResolver.toAbbr(match[1]),
        chiNumParser.parse(match[2].replace(bibleRefExp('[{:}\\s]', 'g'), '')),
        this.readVers(match[3]));
    };
    this.readVers = function (vers) {
      return vers
        .replace(bibleRefExp('[{-}]', 'g'), '-')
        .replace(bibleRefExp('[{,}]', 'g'), ',')
        .replace(bibleRefExp('[{VE}\\s]', 'g'), '');
    };
  }

  function ChineseNumParser() {
    var numVal = { 零: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
    var expVal = { 十: 10, 廿: 20, 卅: 30, 卌: 40, 百: 100 };
    var nums = Object.keys(numVal);
    var exps = Object.keys(expVal);
    this.supportedChars = nums.concat(exps).join('');
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

  function BibleRef(abbr, chap, vers) {
    this.abbr = abbr;
    this.chap = chap;
    this.vers = vers;
    var refText = '(' + abbr + ' ' + chap + ':' + vers + ')';
    this.getBibleText = function (callback) {
      BibleRef.versesCache = BibleRef.versesCache || {};
      var cache = BibleRef.versesCache;
      if (cache.hasOwnProperty(refText)) {
        callback(cache[refText]);
      } else {
        getBibleTextFromFHL(function (text) {
          cache[refText] = text;
          callback(text);
        }, callback);
      }
    };
    var getBibleTextFromFHL = function (success, fail) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
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
            if (i > 0 && record.sec > lastSec + 1) {
              versesText += '⋯⋯';
            }
            lastSec = record.sec;
            versesText += record.bible_text;
          }
          success(versesText + refText);
        } catch (err) {
          fail('未能查訽經文: ' + err);
        }
      };
      try {
        xhr.open('GET', 'https://bible.fhl.net/json/qb.php?chineses=' + abbr + '&chap=' + chap + '&sec=' + vers, true);
        xhr.send();
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

  function getTextNodesIn(node) {
    var textNodes = [];
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

  function createNodes(html) {
    // assuming html containing only text nodes and anchor, so it is safe to put it in div
    var dummy = document.createElement('div');
    dummy.innerHTML = html;
    return dummy.childNodes;
  }

  function replaceWithNodes(oldNode, newNodes) {
    for (var i = newNodes.length - 1; i > 0; i--) {
      oldNode.parentNode.insertBefore(newNodes[i], oldNode.nextSibling);
    }
    oldNode.parentNode.replaceChild(newNodes[0], oldNode);
  }
} (window.ezraLinkifier = window.ezraLinkifier || {}));