var https = require('https');

var url = 'https://bible.fhl.net/json/qb.php?'
  + 'chineses=' + encodeURIComponent('約')
  + '&chap=3&sec=16&version=unv&gb=0';

var request = https.get(url, function (response) {
  var body = '';
  response.setEncoding('utf8');
  response.on('data', function (chunk) {
    body += chunk;
  });
  response.on('end', function () {
    if (response.statusCode < 200 || response.statusCode >= 300) {
      fail('HTTP status ' + response.statusCode);
      return;
    }

    var result;
    try {
      result = JSON.parse(body);
    }
    catch (error) {
      fail('Invalid JSON response: ' + error.message);
      return;
    }

    if (!result || result.status !== 'success' || result.version !== 'unv'
      || !Array.isArray(result.record) || result.record.length === 0) {
      fail('Unexpected API response: ' + (result && result.status));
      return;
    }

    var verse = result.record[0];
    if (!verse || verse.engs !== 'John' || verse.chap !== 3 || verse.sec !== 16
      || typeof verse.bible_text !== 'string'
      || verse.bible_text.indexOf('神愛世人') === -1) {
      fail('Unexpected verse content for John 3:16');
      return;
    }

    console.log('FHL API health check passed (John 3:16).');
  });
});

request.setTimeout(10000, function () {
  request.destroy(new Error('Request timed out after 10 seconds'));
});
request.on('error', function (error) {
  fail(error.message);
});

function fail(message) {
  console.error('FHL API health check failed: ' + message);
  process.exitCode = 1;
}
