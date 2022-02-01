var bibleService = require('./bibleService');
var BibleRefReader = require('./bible-ref-detector');
var Resources = require('./lang/resources');

/**
 * Linkify all Bible references text within the DOM of the element.
 * @param {Element} element HTML element to be linkified.
 */
module.exports = function (element) {
  var bibleRefReader = new BibleRefReader();
  var dropFactory = new DropFactory();

  var textNodes = getTextNodesIn(element);
  for (var i = 0; i < textNodes.length; i++) {
    if (textNodes[i].parentNode.nodeName !== 'A') {
      var bibleRefs = bibleRefReader.detect(textNodes[i].nodeValue);
      if (bibleRefs.length > 0) {
        var linkifiedNodes = linkifyText(textNodes[i].nodeValue, bibleRefs);
        replaceWithNodes(textNodes[i], linkifiedNodes);
      }
    }
  }
  var ezraLinks = element.querySelectorAll('a[data-ezra-ref]');
  for (i = 0; i < ezraLinks.length; i++) {
    var link = ezraLinks[i];
    var bibleRef = JSON.parse(link.dataset.ezraRef);
    dropFactory.create(link, bibleRef);
  }
};

function DropFactory() {
  var Drop = require('./drop.js');
  var _Drop = Drop.createContext({
    classPrefix: 'ezra'
  });

  this.create = function (link, bibleRef) {
    var drop = new _Drop({
      classes: 'ezra-theme-arrows',
      target: link,
      content: document.createTextNode(Resources.loading + '...' + bibleRef.refText),
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

      var displayText = function (resp) {
        var text = resp.data || Resources[resp.errCode];
        drop.content.innerText = text;
        drop.position();
      };
      bibleService.getVerses(bibleRef, displayText);
    });
  };
}

function linkifyText(text, bibleRefs) {
  var linkifiedNodes = [];
  bibleRefs.sort(function (a, b) { return a.pos - b.pos; });
  while (bibleRefs.length > 0) {
    var bibleRef = bibleRefs.shift();
    var items = splitFirst(text, bibleRef.text);
    if (items[0]) {
      linkifiedNodes.push(document.createTextNode(items[0]));
    }
    linkifiedNodes.push(createLink(bibleRef));
    text = items[1];
  }
  if (text) {
    linkifiedNodes.push(document.createTextNode(text));
  }
  return linkifiedNodes;
}

function createLink(bibleRef) {
  var link = document.createElement('a');
  link.innerText = bibleRef.text;
  link.dataset.ezraRef = JSON.stringify(bibleRef);
  return link;
}

function splitFirst(str, sep) {
  var items = str.split(sep);
  return [items.shift(), items.join(sep)];
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
