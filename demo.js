var mal = require('./mal');
var hummingbird = require('./hummingbird');
var creds = require('./creds');


mal.search('barakamon', creds.MAL_USERNAME, creds.MAL_PASSWORD, 
           function(err, results) {
    if(err) {
        console.log(err);
    }
    else {
        console.log(results);
    }
});

mal.verify(creds.MAL_USERNAME, creds.MAL_PASSWORD,
           function(err, result) {
    if(err) {
        console.log(err);
    }
    else {
        console.log(result);
    }
});

mal.update(22, 0, creds.MAL_USERNAME, creds.MAL_PASSWORD, 
           function(err, result) {
    if(err) {
        console.log(err);
    }
    else {
        console.log("List successfully updated!");
    }
});

hummingbird.search('barakamon', function(err, results) {
    if(err) {
        console.log(err);
    }
    else {
        console.log(results);
    }
});

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
            else if(data == "false") {
                console.log("Unknown error");
            }
            else {
                console.log(JSON.parse(data));
            }
        });
    }
});
