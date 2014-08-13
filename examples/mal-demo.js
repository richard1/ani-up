var aniup = require('../');
var mal = aniup.mal;

var creds = require('../creds');

var query = process.argv[2] ? process.argv[2] : 'barakamon';

function search(callback) {
    mal.search(query, creds.MAL_USERNAME, creds.MAL_PASSWORD, 
               function(err, results) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(results);
        }
        callback();
    });
};

function verify(callback) {
    mal.verify(creds.MAL_USERNAME, creds.MAL_PASSWORD,
               function(err, result) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(result);
        }
        callback();
    });
};

function update(callback) {
    mal.update(22, 0, creds.MAL_USERNAME, creds.MAL_PASSWORD, 
               function(err, result) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("List successfully updated!");
        }
        callback();
    });
};

console.log("\n////////// MYANIMELIST SEARCH\n");
search(function() {
    console.log("\n////////// MYANIMELIST VERIFY\n");
    verify(function() {
        console.log("\n////////// MYANIMELIST UPDATE\n");
        update(function() {
            console.log("\n////////// END OF DEMO\n");
        });
    });
});
