var http = require('http');
var config = require('./config');
var creds = require('./creds');

var options = {
  host: config.MAL_HOST,
  path: config.MAL_SEARCH + 'madoka',
  headers: {
      'user-agent': creds.MAL_API_KEY
  },
  auth: creds.MAL_USERNAME + ':' + creds.MAL_PASSWORD
};

http.request(options, function(response) {
  response.pipe(process.stdout);
}).end();
