var should = require('should'),
  activeGames = require('../../lib/data/activeGames');

describe('Active Games Registry Tests', function() {

  //setup --------------------------------------
  beforeEach(function(done) {

    done();
  });

  //teardown --------------------------------------
  afterEach(function(done) {
    activeGames.removeAll();
    done();
  });

  it('should return the active games list', function(done) {
    true.should.equal(true, 'returned the list of games');
    done();
  });

  // Test empty list
  it('should return empty list', function(done) {

    var list = activeGames.findAll(function(game){return true;});
    list.length.should.equal(0, 'expecting empty list');
    
    done();
  });

  // Test adding one item
  it('should add item to list', function(done) {

    var list = activeGames.findAll(function(game){return true;});
    list.length.should.equal(0, 'expecting empty list');
    activeGames.add("jdoe", 0);
    list = activeGames.findAll(function(game){return true;});
    list.length.should.equal(1, 'expecting list of 1');
    
    done();
  });

  // Test adding an unrecognized game
  it('should fail because the game is not found', function(done) {

    var list = activeGames.findAll(function(game){return true;});
    list.length.should.equal(0, 'expecting empty list');

    try {
      debugger;
      activeGames.add("jdoe", -1);
      true.should.equal(false, 'expecting join to throw an error');
    } catch (err) {
      err.message.should.eql("Unable to find the requested game.", 'expecting error message');
    }
    
    done();
  });

  // Test joining a nonexistent game
  it('should fail because the game is not found', function(done) {

    var list = activeGames.findAll(function(game){return true;});
    list.length.should.equal(0, 'expecting empty list');

    try {
      activeGames.join("jdoe", -1);
      true.should.equal(false, 'expecting join to throw an error');
    } catch (err) {
      err.message.should.equal("That game is not found.", 'expecting error message');
    }
    
    done();
  });

  // Test join
  it('should add item to list', function(done) {

    var list = activeGames.findAll(function(game){return true;});
    list.length.should.equal(0, 'expecting empty list');

    activeGames.add("jdoe", 2);
    list = activeGames.findAll(function(game){return true;});
    list.length.should.equal(1, 'expecting list of 1');
    var game = activeGames.find(function(game){return (game.name == 'Chess')});
    game.inProgress.should.equal(false, 'expecting inProgress to be false');
    game.acceptingNewPlayers.should.equal(true, 'expecting acceptingNewPlayers to be true');

    // Join when the game is waiting for player 2
    //debugger;
    activeGames.join("ssmith", game.id);
    list = activeGames.findAll(function(game){return true;});
    list.length.should.equal(1, 'expecting list of 1');
    game.users.length.should.equal(2, 'expecting list of 2 users');
    game.inProgress.should.equal(true, 'expecting inProgress to be true');
    game.acceptingNewPlayers.should.equal(false, 'expecting acceptingNewPlayers to be false');
    
    // Try to join when the game is full
    try {
      activeGames.join("ssmith", game.id);
      true.should.equal(false, 'expecting join to throw an error');
    } catch (err) {
      err.message.should.equal("You have already joined this game.", 'expecting error message');
    }

    try {
      activeGames.join("someoneelse", game.id);
      true.should.equal(false, 'expecting join to throw an error');
    } catch (err) {
      err.message.should.equal("That game is no longer open for new players.", 'expecting error message');
    }

    activeGames.leave("ssmith", game.id)
    list = activeGames.findAll(function(game){return true;});
    list.length.should.equal(1, 'expecting list of 1');
    var game = activeGames.find(function(game){return (game.name == 'Chess')});
    game.inProgress.should.equal(false, 'expecting inProgress to be false');
    game.acceptingNewPlayers.should.equal(true, 'expecting acceptingNewPlayers to be true');

    done();
  });
});