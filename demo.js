var mal = require('./mal');
var creds = require('./creds');

mal.search('barakamon', creds.MAL_USERNAME, creds.MAL_PASSWORD);
mal.updateList(22, 1, creds.MAL_USERNAME, creds.MAL_PASSWORD);
