var http = require('http');
var config = require('./config');
var creds = require('./creds');

function verify(username, password) {
    sendHttpRequest(config.MAL_VERIFY, username, password);
}

function search(query, username, password) {
    sendHttpRequest(config.MAL_SEARCH + query, username, password);
}

function sendHttpRequest(path, username, password) {
    var options = {
        host: config.MAL_HOST,
        path: path,
        headers: {
            'user-agent': config.MAL_API_KEY
        },
        auth: username + ':' + password
    };

    http.request(options, function(response) {
        response.pipe(process.stdout);
    }).end();
};

search('barakamon', creds.MAL_USERNAME, creds.MAL_PASSWORD);    // y'all need to watch this
