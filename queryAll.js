var bibleTextList = document.getElementById('bibleTextList');

function updateVersesList() {
    var contents = document.getElementById('input').value;
    var bibleBooks = books.concat(abbrs).join('|');
    var chineseNums = chiNum.concat(chiExp).join('');
    var bibleRef = new RegExp('(' + bibleBooks + '|，) ?([' + chineseNums + ']+|\\d+)[ :：︰]?([\\d-─,、 ]+)', 'g');
    var match;
    bibleTextList.innerHTML = '';
    while ((match = bibleRef.exec(contents)) !== null) {
        addVerses(toAbbr(match[1]), toChap(match[2]), toVers(match[3]));
    }
}

function addVerses(abbr, chap, verses) {
    var xhr = new XMLHttpRequest();
    var newItem = document.createElement("li");
    bibleTextList.appendChild(newItem);
    xhr.onload = function () {
        if (xhr.status == 200) {
            var resp = JSON.parse(xhr.responseText);
            if (resp.status === 'success') {
                var versesText = resp.record.map(r => r.bible_text).join('');
                var versesRef = '(' + abbr + ' ' + chap + ':' + verses + ')';
                newItem.appendChild(document.createTextNode(versesText + versesRef));
            }
        }
    };
    xhr.open("GET", 'https://bible.fhl.net/json/qb.php?chineses=' + abbr + '&chap=' + chap + '&sec=' + verses, true);
    xhr.send();
}