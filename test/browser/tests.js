/*


*/

var access_token = window.location.href.split('token=')[1];


describe('Events', function() {
    it('Search', function(done) {

        var c = new PredictHQ.Client({ access_token : access_token})

        /*
        c.events.search()
            .then(function(results){
                expect(results.toArray().length).toEqual(10)
                done()
            })
            .catch(done)
        */



    })

})
