ani-up
======

[![Build Status](https://travis-ci.org/richard1/ani-up.svg?branch=master)](https://travis-ci.org/richard1/ani-up)
[![NPM version](https://badge.fury.io/js/ani-up.svg)](http://badge.fury.io/js/ani-up)

ANI UP _(become meguca!)_

## Dependencies

* [request](https://github.com/mikeal/request) - _simplified HTTP request client_
* [node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) - _XML to JavaScript object converter_ (soon)

#### For contributors to ani-up

* [mocha](https://github.com/visionmedia/mocha) - _simple, flexible, fun javascript test framework for node.js & the browser_

### Installing dependencies

`npm install [module name]`

## Setup

* Requires a `creds.js` file to store your login credentials to MAL (and Hummingbird) in the project's home directory. Here's an example:

```JavaScript
var creds = {}

creds.MAL_API_KEY = "your key here"

creds.MAL_USERNAME = "your username here"
creds.MAL_PASSWORD = "your password here"

creds.HUMMINGBIRD_API_KEY = "your key here"

creds.HUMMINGBIRD_EMAIL = "your email here"
creds.HUMMINGBIRD_USERNAME = "your username here"
creds.HUMMINGBIRD_PASSWORD = "your password here"

module.exports = creds;
```

## Running the demos

```
node example/mal-demo.js [optional search query]

node example/hummingbird-demo.js [optional search query]
```

## Running the tests

_Note: requires the **mocha** node module to run._

```
npm test
```
