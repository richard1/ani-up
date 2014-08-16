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
    buildAnimeValuesXml(id, episode, function(xml, watchStatus) {
        var postData = { 'data': xml };
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
                    'episode': episode,
                    'status': watchStatus
                });
            }
        }).auth(username, password, false);
    });
}

function add(id, episode, username, password, callback) {
    buildAnimeValuesXml(id, episode, function(xml, watchStatus) {
        var postData = { 'data': xml };
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
                    'episode': episode,
                    'status': watchStatus
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
    });
}

function buildAnimeValuesXml(id, episode, callback) {
    var xml = '<?xml version="1.0" encoding="UTF-8"?><entry><episode>' + 
              episode + '</episode>';
    getTotalEpisodes(id, function(err, totalEps) {
        if(err) {
            xml += '<status>watching</status>' + '</entry>';
            callback(xml, 'Watching');
        }
        else {
            if(episode >= totalEps) {
                xml += '<status>completed</status>' + '</entry>';
                callback(xml, 'Completed');
            }
            else {
                xml += '<status>watching</status>' + '</entry>';
                callback(xml, 'Watching');
            }
        }
    });
}

function getTotalEpisodes(id, callback) {
    request.get({
        uri: "http://" + config.MAL_HOST + config.MAL_ANIME + id,
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
        else {
            // scrape the page for episode count
            callback(null, body.match(/(Episodes:<\/span>\s)(\d+)/g)[0].match(/\d+/g)[0]);
        }
    });
};


exports.verify = verify;
exports.search = search;
exports.update = update;
exports.add = add;
