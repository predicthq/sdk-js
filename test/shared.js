/*
 Shared Exports and Misc Helpers

 Usage:
 import _ from "lodash"; _.extend(global, require('./shared'))

 */

global.fetch = require('node-fetch')

import expect from 'expect'
import nock from 'nock'

// App

// Misc

// require('dotenv').config();

import dotenv from 'dotenv'
dotenv.config({silent: true})

import logger from 'loglevel'


export {
    expect,
    nock,
    logger
}
