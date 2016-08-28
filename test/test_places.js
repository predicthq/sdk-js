/*
 Tests


 */

import _ from "lodash"
_.extend(global, require('./shared'))

import {logger} from "../src/utils"

import Client from '../src/client'

// Logging Levels
logger.getLogger("predicthq.client").setLevel('DEBUG')


let test_client_credentials_access_token = process.env.TEST_CLIENT_CREDENTIALS_ACCESS_TOKEN

describe('Places', () => {
    it('Search', (done) => {
    
    let c = new Client({ access_token : test_client_credentials_access_token})

    c.places.search({country : ['NZ','AU']})
        .then((results)=>{

            expect(results.toArray().length).toEqual(2)
            expect(results.toArray()[0].name).toEqual("New Zealand")

            done()

        }).catch(done)

    })

})
