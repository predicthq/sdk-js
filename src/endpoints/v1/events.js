/*

*/

import {_} from "../../utils"

import {ResultSet} from "../../resultset"

import {EventSchema} from "./schemas"

import {Validator} from 'jsonschema'

class EventResultSet extends ResultSet { }


class Events {

    constructor(client){
        this.client = client
        this.schema = EventSchema
        this.arrayOptions = ['category', 'sort', 'rank_level', 'label', 'within','country']
        this.integerOptions = ['limit', 'offset', 'rank_level']
    }

    parseOptions(options, arrayOptions, integerOptions){

        return _.fromPairs(_.map(_.toPairs(options), (item)=> {
            if (_.indexOf(arrayOptions, item[0]) >= 0) {
                if (typeof item[1] === 'string')
                    item[1] = item[1].split(',')

                if (!_.isArray(item[1]))
                    item[1] = [item[1]]
            }

            if (_.indexOf(integerOptions, item[0]) >= 0){
                if (!_.isArray(item[1]))
                    item[1] = parseInt(item[1])
                else
                    item[1] = _.map(item[1],(x)=>{ return parseInt(x)})
            }

            return item
        }))

    }

    validate(options){

        let v = new Validator()

        let _options = this.parseOptions(options, this.arrayOptions, this.integerOptions)

        return v.validate(_options, this.schema)

    }

    search(options){

        options = options || {}

        let validate = this.validate(options)

        if (validate.valid) {
            return this.client.get('/v1/events/', EventResultSet, options)
        }

        return new Promise((resolve, reject) => {
            return reject(validate.errors[0])
        })

    }

}

export default Events