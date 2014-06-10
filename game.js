(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Game = Asteroids.Game = function Game(ctx)
	{
		this.ctx = ctx;
		this.DIM_X = $(window).width();
    this.DIM_Y = $(window).height();
		// this.DIM_X = 1000;
		// this.DIM_Y = 1000;
		this.asteroids = [];
		this.FPS = 30;
		this.ship = new Asteroids.Ship([500,500], 20, "blue");
		this.bullets = [];
	};

	Game.prototype.start = function (ctx) {
		var game = this;
		var timer = window.setInterval(function() {
			game.step(ctx)
			// game.stop(timer) //PUT THIS BACK IN AFTER TESTING!
		}, game.FPS);
	};

	Game.prototype.bindKeyHandlers = function() {

    var keys = key.getPressedKeyCodes();
    if (keys.indexOf(68) > -1) {
      this.ship.turn(5);
    }
    if (keys.indexOf(65) > -1) {
      this.ship.turn(-5);
    }
    if (keys.indexOf(87) > -1) {
      this.ship.power(2);
    }
    if ((keys.indexOf(32) > -1)){
      this.fireBullet();
    }
  }

	Game.prototype.addAsteroids = function(numAsteroids) {
		for(var i = 0; i < numAsteroids; i++ ) {
			var asteroid = new Asteroids.Asteroid(65, "black");
			asteroid.randomAsteroid(this.DIM_X, this.DIM_Y);
			this.asteroids.push(asteroid);
		}
	};

	Game.prototype.draw = function (ctx) {
		for (var i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].draw(ctx);
		}
		for (var i = 0; i < this.bullets.length; i++){
			this.bullets[i].draw(ctx);
		}
		this.ship.draw(ctx);
	};

	Game.prototype.move = function () {
		for (var i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].move();
		}
		for (var i = 0; i < this.bullets.length; i++){
			this.bullets[i].move();
			this.bullets[i].hitAsteroids();
		}
		this.ship.move();
	};

	Game.prototype.step = function (ctx) {
		ctx.clearRect(0 , 0, this.DIM_X, this.DIM_Y);
		this.move();
		this.draw(ctx);
		this.checkOffEdge();
		this.bindKeyHandlers();
	};

	Game.prototype.checkCollisions = function () {
		for (var i = 0; i < this.asteroids.length; i++) {
			if (this.asteroids[i].isCollidedWith(this.ship)) {
				window.alert("Game Over Loser!");
				return true;
			}
		}
		return false;
	};

	Game.prototype.stop = function (timer) {
		if (this.checkCollisions()) {
			window.clearInterval(timer);
		}
	};

	Game.prototype.checkOffEdge = function () {
		//remove bullets from the game
		for (var i = 0; i < this.bullets.length; i++) {
			if (this.bullets[i].isOffEdge(this.DIM_X, this.DIM_Y)) {
				this.bullets.splice(i, 1);
			}
		};

		var that = this;
		this.asteroids.forEach(function (asteroid) {
			if (asteroid.isOffEdge(game.DIM_X, game.DIM_Y)) {
				asteroid.wrapObject();
			}
		});
		
	};

	Game.prototype.fireBullet = function () {
		var newBullet = this.ship.fireBullet(game);
		if (newBullet) this.bullets.push(newBullet);
	};

	Game.prototype.splitAsteroids = function (newRadius, asteroid) {
		var that = this;
		var position = asteroid.pos;
		this.removeAsteroid(asteroid);
		for (var i = 0; i < 3; i++ ) {
			var asteroid = new Asteroids.Asteroid(newRadius, "red");
			asteroid.splitSmaller(position)
			that.asteroids.push(asteroid);
		}
	};

	Game.prototype.removeAsteroid = function (asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
	}

	Game.prototype.removeBullet = function(bullet) {
		this.bullets.splice(this.bullets.indexOf(bullet), 1);
	};

	// Game.prototype.start = function (ctx) {
	// 	var game = this;
	// 	// game.bindKeyHandlers();
	// 	var timer = window.setInterval(function() {
	// 		game.step(ctx)
	// 		game.stop(timer)
	// 	}, game.FPS);
	// };
})(this);