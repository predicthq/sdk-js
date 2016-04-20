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
let test_account_id = process.env.TEST_ACCOUNT_ID


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

    }),

    it('Search using account', (done) => {

    let c = new Client({ access_token : access_token})

    c.events.for_account(test_account_id).search()
        .then((results)=>{

            // default limit 10 records
            expect(results.toArray().length).toEqual(10)

            done()

        }).catch(done)

    }),

    it('Calendar', (done) => {

    let c = new Client({ access_token : access_token})

     let options = {
         'active.gte' : '2016-01-01',
         'active.lte' : '2016-01-03',
         'country' : 'CA',
         'top_events.limit' : 1,
         'top_events.sort' : ['rank']
     }

    c.events.calendar(options)
        .then((results)=>{

            let days = _.keyBy(results.toArray(),'date')
            expect(_.keys(days)).toEqual(['2016-01-01','2016-01-02','2016-01-03'])

            done()

        }).catch(done)

    })

   it('Calendar using Account', (done) => {

    let c = new Client({ access_token : access_token})

     let options = {
         'active.gte' : '2016-01-01',
         'active.lte' : '2016-01-03',
         'country' : 'CA',
         'top_events.limit' : 1,
         'top_events.sort' : ['rank']
     }

    c.events.for_account(test_account_id).calendar(options)
        .then((results)=>{

            let days = _.keyBy(results.toArray(),'date')
            expect(_.keys(days)).toEqual(['2016-01-01','2016-01-02','2016-01-03'])

            done()

        }).catch(done)

    })

})


