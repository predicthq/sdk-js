/*

*/

import {_} from "../../utils"

import {ResultSet} from "../../resultset"

import {EventSchema} from "./schemas"

import {Validator} from 'jsonschema'


class Accounts {

    constructor(client){
        this.client = client
    }

    account(user = 'self'){
        return this.client.get(`/v1/accounts/${user}/`)
    }

    subscriptions(user = 'self'){
        return this.client.get(`/v1/accounts/${user}/subscriptions/`)
    }

}

export default Accounts