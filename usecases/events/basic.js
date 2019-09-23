//  npm install node-fetch
const nodeFetch = require('node-fetch');

const phq = require('predicthq');

// Initialises PredictHQ client library using your access token
// Note: You can find/create your access token at https://control.predicthq.com/clients
const client = new phq.Client({access_token: '$token', fetch: nodeFetch});

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
