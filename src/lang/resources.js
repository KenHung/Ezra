/* exported Resources */
var Resources = {
  res: {},
  set: function (res) {
    for (var key in res) {
      if (res.hasOwnProperty(key)) {
        this[key] = res[key];
      }
    }
    // traditional Chinese and simplified Chinese parser cannot exist at the same time,
    // because words like '出', '利', '伯' can both be traditional or simplified Chinese
    var books = Object.keys(this.abbr);
    // remove /[一二三]/ to avoid mismatch with '約一', '約二', '約三'
    var abbrs = Object.values(this.abbr).filter(function (abbr) { return !abbr.match(/[一二三]/); });
    this.namesOfAllBooks = books.concat(abbrs).join('|');
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