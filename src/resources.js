var resources = {
  res: {},
  set: function (res) {
    for (var key in res) {
      this[key] = res[key];
    }
  },
  setLang: function (lang) {
    var langRes = this.res[lang];
    this.set(langRes);
  },
  getLocalAbbr: function (abbr) {
    return this.localAbbr[abbr] || abbr;
  },
  refText: function (bibleRef) {
    return '(' + this.getLocalAbbr(bibleRef.abbr) + ' ' + bibleRef.chap + ':' + bibleRef.vers + ')';
  }
};

addRes('zh-Hant', require('./resources/zh-Hant.json'));
addRes('zh-Hans', require('./resources/zh-Hans.json'));

module.exports = resources;

function addRes(lang, res) {
  resources.set(res);
  resources.res[lang] = res;
}
