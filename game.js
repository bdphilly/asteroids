(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Game = Asteroids.Game = function Game(ctx, difficulty)
	{
		this.ctx = ctx;
		this.DIM_X = $(window).width();
    this.DIM_Y = $(window).height();
		this.asteroids = [];
		this.FPS = 30;
		this.ship = new Asteroids.Ship([this.DIM_X / 2, this.DIM_Y / 2], 13);
		this.bullets = [];
		this.stars = [];
		this.generateStars(300);
		this.addAsteroids(5);
		this.score = 0;
		this.difficulty = difficulty;
	};

	Game.prototype.start = function (ctx) {
		var game = this;
		var timer = window.setInterval(function() {
			game.step(ctx)
			// game.stop(timer) //PUT THIS BACK IN AFTER TESTING!
		}, game.FPS);
	};

	Game.prototype.generateStars = function (numStars) {
		for (var i = 0; i < numStars; i++) {
			var position = ([Math.random() * this.DIM_X, Math.random() * this.DIM_Y])
			var star = new Asteroids.Star(position);
			this.stars.push(star);
			// debugger
		}
	};

	Game.prototype.bindKeyHandlers = function() {

    var keys = key.getPressedKeyCodes();
    if ((keys.indexOf(68) > -1) || (keys.indexOf(39) > -1)) {
      this.ship.turn(5);
    }
    if ((keys.indexOf(65) > -1) || (keys.indexOf(37) > -1)) {
      this.ship.turn(-5);
    }
    if ((keys.indexOf(87) > -1) || (keys.indexOf(38)) > -1){
      this.ship.power(2);
    }
    if ((keys.indexOf(83) > -1) || (keys.indexOf(40) > -1)) {
      this.ship.power(-1);
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
		this.stars.forEach(function (star) {
			star.draw(ctx);
		});

		for (var i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].draw(ctx);
		}
		
		for (var i = 0; i < this.bullets.length; i++){
			this.bullets[i].draw(ctx);
		}

		this.ship.draw(ctx);

		this.drawScore();

	};

	Game.prototype.drawScore = function () {
		this.ctx.fillStyle = "white";
    this.ctx.font = "bold 28px subatomic";
    // this.ctx.xCoord = 50;
		this.ctx.fillText("SCORE:", 50, 50);
		this.ctx.font = "bold 28px subatomic";
		this.ctx.fillStyle = "blue";
		this.ctx.fillText(this.score, 180, 50);
	};

	Game.prototype.move = function () {
		this.stars.forEach(function (star) {
			star.move();
		});

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
		var game = this;
		for (var i = 0; i < this.stars.length; i++) {
			if (this.stars[i].isOffEdge(game)) {
				this.stars.splice(i, 1);
				this.generateStars(1);
			}
		};

		for (var i = 0; i < this.bullets.length; i++) {
			if (this.bullets[i].isOffEdge(game)) {
				this.bullets.splice(i, 1);
			}
		};

		this.asteroids.forEach(function (asteroid) {
			if (asteroid.isOffEdge(game)) {
				asteroid.wrapObject(game);
			}
		});

		if (this.ship.isOffEdge(game)) {
			this.ship.wrapObject(game);
		};
				
	};

	Game.prototype.fireBullet = function () {
		// var newBullet = this.ship.fireBullet(game);
		// if (newBullet) this.bullets.push(newBullet);

		if (this.ship.shipCharged) {
			var newBullet = this.ship.fireBullet(this);
			this.bullets.push(newBullet);
		}

	};

	Game.prototype.splitAsteroids = function (newRadius, asteroid) {
		var that = this;
		var position = asteroid.pos;
		this.removeAsteroid(asteroid);

		for (var i = 0; i < this.difficulty; i++ ) {
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