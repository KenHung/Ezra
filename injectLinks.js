var bodyHtml = document.body.innerHTML;

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

var bibleBooks = books.concat(abbrs).join('|');
var chineseNums = chiNum.concat(chiExp).join();
var bibleRef = new RegExp('(' + bibleBooks + '|，) ?([' + chineseNums + ']+|\\d+)[ :：︰]?([\\d-─,、 ]+)', 'g');
var match;
while ((match = bibleRef.exec(bodyHtml)) !== null) {
  console.log(match[0] + toAbbr(match[1]) + toChap(match[2]));
}

function getVerses(book, chap, verses) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      var resp = JSON.parse(xhr.responseText);
      if (resp.status === 'success') {
        console.log(resp.record[0]);
      }
    }
  };
  xhr.open("GET", 'https://bible.fhl.net/json/qb.php?chineses=' + book + '&chap=' + chap + '&sec=' + verses, true);
  xhr.send();
}
getVerses('約', 3, 16);