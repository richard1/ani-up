var http = require('http');
var config = require('./config');

console.log(config.MAL_API_KEY);

var options = {
  host: 'myanimelist.net',
  path: '/api/anime/search.xml?q=madoka',
  headers: {
      'user-agent': config.MAL_API_KEY
  },
  auth: config.MAL_USERNAME + ':' + config.MAL_PASSWORD
};

callback = function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();
