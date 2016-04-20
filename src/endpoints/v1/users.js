/*

*/

import {_} from "../../utils"

import {ResultSet} from "../../resultset"

import {EventSchema} from "./schemas"

import {Validator} from 'jsonschema'

class MembershipResultSet extends ResultSet { }


class Users {

    constructor(client){
        this.client = client
    }

    user(user = 'self'){
        return this.client.get(`/v1/users/${user}/`)
    }

    memberships(user = 'self'){
        return this.client.get(`/v1/users/${user}/memberships/`, MembershipResultSet)
    }

}

export default Users