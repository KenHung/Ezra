module.exports = {
  res: {},
  set: function (res) {
    for (var key in res) {
      if (res.hasOwnProperty(key)) {
        this[key] = res[key];
      }
    }
  },
  add: function (lang, res) {
    this.set(res);
    this.res[lang] = res;
  },
  setLang: function (lang) {
    var langRes = this.res[lang];
    this.set(langRes);
  }
};