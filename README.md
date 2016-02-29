# PredictHQ API Client for Javascript


[PredictHQ](https://www.predicthq.com/) is a global events intelligence platform that aggregates, enriches and connects scheduled and real-time event data happening both locally and globally, then predicts which ones could impact your business.


## Installation

    npm install predicthq

or

    bower install predicthq
    
## Usage

    import Client from 'predicthq'; 
     
    phq = Client(access_token="$ACCESS_TOKEN")

    for event in phq.events.search(q="Foo Fighters", rank_level=[4, 5], country='US'):
        print("{} - {} - {} - {}".format(event.rank, event.category, event.title, event.start.strftime('%Y-%m-%d')))

    81 - concerts - Foo Fighters - 2015-11-17
    99 - concerts - Foo Fighters - 2015-11-16

## Endpoints

* Client.oauth2
* Client.accounts
* Client.events
* Client.signals

For a description of all available endpoints, refer to our `API Documentation <https://developer.predicthq.com/>`_.

## Running Tests

    npm run tests

## Changelog

* 0.0.1     Initial release
