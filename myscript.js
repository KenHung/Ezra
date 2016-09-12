var bodyHtml = document.body.innerHTML;
var patt = /創[1-9]/g;
console.log(bodyHtml.match(patt));

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    var resp = JSON.parse(xhr.responseText);
    console.log(resp.status);
    console.log(resp.record_count);
  }
}
xhr.open("GET", 'http://bible.fhl.net/json/ab.php', true);
xhr.send();