(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Game = Asteroids.Game = function Game(ctx)
	{
		this.ctx = ctx;
		this.DIM_X = 500;
		this.DIM_Y = 500;
		this.asteroids = [];
		this.FPS = 50;
	};

	Game.prototype.addAsteroids = function(numAsteroids) {
		for(var i = 0; i < numAsteroids; i++ ) {
			var asteroid = new Asteroids.Asteroid((100 * Math.random()), "black");
			asteroid.randomAsteroid(this.DIM_X, this.DIM_Y);
			this.asteroids.push(asteroid);
		}
	};

	Game.prototype.draw = function (ctx) {
		for (var i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].draw(ctx);
		}
	};

	Game.prototype.move = function () {
		for (var i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].move();
		}
	};

	Game.prototype.step = function (ctx) {
		ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
		this.move();
		this.draw(ctx);
	};

	Game.prototype.start = function (ctx) {
		var game = this;
		window.setInterval(function() {
			game.step(ctx)
		}, game.FPS);
	};


})(this);