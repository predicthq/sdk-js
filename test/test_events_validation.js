/*
    Event Validation Tests

*/

import _ from "lodash"
_.extend(global, require('./shared'))

import Client from '../src/client'

let c = new Client()

function validate(options){
    return c.events.validate(options)
}

describe('Event.Validation', () => {

    it('ID - Valid', () => {
        expect(validate({id: '123'}).valid).toExist()
    })

    it('Q - Valid', () => {
        expect(validate({q: 'xyz'}).valid).toExist()
    })

    it('Country - Valid', () => {
        expect(validate({country: 'US'}).valid).toExist()
        expect(validate({country: 'NZ,AU'}).valid).toExist()
    })

    it('Label - Valid', () => {
        expect(validate({label: 'airport'}).valid).toExist()
        expect(validate({label: 'outdoor,fundraiser'}).valid).toExist()
        expect(validate({label: ['outdoor', 'fundraiser']}).valid).toExist()
    })

    it('Invalid Key', () => {
        expect(validate({xyz: 'abc'}).valid).toNotExist()
    })

    it('Category - Valid', () => {
        expect(validate({category: 'conferences'}).valid).toExist()
        expect(validate({category: 'conferences,concerts'}).valid).toExist()
        expect(validate({category: ['conferences']}).valid).toExist()
        expect(validate({category: ['conferences', 'concerts']}).valid).toExist()
    })

    it('Category - Invalid', () => {
        expect(validate({category: 'blah'}).valid).toNotExist()
    })

    it('Limit - Valid', () => {
        expect(validate({limit: 100}).valid).toExist()
        expect(validate({limit: '100'}).valid).toExist()
    })

    it('Limit - Invalid', () => {
        expect(validate({limit: 'xyz'}).valid).toNotExist()
        expect(validate({limit: 0}).valid).toNotExist()
        expect(validate({limit: 500}).valid).toNotExist()
    })

    it('Rank Level - Valid', () => {
        expect(validate({rank_level: '3,4,5'}).valid).toExist()
        expect(validate({rank_level: 3}).valid).toExist()
        expect(validate({rank_level: [3,4,5]}).valid).toExist()
    })

    it('Rank Level - Invalid', () => {
        expect(validate({rank_level: '6'}).valid).toNotExist()
        expect(validate({rank_level: [6]}).valid).toNotExist()
    })

    it('Sort - Valid', () => {
        expect(validate({sort: ['-start','rank']}).valid).toExist()
    })

    it('Start - Valid', () => {
        expect(validate({'start.tz': 'America/New_York'}).valid).toExist()
        expect(validate({'start.gt': '2016-01-01'}).valid).toExist()
        expect(validate({'start.gte': '2016-01-01'}).valid).toExist()
        expect(validate({'start.lt': '2016-01-01'}).valid).toExist()
        expect(validate({'start.lte': '2016-01-01'}).valid).toExist()
    })

    it('Start - Invalid', () => {
        expect(validate({'start.gt': '2016'}).valid).toNotExist()
    })

    it('End - Valid', () => {
        expect(validate({'end.tz': 'America/New_York'}).valid).toExist()
        expect(validate({'end.gt': '2016-01-01'}).valid).toExist()
        expect(validate({'end.gte': '2016-01-01'}).valid).toExist()
        expect(validate({'end.lt': '2016-01-01'}).valid).toExist()
        expect(validate({'end.lte': '2016-01-01'}).valid).toExist()
    })

    it('End - Invalid', () => {
        expect(validate({'end.gt': '2016'}).valid).toNotExist()
    })

})


