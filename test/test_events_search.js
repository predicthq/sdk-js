/*
 Tests
 */

import _ from "lodash"
_.extend(global, require('./shared'))

import {logger} from "../src/utils"

import Client from '../src/client'

// Logging Levels
logger.getLogger("predicthq.client").setLevel('DEBUG')

let test_account_id = process.env.TEST_ACCOUNT_ID
let test_user_password_access_token = process.env.TEST_USER_PASSWORD_ACCESS_TOKEN
let test_client_credentials_access_token = process.env.TEST_CLIENT_CREDENTIALS_ACCESS_TOKEN


describe('Events', () => {

    it('Search', (done) => {

        let c = new Client({access_token: test_client_credentials_access_token})

        c.events.search()
            .then((results)=> {

                // default limit 10 records
                expect(results.toArray().length).toEqual(10)

                // Check for known field
                let keys = _.keys(results.toArray()[0])
                expect(keys).toContain('id')

                // Check iterator
                let events = []
                for (let event of results) {
                    events.push(event)
                }

                expect(events.length).toEqual(10)

                done()

            }).catch(done)

    }),

    it('Search - with filter', (done) => {

        let c = new Client({access_token: test_client_credentials_access_token})

        // singapore
        c.events.search({
            q: 'Macklemore', rank_level: [4, 5], 'place.scope': ['1880251'],
            'start.gte': '2016-09-20', 'start.lt': '2016-09-21', 'start.tz': 'Asia/Singapore'
        })
            .then((results)=> {

                // Expect one record
                expect(results.toArray().length).toEqual(1)

                done()

            }).catch(done)

    }),

    it('Search - scope filter', (done) => {

        let c = new Client({access_token: test_client_credentials_access_token})

        // singapore
        c.events.search({
            q: 'Green Bay', label: ['american-football'], rank_level: [4, 5], 'place.scope': ['5244267', '4887398'],
            'start.gte': '2016-12-10', 'start.lt': '2016-12-20', 'category':'sports', 'sort': 'start'
        })
            .then((results)=> {

                // Expect two record
                expect(results.toArray().length).toEqual(2)

                // Green Bay Packers vs Seattle Seahawks - NFL (11th Dec)
                expect(results.toArray()[0]['id']).toEqual('3zKXK58r1JDg')

                // Chicago Bears vs Green Bay Packers - NFL (18th Dec)
                expect(results.toArray()[1]['id']).toEqual('2Ewb0z08VB0j')

                done()

            }).catch(done)

    }),

    it('Search - with within filter', (done) => {

        let c = new Client({access_token: test_client_credentials_access_token})

        // boston
        c.events.search({
            'within': '1km@42.35996,-71.06009',
            'rank_level': [4,5],
            'start.gte': '2016-03-08', 'start.lt': '2016-03-09',
        })
            .then((results)=> {

                // Expect one record
                expect(results.toArray().length).toEqual(1)

                expect(results.toArray()[0]['id']).toEqual('d5jeNGOP0qmd')
                expect(results.toArray()[0]['title']).toEqual('The Who')

                done()

            }).catch(done)

    }),

    it('Search - Delta (updated and state filter)', (done) => {

            let c = new Client({access_token: test_client_credentials_access_token})

            c.events.search({
                'updated.gte': '2017-05-01',
                'updated.lte': '2017-05-02',
                'label': ['performing-arts'],
                'country': 'US',
                'sort': ['start'],
                'state': ['deleted']
            })
                .then((results)=> {

                    // Expect some results
                    expect(results.toArray().length).toEqual(10)

                    expect(results.toArray()[0]['id']).toEqual('O8aaM8kalk56')

                    done()

                }).catch(done)

    }),

    it('Search - count only', (done) => {

        let c = new Client({access_token: test_client_credentials_access_token})

        c.events.count({'rank_level': [5], 'category': 'sports'})
            .then((results)=> {

                expect(_.keys(results.toDict())).toEqual([ 'count', 'top_rank', 'rank_levels', 'categories', 'labels' ])

                expect(results.toDict()['count']).toBeGreaterThan(10000)

                done()

            }).catch(done)

    }),

    it('Search using account', (done) => {

        let c = new Client({access_token: test_user_password_access_token})

        c.events.for_account(test_account_id).search()
            .then((results)=> {

                // default limit 10 records
                expect(results.toArray().length).toEqual(10)

                done()

            }).catch(done)

    }),

    it('Calendar', (done) => {

        let c = new Client({access_token: test_client_credentials_access_token})

        let options = {
            'active.gte': '2016-01-01',
            'active.lte': '2016-01-03',
            'country': 'CA',
            'top_events.limit': 1,
            'top_events.sort': ['rank']
        }

        c.events.calendar(options)
            .then((results)=> {

                let days = _.keyBy(results.toArray(), 'date')
                expect(_.keys(days)).toEqual(['2016-01-01', '2016-01-02', '2016-01-03'])

                done()

            }).catch(done)

    })

    it('Calendar using Account', (done) => {

        let c = new Client({access_token: test_user_password_access_token})

        let options = {
            'active.gte': '2016-01-01',
            'active.lte': '2016-01-03',
            'country': 'CA',
            'top_events.limit': 1,
            'top_events.sort': ['rank']
        }

        c.events.for_account(test_account_id).calendar(options)
            .then((results)=> {

                let days = _.keyBy(results.toArray(), 'date')
                expect(_.keys(days)).toEqual(['2016-01-01', '2016-01-02', '2016-01-03'])

                done()

            }).catch(done)

    })

})


