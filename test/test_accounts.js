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

describe('Accounts', () => {

    it('Account Details', (done) => {

        let c = new Client({ access_token : test_client_credentials_access_token})

        c.accounts.account()
            .then((results)=>{

                expect(_.has(results, 'id')).toEqual(true)

                done()

            }).catch(done)

    })

})
