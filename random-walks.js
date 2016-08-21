!function() {
	function randomWalks(container, runs) {
		var c = document.createElement("canvas");
		var canvas = document.getElementById(container).appendChild(c);
		var context = canvas.getContext('2d');
		// canvas.height = 600;
		// canvas.width = 600;

		// let's make the data for the image first.
		var points = points || [[0,0]];
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

		function draw(points) {
			var native_width = x_max - x_min + MARGIN * 2;
			var native_height = y_max - y_min + MARGIN * 2;
			var real_width = document.getElementById(container).offsetWidth;
			if (real_width < native_width) {
				var scale = real_width / native_width;
				canvas.width = real_width;
				canvas.height = native_height * scale;
				context.scale(scale, scale);
			} else {
				canvas.width = native_width;
				canvas.height = native_height;
			}


			var x = points[0][0] - x_min + MARGIN, y = points[0][1] - y_min + MARGIN;

			points.forEach(function(point, p) {
				context.strokeStyle = numberToColorHsl(100 * p / points.length, 0.25);
				context.beginPath();
				context.moveTo(x, y);
				x = point[0] - x_min + MARGIN;
				y = point[1] - y_min + MARGIN;
				context.lineTo(x, y);
				context.stroke();		
			});		
		}

		function update(steps) {
			for (var n = 0; n < steps; n += 1) {
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
				points.shift();
				points.push([x,y]);
			}
			draw(points);
		}

		function animate(steps, interval) {
			setInterval(function() {
				update(steps);
			}, interval);
		}

		draw(points);

		return {
			update: update,
			animate: animate
		}
	}

	// thx, http://stackoverflow.com/questions/17525215/calculate-color-values-from-green-to-red
	function hslToRgb(h, s, l){
	    var r, g, b;

	    if(s == 0){
	        r = g = b = l; // achromatic
	    }else{
	        function hue2rgb(p, q, t){
	            if(t < 0) t += 1;
	            if(t > 1) t -= 1;
	            if(t < 1/6) return p + (q - p) * 6 * t;
	            if(t < 1/2) return q;
	            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	            return p;
	        }

	        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	        var p = 2 * l - q;
	        r = hue2rgb(p, q, h + 1/3);
	        g = hue2rgb(p, q, h);
	        b = hue2rgb(p, q, h - 1/3);
	    }

	    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
	}


	function numberToColorHsl(i, opacity) {
	    // as the function expects a value between 0 and 1, and red = 0° and green = 120°
	    // we convert the input to the appropriate hue value
	    var hue = i * 1.2 / 360;
	    // we convert hsl to rgb (saturation 100%, lightness 50%)
	    var rgb = hslToRgb(hue, 1, .5);
	    // we format to css value and return
	    return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + opacity + ')'; 
	}

    // if browserify
    if (typeof module === "object" && module.exports) {
        module.exports = randomWalks;
    } else window.randomWalks = randomWalks;   

}();