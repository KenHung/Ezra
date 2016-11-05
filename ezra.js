var bibleRefReader = new BibleRefReader(BIBLE_ABBR, CHINESE_NUM_VAL, CHINESE_EXP_VAL);
var bodyTextNodes = getTextNodesIn(document.body);
for (var i = 0; i < bodyTextNodes.length; i++) {
  var linkifiedHtml = bodyTextNodes[i].nodeValue.replace(
    new RegExp(bibleRefReader.pattern, 'g'), "<a href='#' title='載入中...($&)'>$&</a>");
  var linkifiedNodes = createNodes(linkifiedHtml);
  replaceWithNodes(bodyTextNodes[i], linkifiedNodes);
}

$(document).tooltip({
  open: function (event, ui) {
    if (typeof (event.originalEvent) === 'undefined') {
      return false;
    }
    // close any lingering tooltips
    var $id = $(ui.tooltip).attr('id');
    $('div.ui-tooltip').not('#' + $id).remove();

    var ref = new BibleRef($(ui.tooltip).text(), bibleRefReader);
    ref.getBibleText(function (text) {
      $(ui.tooltip).text(text);
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

function BibleRef(text, refReader) {
  var match = new RegExp(refReader.pattern).exec(text);
  var abbr = refReader.toAbbr(match[1]);
  var chap = refReader.toChap(match[2]);
  var vers = refReader.toVers(match[3]);
  this.getBibleText = function (callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        var resp = JSON.parse(xhr.responseText);
        if (resp.status === 'success') {
          var versesText = resp.record.map(r => r.bible_text).join('');
          var refText = '(' + abbr + ' ' + chap + ':' + vers + ')';
          callback(versesText + refText);
        }
      }
    };
    xhr.open("GET", 'https://bible.fhl.net/json/qb.php?chineses=' + abbr + '&chap=' + chap + '&sec=' + vers, true);
    xhr.send();
  }
}

function BibleRefReader(abbr, chiNumVal, chiExpVal) {
  var books = Object.keys(abbr);
  var abbrs = books.map(function (book) { return abbr[book]; });
  var bibleBooks = books.concat(abbrs).join('|');
  var chiNum = Object.keys(chiNumVal);
  var chiExp = Object.keys(chiExpVal);
  var chineseNums = chiNum.concat(chiExp).join();
  var lastAbbr;

  this.toAbbr = function (book) {
    var curAbbr = abbr[book];
    if (curAbbr === undefined) {
      curAbbr = abbrs.indexOf(book) >= 0 ? book : lastAbbr;
    }
    lastAbbr = curAbbr;
    return curAbbr;
  }
  this.toChap = function (num) {
    if (!isNaN(num)) {
      return +num;
    }
    else {
      var acc = [];
      for (var i in num) {
        var n = num[i];
        if (chiNum.indexOf(n) >= 0) {
          acc.push(chiNumVal[n]);
        }
        else if (chiExp.indexOf(n) >= 0) {
          if (acc.length === 0) {
            acc.push(1);
          }
          acc[acc.length - 1] *= chiExpVal[n];
        }
      }
      return acc.reduce((a, b) => a + b);
    }
  }
  this.toVers = function (vers) {
    return vers.replace(/─/g, '-')
      .replace(/、/g, ',')
      .replace(/ /g, '');
  }
  this.pattern = '(' + bibleBooks + '|，) ?([' + chineseNums + ']+|\\d+)[ :：︰]?([\\d-─,、 ]+)';
}