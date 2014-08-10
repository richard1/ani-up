var mal = require('./mal');
var hummingbird = require('./hummingbird');
var creds = require('./creds');


/* MAL search demo */
mal.search('barakamon', creds.MAL_USERNAME, 
    creds.MAL_PASSWORD, function(err, results) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(results);
        }
    }
);

/* MAL verify demo */
mal.verify(creds.MAL_USERNAME, creds.MAL_PASSWORD,
    function(err, result) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(result);
        }
    }
);

/* MAL update demo (Prince of Tennis) */
mal.updateList(22, 0, creds.MAL_USERNAME, 
    creds.MAL_PASSWORD, function(err, result) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("List successfully updated!");
        }
    }
);

/* Hummingbird search demo */
hummingbird.search('barakamon', function(err, results) {
    if(err) {
        console.log(err);
    }
    else {
        console.log(results);
    }
});

/* Hummingbird authentication demo */
hummingbird.authenticate(creds.HUMMINGBIRD_EMAIL, 
    creds.HUMMINGBIRD_PASSWORD, function(err, token) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(token);
        }
    }
);
