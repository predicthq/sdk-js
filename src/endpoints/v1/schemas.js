/*
    Statically load schemas, this ensure it's compiled for browser correctly
*/

// Must use require (using import breaks brfs)
var fs = require('fs')

const EventSchema = JSON.parse(fs.readFileSync(__dirname + '/schemas/events.json', 'utf8'))

const PlaceSchema = JSON.parse(fs.readFileSync(__dirname + '/schemas/places.json', 'utf8'))

export { EventSchema, PlaceSchema }
