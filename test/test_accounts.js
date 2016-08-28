/*
    Account Tests

 */

import _ from "lodash"
_.extend(global, require('./shared'))

import {logger} from "../src/utils"

import Client from '../src/client'

// Logging Levels
logger.getLogger("predicthq.client").setLevel('DEBUG')

let test_client_credentials_access_token = process.env.TEST_CLIENT_CREDENTIALS_ACCESS_TOKEN
let test_user_password_access_token = process.env.TEST_USER_PASSWORD_ACCESS_TOKEN

describe('Accounts', () => {

    it('Account Details', (done) => {

        let c = new Client({ access_token : test_client_credentials_access_token})

        c.accounts.account()
            .then((results)=>{

                expect(_.has(results, 'id')).toEqual(true)

                done()

            }).catch(done)

    }),

    it('Subscriptions', (done) => {

        let c = new Client({ access_token : test_user_password_access_token})

        c.accounts.subscriptions()
            .then((results)=>{

               expect(_.keys(results)).toEqual(['app_subscription', 'api_subscription'])

                done()

            }).catch(done)

    })

})

