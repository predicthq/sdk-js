import {_, logger} from "./utils"

import Events from "./endpoints/v1/events"
import Places from "./endpoints/v1/places"
import Users from "./endpoints/v1/users"
import Accounts from "./endpoints/v1/accounts"

import {polyfill} from 'es6-promise'
polyfill()

import 'isomorphic-fetch'

import YouAreI from 'youarei'

import dotenv from 'dotenv'
dotenv.config({silent: true})


let log = logger.getLogger("predicthq.client")

class Client {

    constructor(options){

        options = options || {}

        this.baseUrl = options.endpoint || process.env.ENDPOINT_URL

        this.options = options

        this.events = new Events(this)
        this.places = new Places(this)
        this.users = new Users(this)
        this.accounts = new Accounts(this)

    }

    request(method, path, returnClass, options){

        let access_token = this.options.access_token

        let uri = new YouAreI(`${this.baseUrl}${path}`)

        uri.query_push(options)

        return new Promise((resolve, reject) => {

            log.debug(uri.to_string())

            fetch(uri.to_string(), {
                method: method,
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Accept': 'application/json'
                }
            }).then(function(response) {
                    return response.json()
                })
                .then(function(result) {

                    if (result.hasOwnProperty('error')){
                        return reject(result)
                    }

                    if (returnClass)
                        return resolve(new returnClass(result))
                    else
                        return resolve(result)

                })
                .catch(function(err) {
                    return reject({code:null, error: err})
                })
        })

    }

    get(path, returnClass, options){
        return this.request("GET", path, returnClass, options)
    }


}

export {
    Client
}