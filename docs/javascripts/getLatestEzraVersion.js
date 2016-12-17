function getLatestEzraVersion(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var resp = JSON.parse(xhr.responseText);
        var latest = resp.tag_name;
        callback(latest);
    };
    xhr.open('GET', 'https://api.github.com/repos/KenHung/Ezra/releases/latest');
    xhr.send();
}