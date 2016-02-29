
import {ResultSet} from "../../resultset"

class EventResultSet extends ResultSet { }

class Events {

    constructor(client){
        this.client = client

    }

    search(options){

        options = options || {}

        return this.client.get('/v1/events', EventResultSet, options)
    }

}

export default Events