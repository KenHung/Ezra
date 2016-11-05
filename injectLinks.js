var bibleBooks = books.concat(abbrs).join('|');
var chineseNums = chiNum.concat(chiExp).join();
var bibleRef = new RegExp('(' + bibleBooks + '|，) ?([' + chineseNums + ']+|\\d+)[ :：︰]?([\\d-─,、 ]+)', 'g');

var bodyTextNodes = getTextNodesIn(document.body);
for (var i = 0; i < bodyTextNodes.length; i++) {
  var ezraNodes = createNodes(
    bodyTextNodes[i].nodeValue.replace(bibleRef, "<a href='#' title='載入中... ($1 $2:$3)'>$&</a>"));
  replaceWithNodes(bodyTextNodes[i], ezraNodes);
}

$(document).tooltip({
  content: function () {
    return $(this).prop('title');
  },
  open: function (event, ui) {
    if (typeof (event.originalEvent) === 'undefined') {
      return false;
    }
    // close any lingering tooltips
    var $id = $(ui.tooltip).attr('id');
    $('div.ui-tooltip').not('#' + $id).remove();
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
  }
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

function getVerses(book, chap, verses) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      var resp = JSON.parse(xhr.responseText);
      if (resp.status === 'success') {
        console.log(resp.record[0]);
      }
    }
  };
  xhr.open("GET", 'https://bible.fhl.net/json/qb.php?chineses=' + book + '&chap=' + chap + '&sec=' + verses, true);
  xhr.send();
}