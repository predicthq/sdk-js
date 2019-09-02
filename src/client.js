import {_, logger} from "./utils"

import Events from "./endpoints/v1/events"
import Places from "./endpoints/v1/places"
import Accounts from "./endpoints/v1/accounts"

import {polyfill} from 'es6-promise'
polyfill()

// For the browser only (server side must bring their own fetch lib)
import 'whatwg-fetch'

import YouAreI from 'youarei'

import dotenv from 'dotenv'
dotenv.config({silent: true})

let log = logger.getLogger("predicthq.client")

class Client {

    constructor(options) {

        options = options || {}

        this.baseUrl = options.endpoint || process.env.ENDPOINT_URL
        this.version = process.env.VERSION

        if (typeof(this.baseUrl) == 'undefined')
            throw "No endpoint URL set"

        this.options = options

        this.events = new Events(this)
        this.places = new Places(this)
        this.accounts = new Accounts(this)

        this.fetch = options.fetch || false
        if (!this.fetch){
            // Server
            if (typeof(global) != 'undefined' && global.hasOwnProperty('fetch'))
                this.fetch = global.fetch
            // Browser
            else if (typeof(window) != 'undefined' && window.hasOwnProperty('fetch'))
                this.fetch = window.fetch
            else {
                this.fetch = ()=> { throw "No Fetch Library present. You must provide one!" }
            }
        }
    }


    request(method, path, returnClass, options){

        let access_token = this.options.access_token

        let uri = new YouAreI(`${this.baseUrl}${path}`)

        uri.query_push(options)

        let fetch = this.fetch

        return new Promise((resolve, reject) => {

            log.debug(uri.to_string())

            fetch(uri.to_string(), {
                method: method,
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Accept': 'application/json',
                    'X-User-Agent': `PHQ-JS-SDK/${this.version}`
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

export default Client
export {
    Client
}