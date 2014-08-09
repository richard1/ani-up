var http = require('http');
var config = require('./config');

var options = {
  host: 'myanimelist.net',
  path: '/api/anime/search.xml?q=madoka',
  headers: {
      'user-agent': config.MAL_API_KEY
  },
  auth: config.MAL_USERNAME + ':' + config.MAL_PASSWORD
};

http.request(options, function(response) {
  response.pipe(process.stdout);
}).end();
