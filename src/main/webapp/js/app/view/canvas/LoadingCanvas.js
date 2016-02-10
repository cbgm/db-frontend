define([
	'util/Configuration'
], function (
	Configuration
) {
	'use strict';

	return function () {
		var _canvas = document.createElement('canvas'),
			_context = _canvas.getContext('2d'),
			_rotateAngle = 0,
			_animate = false;

		_context.canvas.width = 100;
		_context.canvas.height = 100;

		// private methods

		function draw() {
			_context.save();
			_context.translate(50, 50);
			_context.rotate(_rotateAngle * Math.PI/180);
			_context.translate(-50, -50);
			_context.beginPath();

			_context.strokeStyle = "rgba(87,87,87,1)";
			_context.lineWidth = 1;
			_context.lineCap = "round";

			_context.fillStyle = "rgba(87,87,87,1)";
			_context.moveTo(50, 25);
			_context.lineTo(50, 40);
			_context.stroke();

			_context.strokeStyle = "rgba(87,87,87,0.8)";
			_context.moveTo(33, 33);
			_context.lineTo(43, 43);
			_context.stroke();

			_context.strokeStyle = "rgba(87,87,87,0.7)";
			_context.moveTo(25, 50);
			_context.lineTo(40, 50);
			_context.stroke();

			_context.strokeStyle = "rgba(87,87,87,0.6)";
			_context.moveTo(33, 67);
			_context.lineTo(43, 57);
			_context.stroke();

			_context.strokeStyle = "rgba(87,87,87,0.5)";
			_context.moveTo(50, 75);
			_context.lineTo(50, 60);
			_context.stroke();

			_context.strokeStyle = "rgba(87,87,87,0.4)";
			_context.moveTo(67, 67);
			_context.lineTo(57, 57);
			_context.stroke();

			_context.strokeStyle = "rgba(87,87,87,0.3)";
			_context.moveTo(75, 50);
			_context.lineTo(60, 50);
			_context.stroke();

			_context.strokeStyle = "rgba(87,87,87,0.2)";
			_context.moveTo(67, 33);
			_context.lineTo(57, 43);
			_context.stroke();

			_context.closePath();

			_context.save();
			_context.restore();

			setTimeout(function () {
				if (_animate) {
					_canvas.width = _canvas.width;

					_rotateAngle += 5;

					if (_rotateAngle > 360) {
						_rotateAngle = 5;
					}

					draw();
				}
			}, Configuration.get('LOADING_CANVAS_SPEED'));
		}

		// public methods

		this.get = function () {
			return _canvas;
		};

		this.disable = function () {
			_animate = false;
		};

		this.animate = function () {
			_animate = true;
			draw();
		};
	};
});