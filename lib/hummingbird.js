var request = require('request');
var qs = require('querystring');

var creds = require('../creds');
var config = require('./config');
var parser = require('./parser');

/**
 * Retrieves information about an anime as a JSON object.
 *
 * query:       string to search
 * callback:    takes the error, and data
 */
function search(query, callback) {
    request.get({
        uri: "https://" + config.HUMMINGBIRD_HOST_V1 + 
             config.HUMMINGBIRD_SEARCH + "?query=" + 
             parser.querify(query),
        headers: {
            'X-Mashape-Key': creds.HUMMINGBIRD_API_KEY,
            'Content-Type': "application/x-www-form-urlencoded"
        }
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
            callback(null, JSON.parse(body));
        }
    });
};

function searchTopResult(query, callback) {
    search(parser.querify(query), function(err, result) {
        if(err) {
            callback(err, result);
        }
        else {
            callback(null, result[0]);
        }
    });
};

function searchTopResultBySimilarity(query, callback) {
    search(parser.querify(query), function(err, result) {
        if(err) {
            callback(err, result);
        }
        else {
            var maxScore = 0;
            var maxIndex = 0;
            for(var i = 0; i < result.length; i++) {
                var thisScore = parser.getSimilarity(query, result[i].title);
                if(thisScore > maxScore) {
                    maxScore = thisScore;
                    maxIndex = i;
                }
            }
            callback(null, result[maxIndex]);
        }
    });
};

/**
 * Gets the user's authentication token. using the password
 * and either the username or email.
 *
 * emailOrUsername:     user's email or username
 * password:            user's password
 * callback:            takes the error, and data
 */
function authenticate(emailOrUsername, password, callback) {
    var postData = {
        'password': password
    };
    
    if(emailOrUsername.indexOf("@") == -1) {
        postData.username = emailOrUsername;
    }
    else {
        postData.email = emailOrUsername;
    }
    
    request.post({
        uri: "https://" + config.HUMMINGBIRD_HOST_V1 + 
             config.HUMMINGBIRD_AUTH,
        headers: {
            'X-Mashape-Key': creds.HUMMINGBIRD_API_KEY,
            'Content-Type': "application/x-www-form-urlencoded"
        },
        body: qs.stringify(postData)
    }, function(err, res, body) {
        if(err) {
            if(res) {
                callback("Request error: " + err + ", " + res.statusCode, body);
            }
            else {
                callback("Connection error: not connected to internet", body);
            }
        }
        else if(JSON.parse(body).error) {
            callback("Authentication error: " + JSON.parse(body).error, body);
        }
        else {
            callback(null, body.slice(1, -1));
        }
    });
};

function update(token, id, episode, callback) {
    var postData = {
        'episodes_watched': episode,
        'auth_token': token,
        'status': 'currently-watching'
    }
    request.post({
        uri: "https://" + config.HUMMINGBIRD_HOST_V1 + 
             config.HUMMINGBIRD_UPDATE + id,
        headers: {
            'X-Mashape-Key': creds.HUMMINGBIRD_API_KEY,
            'Content-Type': "application/x-www-form-urlencoded"
        },
        body: qs.stringify(postData)
    }, function(err, res, body) {
        if(err) {
            if(res) {
                callback("Request error: " + err + ", " + res.statusCode, body);
            }
            else {
                callback("Connection error: not connected to internet", body);
            }
        }
        else if(JSON.parse(body).error) {
            if(JSON.parse(body).error === "ActiveRecord::RecordNotFound") {
                callback("Couldn't find Anime with 'id'=" + id, body);
            }
            else {
                callback("Error: " + JSON.parse(body).error, body);
            }
        }
        else {
            callback(null, body);
        }
    });
};

exports.search = search;
exports.searchTopResult = searchTopResult;
exports.searchTopResultBySimilarity = searchTopResultBySimilarity;
exports.authenticate = authenticate;
exports.update = update;
