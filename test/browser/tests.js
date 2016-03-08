/*


*/



describe('Events', function() {
    it('Search', function(done) {

        var access_token = null
        var c = new PredictHQ.Client({ access_token : access_token})

        c.events.search()
            .then(function(results){
                expect(results.toArray().length).toEqual(10)
                done()
            })
            .catch(done)




    })

})
