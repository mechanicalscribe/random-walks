!function() {

	function randomWalks(container, runs) {
		var c = document.createElement("canvas");
		var canvas = document.getElementById(container).appendChild(c);
		var context = canvas.getContext('2d');
		// canvas.height = 600;
		// canvas.width = 600;

		// let's make the data for the image first.
		var points = [[0,0]];
		var x = 0;
		var y = 0;
		var MARGIN = 5;

		var x_min = 0, x_max = 0; y_min = 0, y_max = 0;

		for (var n = 0; n < runs; n += 1) {
			var movement = Math.random() < 0.5? -1 : 1;
			if (n % 2 == 0) {
				x += movement;
			} else {
				y += movement;
			}
			x_min = Math.min(x_min, x);
			x_max = Math.max(x_max, x);
			y_min = Math.min(y_min, y);
			y_max = Math.max(y_max, y);
			points.push([x,y]);
		}

		draw(points);

		function draw(points) {
			var native_width = x_max - x_min + MARGIN * 2;
			var native_height = y_max - y_min + MARGIN * 2;
			var real_width = document.getElementById(container).offsetWidth;
			console.log(native_width, native_height, real_width);

			canvas.width = native_width;
			canvas.height = native_height;

			// var scale = document.getElementById(container).innerWidth / native_width;
			// context.scale(scale, scale);

			context.strokeStyle = 'rgba(0, 0, 0, 0.25)';

			var x = 0 - x_min + MARGIN, y = 0 - y_min + MARGIN;

			points.forEach(function(point) {
				context.beginPath();
				context.moveTo(x, y);
				x = point[0] - x_min + MARGIN;
				y = point[1] - y_min + MARGIN;
				context.lineTo(x, y);
				context.stroke();		
			});		
		}
	}

    // if browserify
    if (typeof module === "object" && module.exports) {
        module.exports = randomWalks;
    } else window.randomWalks = randomWalks;   

}();