//  npm install node-fetch
const nodeFetch = require('node-fetch');

const phq = require('predicthq');

// Initialises PredictHQ client library using your access token
// Note: You can find/create your access token at https://control.predicthq.com/clients
const client = new phq.Client({access_token: 'Acc3sS-t0keN', fetch: nodeFetch});

// Use the events endpoint
const phqEvents = client.events;

const logEventsToConsole = events => {
    for (const event of events) {
        // See https://developer.predicthq.com/resources/events/#fields for list of all event fields.
        console.log(event.title);
        console.log();
    }
};

// Search for the first 30 events in New Zealand ordered by rank in descending order
let searchParams = {
    'country': 'NZ',
    'sort': '-rank',
    'limit': 30,
};

// See https://developer.predicthq.com/resources/events/#parameters for all available search parameters.
phqEvents.search(searchParams)
    .then(logEventsToConsole)
    .catch(err => console.error(err));

// ... then get the next 20 events, skipping the first 30 events
searchParams.limit = 20
searchParams.offset = 30
phqEvents.search(searchParams)
    .then(logEventsToConsole)
    .catch(err => console.error(err));
