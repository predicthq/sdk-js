//  npm install node-fetch
const nodeFetch = require('node-fetch');

const phq = require('predicthq');

// Initialises PredictHQ client library using your access token
// Note: You can find/create your access token at https://control.predicthq.com/clients
const client = new phq.Client({access_token: 'c6INmbmfD0SurslQ4afBur2z9RE5ts', fetch: nodeFetch});

// Use the events endpoint
const phqEvents = client.events;

// Basic event search without any parameters. By default, it will return the first ten events.
phqEvents.search()
    .then(
        results => {
            for (const event of results) {

                // List of event fields are available at https://developer.predicthq.com/resources/events/#fields
                console.log(`Event title: ${event.title}`);
                console.log(`Category: ${event.category}`);
                console.log('Entities:');
                (event.entities || []).forEach(ent => {
                    console.log(`(${ent.type}) ${ent.name}`)
                });
                console.log();

            }
        }
    ).catch(
    err => console.error(err)
);
