/*


*/



describe('Events', function() {
    it('Search', function(done) {

        var access_token = 'pEDSqxTbO9236xGa2WkrCMbZHjGRxH'
        var c = new PredictHQ.Client({ access_token : access_token})

        c.events.search()
            .then(function(results){
                expect(results.toArray().length).toEqual(10)
                done()
            })
            .catch(done)




    })

})
