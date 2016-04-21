/*
    User Tests

 */

import _ from "lodash"
_.extend(global, require('./shared'))

import {logger} from "../src/utils"

import Client from '../src/client'

// Logging Levels
logger.getLogger("predicthq.client").setLevel('DEBUG')


let access_token = process.env.ACCESS_TOKEN
let test_user_id = process.env.TEST_USER_ID

describe('Users', () => {

    it('User', (done) => {

        let c = new Client({ access_token : access_token})

        c.users.user(test_user_id)
            .then((results)=>{

                expect(_.has(results, 'id')).toEqual(true)

                done()

            }).catch(done)

    }),

    it('Memberships', (done) => {

        let c = new Client({ access_token : access_token})

        c.users.memberships(test_user_id)
            .then((results)=>{

                expect(results.toArray().length).toEqual(1)

                expect(_.keys(results.toArray()[0])).toEqual(['url', 'account', 'groups', 'joined_at'])
                done()

            }).catch(done)

    })

})


