(function (ezraLinkifier, $, undefined) {
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
    $('.ezraBibleRefLink').tooltip({
      open: function (event, ui) {
        if (typeof (event.originalEvent) === 'undefined') {
          return false;
        }
        // close any lingering tooltips
        var thisTooltip = '#' + $(ui.tooltip).attr('id');
        $('div.ui-tooltip').not(thisTooltip).remove();

        var ref = bibleRefReader.readRef($(ui.tooltip).text());
        ref.getBibleText(function (bibleText) {
          $(ui.tooltip).html(
            bibleText
            + '<div class="ezraBibleRefSeperator"></div>'
            + '<div class="ezraBibleRefFooter"><a href="https://kenhung.github.io/Ezra/" target="_blank">Powered by Ezra</a></div>');
        });
      },
      close: function (event, ui) {
        // keep tooltip open on hover
        ui.tooltip.hover(
          function () {
            $(this).stop(true).fadeTo(400, 1);
          },
          function () {
            $(this).fadeOut('400', function () {
              $(this).remove();
            });
          }
        );
      },
    });
  };

  // added for unit testing
  ezraLinkifier._BibleRefReader = BibleRefReader;
  ezraLinkifier._AbbrResolver = AbbrResolver;
  ezraLinkifier._ChineseNumParser = ChineseNumParser;

  function BibleRefReader(versSep, booksSep) {
    var abbrResolver = new AbbrResolver();
    var chiNumParser = new ChineseNumParser();
    var refexp = function (exp) {
      return exp
        .replace('{B}', abbrResolver.bibleBooks)
        .replace('{C}', '[{CC}]+|\\d+\\s*[{:}]')
        .replace('{CC}', chiNumParser.supportedChars)
        .replace('{S}', '\\s篇章第')
        .replace('{:}', ':：︰')
        .replace('{V}', '[{,}{-}{VE}\\s\\d]+')
        .replace('{,}', versSep || ',，、和及')
        .replace('{-}', '\\-─–~～至')
        .replace('{VE}', '節节')
        .replace('{BS}', booksSep || ';；');
    };
    var fullRef = new RegExp(refexp('({B})([{CC}{:}{S}{,}{-}{BS}\\d]*\\d+[{VE}]?)'), 'g');
    var singleRef = new RegExp(refexp('(?:{B})?\\s?({C})[{S}]*({V})'), 'g');
    this.linkify = function (text) {
      var linkifiedHtml = text.replace(fullRef, function (refs, book, chapVers, offset, string) {
        return refs.replace(singleRef, function (ref, chap, vers, offset, string) {
          var startsWithBook = ref.substr(0, book.length) === book;
          var titleRef = startsWithBook ? ref : book + ref;
          return '<a title="載入中...(' + titleRef + ')" class="ezraBibleRefLink">' + ref + '</a>';
        })
      });
      return linkifiedHtml;
    };
    this.readRef = function (ref) {
      var match = new RegExp(refexp('({B})\\s?({C})[{S}]*({V})')).exec(ref);
      return new BibleRef(
        abbrResolver.toAbbr(match[1]),
        chiNumParser.parse(match[2].replace(new RegExp(refexp('[{:}\\s]'), 'g'), '')),
        this.readVers(match[3]));
    };
    this.readVers = function (vers) {
      return vers
        .replace(new RegExp(refexp('[{-}]'), 'g'), '-')
        .replace(new RegExp(refexp('[{,}]'), 'g'), ',')
        .replace(new RegExp(refexp('[{VE}\\s]'), 'g'), '');
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
          var sum = 0;
          for (var i = 0; i < num.length; i++) {
            var n = num[i];
            var val = (numVal[n] || 0) * Math.pow(10, num.length - 1 - i);
            sum += val;
          }
          return sum;
        }
      }
    };
    var contiansExp = function (num) {
      for (var i = 0; i < num.length; i++) {
        if (expVal[num[i]]) {
          return true;
        }
      }
      return false;
    };
    var isExp = function (num) { return expVal[num] ? true : false; };
    var sumOf = function (nums) {
      var sum = 0;
      for (var i = 0; i < nums.length; i++) {
        sum += nums[i];
      }
      return sum;
    };
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
        xhr.open("GET", 'https://bible.fhl.net/json/qb.php?chineses=' + abbr + '&chap=' + chap + '&sec=' + vers, true);
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
      腓利比書: '腓',
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
    var abbrs = books.map(function (book) { return abbr[book]; })
      .sort(function (a, b) { return b.length - a.length; });
    this.bibleBooks = books.concat(abbrs).join('|');
    this.toAbbr = function (book) { return abbr[book] || book; };
  }

  function getTextNodesIn(node, includeWhitespaceNodes) {
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
} (window.ezraLinkifier = window.ezraLinkifier || {}, jQuery));