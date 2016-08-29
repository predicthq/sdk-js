/*


*/


var q = (new YouAreI(window.location.href)).query_get()

var testAccessToken = q.token
var testAccountId = q.account_id
var endpoint = q.endpoint

describe('Events', function() {
    it('Search', function(done) {
console.info('q', testAccountId)
        var c = new PredictHQ.Client({ access_token : testAccessToken, endpoint: endpoint})

        c.events.for_account(testAccountId).search()
            .then(function(results){
                expect(results.toArray().length).toEqual(10)
                done()
            })
            .catch(done)

    })

})
