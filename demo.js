var mal = require('./mal');
var hummingbird = require('./hummingbird');
var creds = require('./creds');


mal.search('barakamon', creds.MAL_USERNAME, creds.MAL_PASSWORD);
mal.updateList(22, 1, creds.MAL_USERNAME, creds.MAL_PASSWORD);

hummingbird.search('barakamon');
hummingbird.authenticate(creds.HUMMINGBIRD_EMAIL, creds.HUMMINGBIRD_PASSWORD);
