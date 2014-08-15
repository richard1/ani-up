var aniup = require('../');
var hummingbird = aniup.hummingbird;

var creds = require('../creds');

var query = process.argv[2] ? process.argv[2] : 'barakamon';

function search(callback) {
    hummingbird.searchTopResult(query, function(err, result) {
        if(err) {
            console.log(err);
        }
        else {
            if(result) {
                console.log("Title: \t" + result.title);
                console.log("ID:    \t" + result.id);
                console.log("Eps:   \t" + result.episode_count);
                console.log("URL:   \t" + result.url);
                console.log("Image: \t" + result.cover_image);
            }
            else {
                console.log("No results found.");
            }
        }
        callback();
    });
};

function update(callback) {
    hummingbird.authenticate(creds.HUMMINGBIRD_EMAIL, creds.HUMMINGBIRD_PASSWORD, 
                             function(err, token) {
        if(err) {
            console.log(err);
        }
        else {
            hummingbird.update(token, 'prince-of-tennis', 1,
                                   function(err, data) {
                if(err) {
                    console.log(err);
                }
                else if(data === 'false') {
                    console.log("Unknown error");
                }
                else {
                    console.log(JSON.parse(data));
                }
            });
        }
        callback();
    });
};

console.log("\n////////// HUMMINGBIRD SEARCH\n");
search(function() {
    console.log("\n////////// HUMMINGBIRD AUTH & UPDATE\n"); 
    update(function() {
        console.log("\n");
    });
});
