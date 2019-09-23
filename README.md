# PredictHQ API Client for Javascript

[![Version](https://badge.fury.io/js/predicthq.svg)](http://badge.fury.io/js/predicthq)
[![Build Status](https://travis-ci.org/predicthq/sdk-js.svg?branch=master)](https://travis-ci.org/predicthq/sdk-js)
[![Coverage Status](https://coveralls.io/repos/github/predicthq/sdk-js/badge.svg?branch=master)](https://coveralls.io/github/predicthq/sdk-js?branch=master)

[PredictHQ](https://www.predicthq.com/) is the demand intelligence company combining real-world events into one global source of truth to help businesses better understand demand and plan for the future.


## Installation

    npm install predicthq

## Usage

### Initialising the SDK

```javascript
const phq = require('predicthq');

// Initialises PredictHQ client library using your access token
// Note: You can find/create your access token at https://control.predicthq.com/clients
const client = new phq.Client({access_token: 'ACCESS_TOKEN'});
```

#### ES6 Usage

```javascript
import Client from 'predicthq';
// Initialises PredictHQ client library using your access token
// Note: You can find/create your access tnoken at https://control.predicthq.com/clients
const client = new Client({access_token: 'ACCESS_TOKEN'});
```

#### NodeJS

You will need to bring your own fetch library

```javascript
//  npm install node-fetch
const nodeFetch = require('node-fetch');

const phq = require('predicthq');

// Initialises PredictHQ client library using your access token
// Note: You can find/create your access token at https://control.predicthq.com/clients
const client = new phq.Client({access_token: 'ACCESS_TOKEN', fetch: nodeFetch});
```
### Events endpoint

Additional examples are available in [usecases/events](usecases/events) directory.

```javascript
// Basic event search without any parameters. By default, it will return the first ten events.
client.events.search()
    .then(
        (results) => {
            for (const event of results) {
                console.info(event);
            }
        }
    ).catch(
        err => console.error(err)
    );


// the search() method returns an EventResultSet which allows you to iterate over the 1st page of items
client.events.search({q: 'Madonna', rank_level: 5, country:'AU', 'start.gte' : '2016-01-01'})
    .then(function(results){
        var events = results.toArray()
        for(var i=0; i < events.length; i++){
           console.info(events[i].rank, events[i].category, events[i].title, events[i].start, events[i].location)
        }
    })
```

    88 'concerts' 'Madonna' '2016-03-27T10:00:00Z' [ 153.073, -27.3431 ]
    88 'concerts' 'Madonna' '2016-03-26T10:00:00Z' [ 153.073, -27.3431 ]
    88 'concerts' 'Madonna' '2016-03-16T17:30:00Z' [ 153.073, -27.3431 ]
    88 'concerts' 'Madonna' '2016-03-16T10:00:00Z' [ 153.073, -27.3431 ]
    89 'concerts' 'Madonna' '2016-03-12T09:00:00Z' [ 144.978, -37.8218 ]

    # you can skip results with the offset parameter and limit the number of results with the limit parameter
    # the following skips the first 10 results and limits the results to 5 items
    client.events.search(({q: 'Madonna', offset: 10, limit: 5})
        .then(function(results){
            var events = results.toArray()
            for(var i=0; i < events.length; i++){
               console.info(events[i].rank, events[i].category, events[i].title, events[i].start, events[i].location)
            }
        })


## ES6 Usage

    import Client from 'predicthq'

    let client = new Client({access_token="ACCESS_TOKEN"})

    client.events.search({'within': '1km@42.35996,-71.06009', 'start.gte': '2016-03-08', 'start.lt': '2016-03-09'})
        .then((results)=>{
            for (let event of results)
                console.info(event.title)
        })


## NodeJS

You will need to bring your own fetch library
    //  npm install node-fetch
    const nodeFetch = require('node-fetch');
    
    const phq = require('predicthq');
    
    // Initialises PredictHQ client library using your access token
    // Note: You can find/create your access token at https://control.predicthq.com/clients
    const client = new phq.Client({access_token: "$token", fetch: nodeFetch});
    
    // Use the events endpoint
    const phqEvents = client.events;
    
    // Basic event search without any parameters. By default, it will return the first ten events.
    phqEvents.search()
        .then(
            (results) => {
                for (const event of results) {
                    console.info(event);
                }
            }
        ).catch(
            err => console.error(err)
        );

## Endpoints

* events
* accounts
* places


For a description of all available endpoints, refer to our [API Documentation](https://developer.predicthq.com/).
