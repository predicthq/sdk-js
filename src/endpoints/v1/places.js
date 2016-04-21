/*

*/

import {_} from "../../utils"

import {ResultSet} from "../../resultset"

import {PlaceSchema} from "./schemas"

import BaseEndpoint from "../base"


class PlaceResultSet extends ResultSet { }

class Places extends BaseEndpoint {

    constructor(client){

        super(client)

        this.schema = PlaceSchema
        this.arrayOptions = ['id', 'country', 'type']
        this.integerOptions = ['limit']

    }

    search(options){
        options = options || {}

        let validate = this.validate(options)

        if (validate.valid)
            return this.get('v1','/places/', PlaceResultSet, options)

        return new Promise((resolve, reject) => {
            return reject(validate.errors[0])
        })


    }

}

export default Places