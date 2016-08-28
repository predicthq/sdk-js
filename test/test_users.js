/*
    User Tests

 */

import _ from "lodash"
_.extend(global, require('./shared'))

import {logger} from "../src/utils"

import Client from '../src/client'

// Logging Levels
logger.getLogger("predicthq.client").setLevel('DEBUG')

let test_user_password_access_token = process.env.TEST_USER_PASSWORD_ACCESS_TOKEN

describe('Users', () => {

    it('User', (done) => {

        let c = new Client({ access_token : test_user_password_access_token})

        c.users.user()
            .then((results)=>{

                expect(_.has(results, 'id')).toEqual(true)

                done()

            }).catch(done)

    }),

    it('Memberships', (done) => {

        let c = new Client({ access_token : test_user_password_access_token})

        c.users.memberships()
            .then((results)=>{

                expect(results.toArray().length).toBeGreaterThanOrEqualTo(1)

                expect(_.keys(results.toArray()[0])).toEqual(['url', 'account', 'groups', 'joined_at'])
                done()

            }).catch(done)

    })

})


