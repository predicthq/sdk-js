import {_, logger} from "./utils"

import Events from "./endpoints/v1/events"

require('es6-promise').polyfill();
require('isomorphic-fetch');

var YouAreI = require('youarei')

let log = logger.getLogger("predicthq.client")

class Client {

    constructor(options){
        this.baseUrl = 'http://api.local.phq.io'
        this.options = options

        this.events = new Events(this)

    }

    request(method, path, returnClass, options){

        let access_token = this.options.access_token

        let uri = new YouAreI(`${this.baseUrl}${path}`)

        // uri.query_push({})

        log.info('client.request', method, uri.to_string())

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