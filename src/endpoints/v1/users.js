/*

*/

import {_} from "../../utils"

import {ResultSet} from "../../resultset"

import {EventSchema} from "./schemas"

import {Validator} from 'jsonschema'

import BaseEndpoint from "../base"

class MembershipResultSet extends ResultSet { }


class Users extends BaseEndpoint {

    user(user = 'self'){
        return this.get('v1', `/users/${user}/`)
    }

    memberships(user = 'self'){
        return this.get('v1', `/users/${user}/memberships/`, MembershipResultSet)
    }

}

export default Users