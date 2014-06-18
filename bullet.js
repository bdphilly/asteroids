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

	Bullet.inherits(MovingObject);

	Bullet.prototype.hitAsteroids = function() {
		var bullet = this;
		var game = this.game;
		game.asteroids.forEach(function (asteroid) {

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

})(this);