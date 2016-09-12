var bodyHtml = document.body.innerHTML;
var bibleBooks = '創世記|出埃及記|利未記|民數記|申命記|\
約書亞記|士師記|路得記|撒母耳記[上下]|列王紀[上下]|歷代志[上下]|以斯拉記|尼希米記|以斯帖記|\
約伯記|詩篇|箴言|傳道書|雅歌|以賽亞書|耶利米書|耶利米哀歌|以西結書|但以理書|\
何西阿書|約珥書|阿摩司書|俄巴底亞書|約拿書|彌迦書|那鴻書|哈巴谷書|西番雅書|哈該書|撒迦利亞書|瑪拉基書|\
馬太福音|馬可福音|路加福音|約翰福音|使徒行傳|\
羅馬書|哥林多[前後]書|加拉太書|以弗所書|腓利比書|歌羅西書|帖撒羅尼迦[前後]書|提摩太[前後]書|提多書|腓利門書|\
希伯來書|雅各書|彼得[前後]書|約翰[壹貳參一二三]書|猶大書|啟示錄|\
創|出|利|民|申|士|得|撒[上下]|王[上下]|代[上下]|拉|尼|斯|伯|詩|箴|傳|歌|賽|耶|哀|結|但|何|珥|摩|俄|拿|彌|鴻|哈|番|該|亞|瑪|\
太|可|路|約|徒|羅|林[前後]|加|弗|腓|西|帖[前後]|提[前後]|多|門|來|雅|彼[前後]|約[一二三]|猶|啟';
var patt = new RegExp('(' + bibleBooks + '|，) ?([一二三四五六七八九十廿卅]+|\\d+)[ :：︰]?([\\d-─,、 ]+)', 'g');
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