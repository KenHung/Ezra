var bibleService = require('./bibleService.js');
var BibleRefReader = require('./bibleRefReader');
var Resources = require('./lang/resources.js');

Resources.add('zh-Hans', require('./lang/zh-Hans.js'));
Resources.add('zh-Hant', require('./lang/zh-Hant.js'));

/**
 * Linkify all Bible references text within the DOM of the element.
 * @param {Element} element HTML element to be linkified.
 */
exports.linkify = function (element) {
  var bibleRefReader = new BibleRefReader(element.ownerDocument);
  var dropFactory = new DropFactory(element.ownerDocument, bibleRefReader);

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

function DropFactory(document, bibleRefReader) {
  var Drop = require('./drop.js');
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
