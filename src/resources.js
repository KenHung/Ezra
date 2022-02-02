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
  }
};

addRes('zh-Hant', require('./resources/zh-Hant.json'));
addRes('zh-Hans', require('./resources/zh-Hans.json'));

module.exports = resources;

function addRes(lang, res) {
  resources.set(res);
  resources.res[lang] = res;
}
