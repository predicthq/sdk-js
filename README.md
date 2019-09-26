<img align="center" src="ext/logo.png" alt="PredictHQ logo">

# PredictHQ API Client for Javascript

[![Version](https://badge.fury.io/js/predicthq.svg)](http://badge.fury.io/js/predicthq)
[![Build Status](https://travis-ci.org/predicthq/sdk-js.svg?branch=master)](https://travis-ci.org/predicthq/sdk-js)
[![Coverage Status](https://coveralls.io/repos/github/predicthq/sdk-js/badge.svg?branch=master)](https://coveralls.io/github/predicthq/sdk-js?branch=master)

[PredictHQ](https://www.predicthq.com/) is the demand intelligence company combining real-world events into one global source of truth to help businesses better understand demand and plan for the future.


## Installation

    npm install predicthq

## Usage


We support all the endpoints available in our API.

* `oauth2`
* `accounts`
* `events`
* `places`

Please refer to our [API Documentation](https://developer.predicthq.com/) for a description of each endpoint.



### Initialising the SDK

```javascript
const phq = require('predicthq');

// Initialises PredictHQ client library using your access token
// Note: You can find/create your access token at https://control.predicthq.com/clients
const client = new phq.Client({access_token: 'Acc3sS-t0keN'});
```

#### ES6 Usage

```javascript
import Client from 'predicthq';
// Initialises PredictHQ client library using your access token
// Note: You can find/create your access tnoken at https://control.predicthq.com/clients
const client = new Client({access_token: 'Acc3sS-t0keN'});
```

#### NodeJS

You will need to bring your own fetch library

```javascript
//  npm install node-fetch
const nodeFetch = require('node-fetch');

const phq = require('predicthq');

// Initialises PredictHQ client library using your access token
// Note: You can find/create your access token at https://control.predicthq.com/clients
const client = new phq.Client({access_token: 'Acc3sS-t0keN', fetch: nodeFetch});
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
```

