/*
    Event Validation Tests

*/

import _ from "lodash"
_.extend(global, require('./shared'))

import Client from '../src/client'

let c = new Client()

function validate(options){
    return c.places.validate(options)
}

describe('Place.Validation', () => {

    it('ID - Valid', () => {
        expect(validate({id: '123'}).valid).toExist()
    })

    it('Location - Valid', () => {
        expect(validate({location: '@40.66677,-73.88236'}).valid).toExist()
    })


})
