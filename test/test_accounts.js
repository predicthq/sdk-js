/*
    Account Tests

 */

import _ from "lodash"
_.extend(global, require('./shared'))

import {logger} from "../src/utils"

import Client from '../index'

// Logging Levels
logger.getLogger("predicthq.client").setLevel('DEBUG')

let access_token = process.env.ACCESS_TOKEN
let test_user_id = process.env.TEST_USER_ID

describe('Accounts', () => {

    it('User', (done) => {

        let c = new Client({ access_token : access_token})

        c.users.user(test_user_id)
            .then((results)=>{

                expect(_.has(results, 'id')).toEqual(true)

                done()

            }).catch(done)

    }),

    it('Subscriptions', (done) => {

        let c = new Client({ access_token : access_token})

        c.accounts.subscriptions()
            .then((results)=>{

               expect(_.keys(results)).toEqual(['app_subscription', 'api_subscription'])

                done()

            }).catch(done)

    })

})

