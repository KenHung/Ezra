var resources = {
  res: {},
  setLang: function (lang) {
    var langRes = this.res[lang];
    for (var key in langRes) {
      this[key] = langRes[key];
    }
  },
  getLocalAbbr: function (abbr) {
    return this.localAbbr[abbr] || abbr;
  },
  refText: function (bibleRef) {
    return '(' + this.getLocalAbbr(bibleRef.abbr) + ' ' + bibleRef.refsStr + ')';
  }
};

addRes('zh-Hant', require('./resources/zh-Hant.json'));
addRes('zh-Hans', require('./resources/zh-Hans.json'));
resources.setLang('zh-Hant');

module.exports = resources;

function addRes(lang, res) {
  resources.res[lang] = res;
}
