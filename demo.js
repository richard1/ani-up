var mal = require('./mal');
var hummingbird = require('./hummingbird');
var creds = require('./creds');


/* MAL search demo */
//mal.search('barakamon', creds.MAL_USERNAME, creds.MAL_PASSWORD);

/* MAL update demo */
//mal.updateList(22, 0, creds.MAL_USERNAME, creds.MAL_PASSWORD);

/* Hummingbird search demo */
hummingbird.search('barakamon', function(err) {
    if(err) {
        console.log(err);
    }
    else {
        console.log(hummingbird.results);
    }
});

/* Hummingbird authentication demo */
hummingbird.authenticate(creds.HUMMINGBIRD_EMAIL, 
    creds.HUMMINGBIRD_PASSWORD, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(hummingbird.authToken);
        }
    }
);
