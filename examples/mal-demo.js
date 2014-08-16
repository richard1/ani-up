var aniup = require('../');
var mal = aniup.mal;

var creds = require('../creds');

var query = process.argv[2] ? process.argv[2] : 'barakamon';

function search(callback) {
    mal.search(query, creds.MAL_USERNAME, creds.MAL_PASSWORD, 
               function(err, results) {
        if(err) {
            console.log(err);
            console.log("Response: " + result);
        }
        else {
            if(results) {
                for(var i = 0; i < results.length; i++) {
                    console.log(results[i]);
                }
            }
            else {
                console.log("No results were found.");
            }
        }
        callback();
    });
};

function verify(callback) {
    mal.verify(creds.MAL_USERNAME, creds.MAL_PASSWORD,
               function(err, result) {
        if(err) {
            console.log(err);
            console.log("Response: " + result);
        }
        else {
            console.log("Successfully authenticated!");
            console.log("Username: \t" + result.username);
            console.log("MAL ID:   \t" + result.id);
        }
        callback();
    });
};

function updateList(callback) {
    mal.add(22, 178, creds.MAL_USERNAME, creds.MAL_PASSWORD, 
               function(err, result) {
        if(err) {
            console.log(err);
            console.log("Response: " + result);
        }
        else {
            // if success, the result is just literally 'Updated'
            console.log("List successfully updated!");
            console.log("Show ID: \t" + result.id);
            console.log("Episode: \t" + result.episode);
            console.log("Status:  \t" + result.status);
        }
        callback();
    });
};

console.log("\n////////// MYANIMELIST SEARCH\n");
search(function() {
    console.log("\n////////// MYANIMELIST VERIFY\n");
    verify(function() {
        console.log("\n////////// MYANIMELIST UPDATE\n");
        updateList(function() {
            console.log("\n");
        });
    });
});
