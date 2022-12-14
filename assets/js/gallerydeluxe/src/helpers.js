'use strict';

export function newSwiper(el, callback) {
	// Number of pixels between touch start/end for us to consider it a swipe.
	const moveThreshold = 50;

	var touches = {
		touchstart: { x: -1, y: -1 },
		touchmove: { x: -1, y: -1 },
	};

	// direction returns right, left, up or down  or empty if below moveThreshold.
	touches.direction = function () {
		if (this.touchmove.x == -1) {
			// A regular click.
			return '';
		}

		let distancex = this.touchmove.x - this.touchstart.x;
		if (Math.abs(distancex) < moveThreshold) {
			let distancey = this.touchmove.y - this.touchstart.y;
			if (Math.abs(distancey) < moveThreshold) {
				return '';
			}
			return distancey > 0 ? 'down' : 'up';
		}
		return distancex > 0 ? 'right' : 'left';
	};

	touches.reset = function () {
		(this.touchstart.x = -1), (this.touchstart.y = -1);
		(this.touchmove.x = -1), (this.touchmove.y = -1);
	};

	touches.update = function (event, touch) {
		this[event.type].x = touch.pageX;
		this[event.type].y = touch.pageY;
	};

	var handleTouch = function (event) {
		if (typeof event !== 'undefined' && typeof event.touches !== 'undefined') {
			var touch = event.touches[0];
			switch (event.type) {
				case 'touchstart':
					touches.reset();
					touches.update(event, touch);
					break;
				case 'touchmove':
					touches.update(event, touch);
					break;
				case 'touchend':
					let direction = touches.direction();
					if (direction) {
						callback(direction);
					}
					break;
				default:
					break;
			}
		}
	};

	el.addEventListener('touchstart', handleTouch, { passive: true });
	el.addEventListener('touchmove', handleTouch, { passive: true });
	el.addEventListener('touchend', handleTouch, { passive: true });
}
