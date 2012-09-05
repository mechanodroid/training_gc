var should = require('should'),
  console = require('console');

describe('Create a Game', function() {

  //setup --------------------------------------
  beforeEach(function(done) {

    done();
  });

  //teardown --------------------------------------
  afterEach(function(done) {

    done();
  });


  it('should create a game instance', function(done) {

    var game = {
      name: "Fake Game",
      categories: ["rpg"],
      maxPlayers: 4,
      minPlayers: 1
    };

    training.api.game.save({doc: game}, function(err, result) {
      if (err) {
        console.log(err.message);
        should.fail('There was an error saving the game: ' + err);
      } else {
        result.should.have.property('name');
        result.should.have.property('categories');
        result.should.have.property('maxPlayers');
        result.should.have.property('minPlayers');
        result.name.should.equal(game.name);
        result.categories.should.eql(game.categories);
        result.maxPlayers.should.equal(game.maxPlayers);
        result.minPlayers.should.equal(game.minPlayers);
      }

      done();

    });

    
  });

});