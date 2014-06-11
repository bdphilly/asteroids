(function(root) {

	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var MovingObject = Asteroids.MovingObject;

	var Bullet = Asteroids.Bullet = function (pos, vel, radius, color, game) {
		this.pos = pos;
		this.vel = vel;
		this.radius = radius;
		this.color = color;
		this.game = game;
	}

	// Function.prototype.inherits = function(superClass) {
	// 	function Surrogate() {};
	// 	Surrogate.prototype = superClass.prototype;
	// 	this.prototype = new Surrogate();
	// };

	Bullet.inherits(MovingObject);

	Bullet.prototype.hitAsteroids = function() {
		var bullet = this;
		var game = this.game;
		game.asteroids.forEach(function (asteroid) {
			// if (that.isCollidedWith(asteroid)) {
			// 	that.game.removeAsteroid(asteroid);
			// 	that.game.removeBullet(that);
			// }
			if (bullet.isCollidedWith(asteroid)) {
				game.removeBullet(bullet);
				if (asteroid.radius == 65) {
					game.addAsteroids(1);
					game.splitAsteroids(40, asteroid);
					game.score += 3;
				} else if (asteroid.radius == 40) {
					game.splitAsteroids(10, asteroid)
					game.score += 6;
				} else {
					game.removeAsteroid(asteroid);
					game.score += 10;
				}
			}
		});
	};

	// Bullet.prototype.move = function() {
	// 	this.move();
	// 	// this.hitAsteroids();
	// };

})(this);