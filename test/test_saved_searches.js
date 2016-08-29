/*
    Saved Searches Tests
 */

import _ from "lodash"
_.extend(global, require('./shared'))

import {logger} from "../src/utils"

import Client from '../src/client'

// Logging Levels
logger.getLogger("predicthq.client").setLevel('DEBUG')

let test_account_id = process.env.TEST_ACCOUNT_ID
let test_user_password_access_token = process.env.TEST_USER_PASSWORD_ACCESS_TOKEN


describe('Saved Searches', () => {

    it.only('List', (done) => {

        let c = new Client({access_token: test_user_password_access_token})

        c.searches.for_account(test_account_id).list()
            .then((results)=> {

                // May have none
                expect(results.toArray().length).toBeGreaterThanOrEqualTo(0)

                done()

            }).catch(done)

    })

})


