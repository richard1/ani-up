var request = require('request');
var qs = require('querystring');
var creds = require('./creds');
var config = require('./config');

function verify(username, password) {
    sendRequest(config.MAL_VERIFY, username, password);
}

function search(query, username, password) {
    sendRequest(config.MAL_SEARCH + query, username, password);
}

/**
 * Sends an HTTP GET request to the given MAL path, authenticating
 * with the given username and password.
 */
function sendRequest(path, username, password) {
    request.get({
        uri: "http://" + config.MAL_HOST + path,
        headers: {
            'user-agent': creds.MAL_API_KEY
        },
    }, function(err, res, body) {
        if(err) {
            console.log("An error occurred while making the request.");
            console.log(err + ", " + res.statusCode);
        }
        else {
            console.log(body);
        }
    }).auth(username, password, false);
};

function updateList(id, episode, username, password) {
    var postData = { data: buildAnimeValuesXml(episode) };
    request.post({
        uri: "http://" + config.MAL_HOST + config.MAL_UPDATE + id + ".xml",
        headers: {
            'user-agent': creds.MAL_API_KEY,
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

exports.verify = verify;
exports.search = search;
exports.updateList = updateList;
