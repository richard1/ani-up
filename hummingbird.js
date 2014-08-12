var request = require('request');
var qs = require('querystring');

var creds = require('./creds');
var config = require('./config');

/**
 * Retrieves information about an anime as a JSON object.
 *
 * query:       string to search
 * callback:    takes the error, and data
 */
function search(query, callback) {
    request.get({
        uri: "https://" + config.HUMMINGBIRD_HOST_V1 + 
             config.HUMMINGBIRD_SEARCH + "?query=" + query,
        headers: {
            'X-Mashape-Key': creds.HUMMINGBIRD_API_KEY,
            'Content-Type': "application/x-www-form-urlencoded"
        }
    }, function(err, res, body) {
        if(err) {
            callback("Request error: " + err + ", " + res.statusCode, body);
        }
        else {
            callback(null, JSON.parse(body));
        }
    });
};

function searchTopResult(query, callback) {
    search(query, function(err, result) {
        if(err) {
            callback(err);
        }
        else {
            callback(null, result[0]);
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
            callback("Request error: " + err + ", " + res.statusCode, body);
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
            callback("Request error: " + err + ", " + res.statusCode, body);
        }
        else if(JSON.parse(body).error) {
            callback("Error: " + JSON.parse(body), body);
        }
        else {
            callback(null, body);
        }
    });
};

        

exports.search = search;
exports.searchTopResult = searchTopResult;
exports.authenticate = authenticate;
exports.update = update;
