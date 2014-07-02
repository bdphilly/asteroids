(function(root) {

	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var MovingObject = Asteroids.MovingObject;

	var Star = Asteroids.Star = function (pos, vel) {
		Asteroids.MovingObject.call(this, pos, vel)
		this.vel = [Math.random() * .2 , Math.random() * .2];
		this.radius = 1;
		this.color = "white";
	};

	Star.inherits(MovingObject);

})(this);