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
		for (var i = 0; i < this.game.asteroids.length; i++) {
			if (this.isCollidedWith(this.game.asteroids[i])) {
				this.game.removeAsteroid(this.game.asteroids[i]);
				this.game.removeBullet(this);
				break;
			}
		}
	};

	// Bullet.prototype.move = function() {
	// 	this.move();
	// 	// this.hitAsteroids();
	// };

})(this);