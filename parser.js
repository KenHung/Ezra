var abbr = {
    創世記: '創',
    出埃及記: '出',
    利未記: '利',
    民數記: '民',
    申命記: '申',
    約書亞記: '書',
    士師記: '士',
    路得記: '得',
    撒母耳記上: '撒上',
    撒母耳記下: '撒下',
    列王紀上: '王上',
    列王紀下: '王下',
    歷代志上: '代上',
    歷代志下: '代下',
    以斯拉記: '拉',
    尼希米記: '尼',
    以斯帖記: '斯',
    約伯記: '伯',
    詩篇: '詩',
    箴言: '箴',
    傳道書: '傳',
    雅歌: '歌',
    以賽亞書: '賽',
    耶利米書: '耶',
    耶利米哀歌: '哀',
    以西結書: '結',
    但以理書: '但',
    何西阿書: '何',
    約珥書: '珥',
    阿摩司書: '摩',
    俄巴底亞書: '俄',
    約拿書: '拿',
    彌迦書: '彌',
    那鴻書: '鴻',
    哈巴谷書: '哈',
    西番雅書: '番',
    哈該書: '該',
    撒迦利亞書: '亞',
    瑪拉基書: '瑪',
    馬太福音: '太',
    馬可福音: '可',
    路加福音: '路',
    約翰福音: '約',
    使徒行傳: '徒',
    羅馬書: '羅',
    哥林多前書: '林前',
    哥林多後書: '林後',
    加拉太書: '加',
    以弗所書: '弗',
    腓利比書: '腓',
    歌羅西書: '西',
    帖撒羅尼迦前書: '帖前',
    帖撒羅尼迦後書: '帖後',
    提摩太前書: '提前',
    提摩太後書: '提後',
    提多書: '多',
    腓利門書: '門',
    希伯來書: '來',
    雅各書: '雅',
    彼得前書: '彼前',
    彼得後書: '彼後',
    約翰壹書: '約一',
    約翰貳書: '約二',
    約翰參書: '約三',
    猶大書: '猶',
    啟示錄: '啟',

    約翰一書: '約一',
    約翰二書: '約二',
    約翰三書: '約三',
    啓示錄: '啟'
};

var books = Object.keys(abbr);
var abbrs = books.map(function (book) { return abbr[book]; });

var lastAbbr;
function toAbbr(book) {
    var curAbbr = abbr[book];
    if (curAbbr === undefined) {
        curAbbr = abbrs.indexOf(book) >= 0 ? book : lastAbbr;
    }
    lastAbbr = curAbbr;
    return curAbbr;
}

var chiNumVal = { 零: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
var chiExpVal = { 十: 10, 廿: 20, 卅: 30, 百: 100 };
var chiNum = Object.keys(chiNumVal);
var chiExp = Object.keys(chiExpVal);

function toChap(num) {
  if (!isNaN(num)) {
    return +num;
  }
  else {
    var acc = [];
    for (var n in num) {
      if (chiNum.indexOf(n) >= 0) {
        acc.push(chiNumVal[n]);
      }
      else if (chiExp.indexOf(n) >= 0) {
        if (acc.length === 0) {
          acc.push(1);
          acc[acc.length - 1] *= chiExpVal[n];
        }
      }
    }
    return acc.reduce((a, b) => a + b);
  }
}