/*


*/


var q = (new YouAreI(window.location.href)).query_get()

var access_token = q.token
var endpoint = q.endpoint

describe('Events', function() {
    it('Search', function(done) {

        var c = new PredictHQ.Client({ access_token : access_token, endpoint: endpoint})

        c.events.search()
            .then(function(results){
                expect(results.toArray().length).toEqual(10)
                done()
            })
            .catch(done)

    })

})
