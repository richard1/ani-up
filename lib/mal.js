var request = require('request');
var qs = require('querystring');
var xml2js = require('xml2js');

var creds = require('../creds');
var config = require('./config');

function verify(username, password, callback) {
    request.get({
        uri: "http://" + config.MAL_HOST + config.MAL_VERIFY,
        headers: {
            'user-agent': creds.MAL_API_KEY
        },
    }, function(err, res, body) {
        if(err) {
            if(res) {
                callback("Request error: " + err + ", " + res.statusCode, body);
            }
            else {
                callback("Connection error: not connected to internet", body);
            }
        }
        else if(body === 'Invalid credentials') {
            callback("Authentication error: " + body, body);
        }
        else {
            xml2js.parseString(body, function(err, result) {
                if(err) {
                    callback("XML parse error: " + err + "\n" + body, body);
                }
                else {
                    callback(null, result.user);
                }
            });
        }
    }).auth(username, password, false);
};

function search(query, username, password, callback) {
    request.get({
        uri: "http://" + config.MAL_HOST + config.MAL_SEARCH + query,
        headers: {
            'user-agent': creds.MAL_API_KEY
        },
    }, function(err, res, body) {
        if(err) {
            if(res) {
                callback("Request error: " + err + ", " + res.statusCode, body);
            }
            else {
                callback("Connection error: not connected to internet", body);
            }
        }
        else if(body === 'Invalid credentials') {
            callback("Authentication error: " + body, body);
        }
        else if(body === 'No results') {
            callback(null, null);
        }
        else {
            xml2js.parseString(body, function(err, result) {
                if(err) {
                    callback("XML parse error: " + err + "\n" + body, body);
                }
                else {
                    callback(null, result.anime.entry);
                }
            });
        }
    }).auth(username, password, false);
};

function update(id, episode, username, password, callback) {
    var postData = { data: buildAnimeValuesXml(episode) };
    request.post({
        uri: "http://" + config.MAL_HOST + config.MAL_UPDATE + id + ".xml",
        headers: {
            'user-agent': creds.MAL_API_KEY,
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify(postData)
    }, function(err, res, body){
        if(err) {
            if(res) {
                callback("Request error: " + err + ", " + res.statusCode, body);
            }
            else {
                callback("Connection error: not connected to internet", body);
            }
        }
        else if(res.statusCode === 401) {
            callback("Authentication error: " + body, body);
        }
        else if(res.statusCode != 200 || body != "Updated") {
            callback("Update error: " + err + ", " + res.statusCode, body);
        }
        else {
            callback(null, {
                'body': body, 
                'id': id, 
                'episode': episode
            });
        }
    }).auth(username, password, false);
}

function add(id, episode, username, password, callback) {
    var postData = { data: buildAnimeValuesXml(episode) };
    request.post({
        uri: "http://" + config.MAL_HOST + config.MAL_ADD + id + ".xml",
        headers: {
            'user-agent': creds.MAL_API_KEY,
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify(postData)
    }, function(err, res, body){
        if(err) {
            if(res) {
                callback("Request error: " + err + ", " + res.statusCode, body);
            }
            else {
                callback("Connection error: not connected to internet", body);
            }
        }
        else if(res.statusCode === 201) {
            callback(null, {
                'body': body, 
                'id': id, 
                'episode': episode
            });
        }
        else if(res.statusCode === 501 && body === 'This anime is already on your list.') {
            update(id, episode, username, password, callback);
        }
        else if(res.statusCode === 401) {
            callback("Authentication error: " + body, body);
        }
        else {
            callback("Update error: " + err + ", " + res.statusCode, body);
        }
    }).auth(username, password, false);
}

function buildAnimeValuesXml(episode) {
    return '<?xml version="1.0" encoding="UTF-8"?><entry><episode>' + 
        episode + '</episode><status>watching</status></entry>';
}

exports.verify = verify;
exports.search = search;
exports.update = update;
exports.add = add;
