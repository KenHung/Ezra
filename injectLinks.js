var bibleBooks = books.concat(abbrs).join('|');
var chineseNums = chiNum.concat(chiExp).join();
var bibleRef = new RegExp('(' + bibleBooks + '|，) ?([' + chineseNums + ']+|\\d+)[ :：︰]?([\\d-─,、 ]+)', 'g');
var htmlWithLinks = $('body').html().replace(bibleRef, "<a href='#' title='載入中... ($1 $2:$3)'>$&</a>");
$('body').html(htmlWithLinks);

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