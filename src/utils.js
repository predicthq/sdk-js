/*
 Common Utils

 */

import logger from 'loglevel'

import * as lodash from "../dist/lodash.custom"

export const _ = lodash

// temp until fix src/** is found
_.mixin
_.fromPairs
_.indexOf
_.isArray
_.isString
_.map
_.toPairs
_.trim


export { logger }
