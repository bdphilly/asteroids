(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Game = Asteroids.Game = function Game(ctx)
	{
		this.ctx = ctx;
		this.DIM_X = 1000;
		this.DIM_Y = 1000;
		this.asteroids = [];
		this.FPS = 10;
		this.ship = new Asteroids.Ship([500,500], 20, "blue");
	};

	Game.prototype.addAsteroids = function(numAsteroids) {
		for(var i = 0; i < numAsteroids; i++ ) {
			var asteroid = new Asteroids.Asteroid((50 * Math.random()), "black");
			asteroid.randomAsteroid(this.DIM_X, this.DIM_Y);
			this.asteroids.push(asteroid);
		}
	};

	Game.prototype.draw = function (ctx) {
		for (var i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].draw(ctx);
		}
		this.ship.draw(ctx);

	};

	Game.prototype.move = function () {
		for (var i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].move();
		}
		this.ship.move();
	};

	Game.prototype.step = function (ctx) {
		ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
		this.move();
		this.draw(ctx);
		this.checkOffEdge();
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
		// debugger
		for (var i = 0; i < this.asteroids.length; i++) {
			if (this.asteroids[i].isOffEdge(this.DIM_X, this.DIM_Y)) {
				delete(this.asteroids[i]);
				//at some point, might want to generate from edge or have wrap around
				this.asteroids[i] = new Asteroids.Asteroid((100 * Math.random()), "black");
				this.asteroids[i].randomAsteroid(this.DIM_X, this.DIM_Y);
			}
		}
	};

	Game.prototype.start = function (ctx) {
		var game = this;
		var timer = window.setInterval(function() {
			game.step(ctx)
			game.stop(timer)
		}, game.FPS);
	};



})(this);