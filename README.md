ani-up
======

ANI UP!

## Dependencies

* [request](https://github.com/mikeal/request) - _Simplified HTTP request client_

### Installing dependencies

`npm install [module name]`

## Setup

* Requires a `creds.js` file to store your login credentials to MAL (and Hummingbird) in the project's home directory. Here's an example:

```JavaScript
var creds = {}

creds.MAL_API_KEY = "your key here"

creds.MAL_USERNAME = "your username here"
creds.MAL_PASSWORD = "your password here"

module.exports = creds;
```

## Running the demo

`node mal.js`
