import {_, logger} from "./utils"

import Events from "./endpoints/v1/events"

import {polyfill} from 'es6-promise'
polyfill()

import 'isomorphic-fetch'

import YouAreI from 'youarei'

import dotenv from 'dotenv'
dotenv.config({silent: true})


let log = logger.getLogger("predicthq.client")

class Client {

    constructor(options){
        this.baseUrl = process.env.ENDPOINT_URL

        this.options = options

        this.events = new Events(this)

    }

    request(method, path, returnClass, options){

        let access_token = this.options.access_token

        let uri = new YouAreI(`${this.baseUrl}${path}`)

        uri.query_push(options)

        return new Promise((resolve, reject) => {

            fetch(uri.to_string(), {
                method: method,
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'Accept': 'application/json'
                }
            }).then(function(response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                })
                .then(function(result) {

                    return resolve(new returnClass(result))

                })
                .catch(function(err) {
                    log.warn(err)
                    return reject(err)
                });
        })

    }

    get(path, returnClass, options){
        return this.request("GET", path, returnClass, options)
    }


}

export {
    Client
}