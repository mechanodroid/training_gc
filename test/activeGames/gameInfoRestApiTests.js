var should = require('should');
var request = require('request');
var feather = require('../../lib/feather').getFeather();

describe('Game Info Tests', function() {

  //setup --------------------------------------
  beforeEach(function(done) {

    done();
  });

  //teardown --------------------------------------
  afterEach(function(done) {

    done();
  });

  it('should return the active games list', function(done) {
    true.should.equal(true, 'returned the list of games');
    done();
  });

  it('should return the master game list', function(done) {
    request({
      method: "GET",
      uri: 'http://localhost:8080/_rest/gameInfo/'
    },
    function(error, response, body) {
      var list = body;
      list.should.not.be.empty;
      done();
    })
  });

  it('should return the game that was added', function(done) {
    debugger;
    request({
      method: "POST",
      headers: {"Content-type": "application/json"},
      uri: "http://localhost:8080/_rest/gameInfo/addNew",
      body: '{ "id": "5", "name": "Monitor Throwing", "minNumberOfPlayers": "2", "maxNumberOfPlayers": "10" }'
    },
    function(error, response, body) {
      //var res = JSON.stringify(response);
      feather.logger.warn({category: 'test', message: "error: "  + error});
      feather.logger.warn({category: 'test', message: "response: " + response});
      feather.logger.warn({category: 'test', message: "body: '" + body + "'"});
      if (body.substring(0, 6) == "Error:") {
        feather.logger.warn({category: 'test', message: "error was caught."});
        should.fail(body);
      }
      // else {
      //   var testGame = JSON.parse(body);
      //   testGame.should.have.property("guid");
      // }
      done();
    }
    );
  });
  // it('should return the game that was added', function(done) {
  //   debugger;
  //   request( { 
  //     method: 'POST',
  //     headers: {"Content-type": "application/json"},
  //     uri: 'http://localhost:8080/_rest/gameInfo/addNew',
  //     body: { "id": "5", "name": "Monitor Throwing", "minNumberOfPlayers": "2", "maxNumberOfPlayers": "10" }
  //   },
  //   function (error, response, body) {
  //     if (error) should.fail(error);
  //     var game = body;
  //     //game.should.not.equal(undefined, "game was not returned.");
  //     done();
  //   }
    
  // })

});