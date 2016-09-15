var bodyHtml = document.body.innerHTML;
var bibleBooks = books.concat(abbrs).join('|');
var bibleRef = new RegExp('(' + bibleBooks + '|，) ?([一二三四五六七八九十廿卅]+|\\d+)[ :：︰]?([\\d-─,、 ]+)', 'g');
var match;
while ((match = bibleRef.exec(bodyHtml)) !== null) {
  console.log(match);
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