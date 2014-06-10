(function(root) {

	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var MovingObject = Asteroids.MovingObject;

	

	var Star = Asteroids.Star = function (pos, vel) {
		Asteroids.MovingObject.call(this, pos, vel)
		// this.pos = pos;
		this.vel = [5,5];
		this.radius = 1;
		this.color = "white";
		// this.game = game;

		// this.radius = radius;
		// this.pos = pos;
		// this.color = color;
	};

	Star.inherits(MovingObject);

	// Star.prototype.power = function(impulse) {
	// 	this.vel[0] += impulse[0];
	// 	this.vel[1] += impulse[1];
	// };

})(this);