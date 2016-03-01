/*
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Event Search Schema",
    "type": "object",
    "properties": {
    "start": {
        "type": "string",
            "pattern": "^([0-9]{4})-[0-9]{2}-[0-9]{2}$"
    },
    "category": {
        "items": {
            "enum": [
                "school-holidays",
                "public-holidays",
                "observances",
                "concerts",
                "conferences",
                "expos",
                "festivals",
                "performing-arts",
                "sports",
                "daylight-savings",
                "airport-delays",
                "severe-weather",
                "disasters"
            ]
        },
        "type": "array"
    }
},
    "required": [

]
}

    */

/*

 // https://github.com/tdegrunt/jsonschema

 var Validator = require('jsonschema').Validator;
 var v = new Validator();


 var fs = require('fs');
 var schema = JSON.parse(fs.readFileSync('event_schema.json', 'utf8'));


 data = { category : ["conferences", "expos"],start : '2015-01-01'}

 console.log(v.validate(data, schema));


 */