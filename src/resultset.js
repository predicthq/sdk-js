/*

*/

import "core-js/es6/symbol"

class ResultSet {
    constructor(result){
        this.result  = result
    }

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
    ResultSet
}