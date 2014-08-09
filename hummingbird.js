var request = require('request');
var qs = require('querystring');

var creds = require('./creds');
var config = require('./config');

/**
 * Retrieves information about an anime as a JSON object.
 *
 * id: anime ID or slug (e.g. 'steins-gate' or 5646)
 */
function search(id) {
    request.get({
        uri: "https://" + config.HUMMINGBIRD_HOST_V2 + 
             config.HUMMINGBIRD_SEARCH + id,
        headers: {
            'X-Mashape-Key': creds.HUMMINGBIRD_API_KEY,
            'Content-Type': "application/x-www-form-urlencoded"
        },
    }, function(err, res, body) {
        if(err) {
            console.log("Error: " + err);
        }
        else {
            console.log(JSON.parse(body));
        }
    });
};

/**
 * Gets the user's authentication token. using the password
 * and either the username or email.
 */
function authenticate(emailOrUsername, password) {
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
            console.log("An error occurred while making the request: " + res.statusCode);
        }
        else if(JSON.parse(body).error) {
            console.log("Authentication error: " + JSON.parse(body).error);
        }
        else {
            console.log(body);
        }
    });
}

exports.search = search;
exports.authenticate = authenticate;
