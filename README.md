ani-up
======

[![Build Status](https://travis-ci.org/richard1/ani-up.svg?branch=master)](https://travis-ci.org/richard1/ani-up)
[![NPM version](https://badge.fury.io/js/ani-up.svg)](http://badge.fury.io/js/ani-up)

**ani-up** is a Node.js module that acts as a wrapper for the MyAnimeList and Hummingbird APIs.  It currently supports search, user authentication, and list updating.

## Installation

To install, run `npm install ani-up` in your project's home directory.  If you need the latest, you can clone this repository - just make sure you install all the dependencies (see _Contributing_ below).

## Usage

Check out the [documentation](https://github.com/richard1/ani-up/wiki/Documentation) for detailed information on using ani-up.

### MyAnimeList & Hummingbird

Most MAL and Hummingbird functions require 1) an API key and 2) a valid username and password for those sites.  Currently, this module looks for a `creds.js` file to store your login credentials to MAL (and Hummingbird) in the project's home directory. Here's the basic format:

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

With that, you can start calling the MAL and Hummingbird functions in your application.  To obtain the MAL and Hummingbird submodules, you simply `require` them like so:

```
var aniup = require('ani-up');        // the entire module
var mal = aniup.mal;                  // the MAL module
var hummingbird = aniup.hummingbird;  // the hummingbird module
```

Here's a example that uses the Hummingbird search function.

```JavaScript
var aniup = require('ani-up');
var hummingbird = aniup.hummingbird;

hummingbird.searchTopResult('barakamon', function(err, result) {
    if(err) {
        console.log(err);
    }   
    else {
        if(result) {
            console.log("Title: \t" + result.title);
        }
    }   
}); 
```

### Parser

Parser is a standalone video file name parser that is bundled with this module.  If you only need to use the parser (and neither the MAL nor Hummingbird functions), then you do not need to have a `creds.js` file.

```JavaScript
require('aniup').parser;       // the proper way
require('aniup/lib/parser');   // only if you don't have/need creds.js
```

## Running the demos

This Node.js module contains some basic demos in the examples/ directory.  To run them, run these commands from the ani-up directory.

```
node example/mal-demo.js [optional search query]

node example/hummingbird-demo.js [optional search query]
```

# Contributing

Help is always welcome.  Continue reading if you would like to set up development for this project!  There's a lot of cool features and additions planned, so head over to the [wiki](https://github.com/richard1/ani-up/wiki) for some ideas.

## Dependencies

* [request](https://github.com/mikeal/request) - _simplified HTTP request client_
* [node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) - _XML to JavaScript object converter_ (soon)

#### For contributors to ani-up

* [mocha](https://github.com/visionmedia/mocha) - _simple, flexible, fun javascript test framework for node.js & the browser_

### Installing dependencies

`npm install [module name]`

## Running the tests

_Note: requires the **mocha** node module to run._

```
npm test
```
