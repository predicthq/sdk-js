/*

*/

import {_} from "../utils"

import {Validator} from 'jsonschema'

class BaseEndpoint {

    constructor(client){
        this.client = client
    }

    build_url(prefix, suffix){
        if (this.accountId)
            return `/${prefix}/accounts/${_.trim(this.accountId,'/')}/${_.trim(suffix,'/')}/`
        else
            return `/${prefix}/${_.trim(suffix,'/')}/`

    }

    deserializeOptions(options){
        let self = this

        return _.fromPairs(_.map(_.toPairs(options), (item)=> {
            if (_.indexOf(self.arrayOptions, item[0]) >= 0) {
                if (_.isString(item[1]))
                    item[1] = item[1].split(',')

                if (!_.isArray(item[1]))
                    item[1] = [item[1]]
            }

            if (_.indexOf(self.integerOptions, item[0]) >= 0){
                if (!_.isArray(item[1]))
                    item[1] = parseInt(item[1])
                else
                    item[1] = _.map(item[1],(x)=>{ return parseInt(x)})
            }

            return item
        }))

    }

    serializeOptions(options){

        let self = this

        return _.fromPairs(_.map(_.toPairs(options), (item)=> {
            if (_.indexOf(self.arrayOptions, item[0]) >= 0) {
                if (_.isArray(item[1]))
                    item[1] = item[1].join(',')
            }

            return item
        }))
    }

    validate(options){

        let v = new Validator()

        let _options = this.deserializeOptions(options)

        return v.validate(_options, this.schema)

    }

    get(version, path, returnClass, options){

        options = this.serializeOptions(options)

        return this.client.get(this.build_url(version,path), returnClass, options)
    }

}

export default BaseEndpoint