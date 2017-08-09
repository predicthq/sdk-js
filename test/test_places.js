/*
 Tests


 */

import _ from "lodash"
_.extend(global, require('./shared'))

import {logger} from "../src/utils"

import Client from '../src/client'

// Logging Levels
logger.getLogger("predicthq.client").setLevel('DEBUG')


let test_user_password_access_token = process.env.TEST_USER_PASSWORD_ACCESS_TOKEN

describe('Places', () => {
    it('Search', (done) => {

    let c = new Client({ access_token : test_user_password_access_token})

    c.places.search({country : ['NZ','AU']})
        .then((results)=>{

            expect(results.toArray().length).toEqual(2)
            expect(results.toArray()[0].name).toEqual("New Zealand")

            done()

        }).catch(done)

    }),

    it('Search by ID', (done) => {

    let c = new Client({ access_token : test_user_password_access_token})

    c.places.search({id : ['5128638']})
        .then((results)=>{

            expect(results.toArray().length).toEqual(1)
            expect(results.toArray()[0].name).toEqual("State of New York")

            done()

        }).catch(done)

    })

    it('Search by IDs', (done) => {

    let c = new Client({ access_token : test_user_password_access_token})

    c.places.search({id : ['5128638', '5128594']})
        .then((results)=>{

            expect(results.toArray().length).toEqual(2)

            done()

        }).catch(done)

    })

})
