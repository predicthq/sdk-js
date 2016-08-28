/*

*/

import {_} from "../../utils"

import {ResultSet} from "../../resultset"

import {EventSchema} from "./schemas"

import {Validator} from 'jsonschema'

import BaseEndpoint from "../base"


class Accounts extends BaseEndpoint {

    account(account = 'self'){
        return this.client.get(`/v1/accounts/${account}/`)
    }

    subscriptions(account = 'self'){
        return this.client.get(`/v1/accounts/${account}/subscriptions/`)
    }

}

export default Accounts