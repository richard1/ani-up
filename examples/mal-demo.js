var aniup = require('../');
var mal = aniup.mal;

var creds = require('../creds');

var query = process.argv[2] ? process.argv[2] : 'barakamon';
var id    = process.argv[3] ? process.argv[3] : 22;
var ep    = process.argv[4] ? process.argv[4] : 0;

function search(callback) {
    mal.searchTopResult(query, creds.MAL_USERNAME, creds.MAL_PASSWORD, 
               function(err, result) {
        if(err) {
            console.log(err);
            console.log("Response: " + result);
        }
        else {
            if(result) {
                console.log(result);
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
    mal.add(+id, +ep, creds.MAL_USERNAME, creds.MAL_PASSWORD, 
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
            console.log("Response:\t" + result.body);
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
