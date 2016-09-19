/*

*/

import {_} from "../../utils"

import {ResultSet} from "../../resultset"

import {EventSchema} from "./schemas"

import BaseEndpoint from "../base"

class SavedSearchResultSet extends ResultSet { }

class Searches extends BaseEndpoint {

     constructor(client, accountId){

        super(client)

        this.accountId = accountId
    }

     list(options){

        options = options || {}

        return this.get('v1','/members/self/events/searches/', SavedSearchResultSet, options)

    }

    for_account(id){
        return new Searches(this.client, id)
    }

}

export default Searches