var http = require('http');
var request = require('request');
var qs = require('querystring');

var config = require('./config');
var creds = require('./creds');

function verify(username, password) {
    sendRequest(config.MAL_VERIFY, username, password);
}

function search(query, username, password) {
    sendRequest(config.MAL_SEARCH + query, username, password);
}

/**
 * Sends an HTTP GET request to the given MAL path, authenticating
 * with the given username and password.
 *
 * TODO refactor to use "request"
 */
function sendRequest(path, username, password) {
    var options = {
        host: config.MAL_HOST,
        path: path,
        headers: {
            'user-agent': config.MAL_API_KEY,
        },
        auth: username + ':' + password,
    };

    http.request(options, function(response) {
        response.pipe(process.stdout);
    }).end();
};

function updateList(id, episode, username, password) {
    var postData = { data: buildAnimeValuesXml(episode) };
    request.post({
        uri: "http://" + config.MAL_HOST + config.MAL_UPDATE + id + ".xml",
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify(postData)
    }, function(err, res, body){
        if(err || res.statusCode != 200 || body != "Updated") {
            console.log("An error occurred while updating your list.");
        }
        else {
            console.log("List successfully updated!");
        }
    }).auth(username, password, false);
}

function buildAnimeValuesXml(episode) {
    return '<?xml version="1.0" encoding="UTF-8"?><entry><episode>' + 
        episode + '</episode></entry>';
}

search('barakamon', creds.MAL_USERNAME, creds.MAL_PASSWORD);    // y'all need to watch this
updateList(22, 0, creds.MAL_USERNAME, creds.MAL_PASSWORD);
