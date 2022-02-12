var bibleService = require('./bible-service');
var detectBibleRef = require('./bible-ref-detector');
var resources = require('./resources');
var Drop = require('tether-drop');

/**
 * Linkify all Bible references text within the DOM of the element.
 * @param {Element} element HTML element to be linkified.
 */
module.exports = function (element) {
  var textNodes = getTextNodesIn(element);
  for (var i = 0; i < textNodes.length; i++) {
    if (textNodes[i].parentNode.nodeName !== 'A') {
      var bibleRefs = detectBibleRef(textNodes[i].nodeValue);
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
    createDrop(link, bibleRef);
  }
};

var _Drop = Drop.createContext({
  classPrefix: 'ezra'
});

function createDrop(link, bibleRef) {
  var initText = resources.loading + '...' + resources.refText(bibleRef);
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
    var displayText = function (resp) {
      var text = resp.data || resources[resp.errCode];
      drop.content.innerText = text;
      drop.position();
    };
    bibleService.getVerses(bibleRef, displayText);
  });
}

function linkifyText(text, bibleRefs) {
  var linkifiedNodes = [];
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
