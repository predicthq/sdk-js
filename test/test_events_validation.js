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

    it('State - Valid', () => {
        expect(validate({state: 'deleted'}).valid).toExist()
        expect(validate({state: 'active,deleted'}).valid).toExist()
        expect(validate({state: ['active','deleted']}).valid).toExist()
    })

    it('State - Invalid', () => {
        expect(validate({state: 'blah'}).valid).toNotExist()
        expect(validate({state: ['blah']}).valid).toNotExist()
    })

    it('Limit - Valid', () => {
        expect(validate({limit: 100}).valid).toExist()
        expect(validate({limit: '100'}).valid).toExist()
    })

    it('Limit - Invalid', () => {
        expect(validate({limit: 'xyz'}).valid).toNotExist()
        expect(validate({limit: 0}).valid).toNotExist()
        expect(validate({limit: -1}).valid).toNotExist()
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

    it('Updated - Valid', () => {
        expect(validate({'updated.tz': 'America/New_York'}).valid).toExist()
        expect(validate({'updated.gt': '2016-01-01'}).valid).toExist()
        expect(validate({'updated.gte': '2016-01-01'}).valid).toExist()
        expect(validate({'updated.lt': '2016-01-01'}).valid).toExist()
        expect(validate({'updated.lte': '2016-01-01'}).valid).toExist()
    })

    it('Updated - Invalid', () => {
        expect(validate({'updated.gt': '2016'}).valid).toNotExist()
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

    it('Start_around - Valid', () => {
        expect(validate({'start_around.origin': '2020-01-01'}).valid).toExist()
        expect(validate({'start_around.offset': '1d'}).valid).toExist()
        expect(validate({'start_around.scale': '0d'}).valid).toExist()
        expect(validate({'start_around.decay': 0}).valid).toExist()
    })

    it('Start_around - Invalid', () => {
        expect(validate({'start_around': '2012-01-01'}).valid).toNotExist()
    })

    it('End_around - Valid', () => {
        expect(validate({'end_around.origin': '2020-01-01'}).valid).toExist()
        expect(validate({'end_around.offset': '1d'}).valid).toExist()
        expect(validate({'end_around.scale': '0d'}).valid).toExist()
        expect(validate({'end_around.decay': 0.5}).valid).toExist()
    })

    it('End_around - Invalid', () => {
        expect(validate({'end_around': '2012-01-01'}).valid).toNotExist()
    })

    it('Location_around - Valid', () => {
        expect(validate({'location_around.origin': '0.730610,-73.935242'}).valid).toExist()
        expect(validate({'location_around.offset': '0km'}).valid).toExist()
        expect(validate({'location_around.scale': '0.5km'}).valid).toExist()
        expect(validate({'location_around.decay': 0.5}).valid).toExist()
    })

    it('Location_around - Invalid', () => {
        expect(validate({'location_around': '0.730610,-73.935242'}).valid).toNotExist()
    })

})
