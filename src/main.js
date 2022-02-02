var resources = require('./resources');

(function (ezraLinkifier, undefined) {
  ezraLinkifier.linkify = require('./ezra');
  ezraLinkifier.setLang = function (lang) {
    resources.setLang(lang);
  };
}(window.ezraLinkifier = window.ezraLinkifier || {}));
