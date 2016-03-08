# PredictHQ API Client for Javascript


[PredictHQ](https://www.predicthq.com/) is a global events intelligence platform that aggregates, enriches and connects scheduled and real-time event data happening both locally and globally, then predicts which ones could impact your business.


## Installation

    npm install predicthq

or

    bower install predicthq
    
## Usage

    var Client = require('predicthq')
     
    var phq = new Client(access_token="ACCESS_TOKEN")
    
    phq.events.search({q: 'Madonna', rank_level: 5, country:'AU', 'start.gte' : '2016-01-01'})
        .then(function(results){
            var events = results.toArray()
            for(var i=0; i < events.length; i++)
                console.info(events[i].rank, events[i].category, events[i].title, events[i].start, events[i].city )
        })

    88 "concerts" "Madonna" "2016-03-27T10:00:00Z" "Brisbane"
    88 "concerts" "Madonna" "2016-03-26T10:00:00Z" "Brisbane"
    88 "concerts" "Madonna" "2016-03-16T17:30:00Z" "Brisbane"
    88 "concerts" "Madonna" "2016-03-16T10:00:00Z" "Brisbane"
    89 "concerts" "Madonna" "2016-03-12T09:00:00Z" "Melbourne"
    
# ES6 Usage
    
    import Client from 'predicthq'
    
    let phq = new Client(access_token="ACCESS_TOKEN")
    
    phq.events.search()
        .then((results)=>{
            for (let event of results)
                console.info(event.title)
        })
    

## Endpoints

* Client.events


For a description of all available endpoints, refer to our `API Documentation <https://developer.predicthq.com/>`_.

## Running Tests

    npm run test
    npm run test_browser 

## Changelog

* 0.0.1     Initial release
