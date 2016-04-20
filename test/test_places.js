/*
 Tests


 */

import _ from "lodash"
_.extend(global, require('./shared'))

import {logger} from "../src/utils"

import Client from '../index'

// Logging Levels
logger.getLogger("predicthq.client").setLevel('DEBUG')


let access_token = process.env.ACCESS_TOKEN

describe('Places', () => {
    it.only('Search', (done) => {

    let c = new Client({ access_token : access_token})

    c.places.search({country : ['NZ','AU']})
        .then((results)=>{

            expect(results.toArray().length).toEqual(2)
            expect(results.toArray()[0].name).toEqual("New Zealand")

            done()

        }).catch(done)

    })

})
