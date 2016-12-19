/*

*/

import "core-js/es6/symbol"

class Result {
    constructor(result) {
        this.result = result
    }

    toDict(){
        return this.result
    }
}


class ResultSet extends Result {

    toArray(){
        return this.result.results
    }

    [Symbol.iterator]() {
        let index = -1
        let data = this.result.results

        return {
            next: () => ({ value: data[++index], done: index == data.length})
        }
    }

}

export {
    Result,
    ResultSet
}