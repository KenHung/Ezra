var bibleBooks = books.concat(abbrs).join('|');
var chineseNums = chiNum.concat(chiExp).join();
var bibleRef = new RegExp('(' + bibleBooks + '|，) ?([' + chineseNums + ']+|\\d+)[ :：︰]?([\\d-─,、 ]+)', 'g');

var bodyTextNodes = getTextNodesIn(document.body);
for (var i = 0; i < bodyTextNodes.length; i++) {
  var ezraHtml = bodyTextNodes[i].nodeValue.replace(bibleRef, "<a href='#' title='$1:$2:$3'>$&</a>");
  var ezraNodes = createNodes(ezraHtml);
  replaceWithNodes(bodyTextNodes[i], ezraNodes);
}

$(document).tooltip({
  open: function (event, ui) {
    if (typeof (event.originalEvent) === 'undefined') {
      return false;
    }
    // close any lingering tooltips
    var $id = $(ui.tooltip).attr('id');
    $('div.ui-tooltip').not('#' + $id).remove();

    getVersesText($(ui.tooltip).text(), function(text) {
      $(ui.tooltip).text(text);
    })
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

function getVersesText(versesRef, callback) {
  var refData = versesRef.split(':');
  var abbr = refData[0];
  var chap = refData[1];
  var verses = refData[2];
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      var resp = JSON.parse(xhr.responseText);
      if (resp.status === 'success') {
        var versesText = resp.record.map(r => r.bible_text).join('');
        var versesRef = '(' + abbr + ' ' + chap + ':' + verses + ')';
        callback(versesText + versesRef);
      }
    }
  };
  xhr.open("GET", 'https://bible.fhl.net/json/qb.php?chineses=' + abbr + '&chap=' + chap + '&sec=' + verses, true);
  xhr.send();
}