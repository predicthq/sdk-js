//  npm install node-fetch
const nodeFetch = require('node-fetch');

const phq = require('predicthq');

// Initialises PredictHQ client library using your access token
// Note: You can find/create your access token at https://control.predicthq.com/clients
const client = new phq.Client({access_token: 'c6INmbmfD0SurslQ4afBur2z9RE5ts', fetch: nodeFetch});

// Use the events endpoint
const phqEvents = client.events;

const logEventsToConsole = events => {
    for (const event of events) {
        // See https://developer.predicthq.com/resources/events/#fields for list of all event fields.
        console.log(event);
        console.log();
    }
};


// Event search using keyword and start_date range parameters.
// See https://developer.predicthq.com/resources/events/#parameters for all available search parameters.
phqEvents.search({q: 'Summer Fest', 'start.gte': '2019-07-01', 'start.lte': '2019-07-31'})
    .then(logEventsToConsole)
    .catch(err => console.error(err));
