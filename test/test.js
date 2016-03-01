/*
 Tests

    TODO: //{q:"Foo Fighters", rank_level:[4, 5], country:'US'})

 */

import _ from "lodash"
_.extend(global, require('./shared'))

import {logger} from "../src/utils"

import Client from '../index'

// Logging Levels
logger.getLogger("predicthq.client").setLevel('DEBUG')


let access_token = process.env.ACCESS_TOKEN

describe('Events', () => {
    it('Search', (done) => {

    let c = new Client({ access_token : access_token})

    c.events.search()
        .then((results)=>{

            // default limit 10 records
            expect(results.toArray().length).toEqual(10)

            // Check for known field
            let keys = _.keys(results.toArray()[0])
            expect(keys).toContain('id')

            // Check iterator
            let events = []
            for (let event of results){
                events.push(event)
            }

            expect(events.length).toEqual(10)

            done()

        }).catch(done)
    })

})


