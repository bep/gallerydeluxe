'use strict';

export function newSwiper(el, callback) {
	const debug = 0 ? console.log.bind(console, '[swiper]') : function () {};

	const simulateTwoFingers = false;

	// Number of pixels between touch start/end for us to consider it a swipe.
	const moveThreshold = 50;

	const fingerDistance = (touches) => {
		return Math.hypot(touches[0].pageX - touches[1].pageX, touches[0].pageY - touches[1].pageY);
	};

	var touch = {
		touchstart: { x: -1, y: -1, x2: -1, y2: -1, d: -1 },
		touchmove: { x: -1, y: -1, x2: -1, y2: -1, d: -1 },
		multitouch: false,
	};

	// direction returns right, left, up or down  or empty if below moveThreshold.
	touch.direction = function () {
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

	touch.reset = function () {
		(this.touchstart.x = -1), (this.touchstart.y = -1);
		(this.touchmove.x = -1), (this.touchmove.y = -1);
		(this.touchstart.d = -1), (this.touchmove.d = -1);
		(this.touchstart.x2 = -1), (this.touchstart.y2 = -1);
		(this.touchmove.x2 = -1), (this.touchmove.y2 = -1);
		this.multitouch = false;
	};

	touch.update = function (event, touches) {
		this.multitouch = this.multitouch || touches.length > 1;
		if (touches.length > 1) {
			this[event.type].d = fingerDistance(touches);
			this[event.type].x2 = touches[1].pageX;
			this[event.type].y2 = touches[1].pageY;
		}
		this[event.type].x = touches[0].pageX;
		this[event.type].y = touches[0].pageY;
	};

	const pinch = function (event, touches) {
		let scale = 1;
		if (touches.length === 2) {
			// Two fingers on screen.
			if (event.scale) {
				scale = event.scale;
			} else {
				scale = touch.touchmove.d / touch.touchstart.d;
				scale = Math.round(scale * 100) / 100;
			}
			if (scale < 1) {
				scale = 1;
			}
			let distancex =
				((touch.touchmove.x + touch.touchmove.x2) / 2 - (touch.touchstart.x + touch.touchstart.x2) / 2) * 2;
			let distancey =
				((touch.touchmove.y + touch.touchmove.y2) / 2 - (touch.touchstart.y + touch.touchstart.y2) / 2) * 2;

			el.style.transform = `translate3d(${distancex}px, ${distancey}px, 0) scale(${scale})`;
			el.style.zIndex = 1000;
		} else {
			// One finger on screen.
			el.style.transform = '';
			el.style.zIndex = '';
		}
	};

	var handleTouch = function (event) {
		debug('event', event.type);
		if (typeof event !== 'undefined' && typeof event.touches !== 'undefined') {
			let touches = event.touches;

			if (simulateTwoFingers && touches.length === 1) {
				touches = [
					{ pageX: touches[0].pageX, pageY: touches[0].pageY },
					{ pageX: 0, pageY: 0 },
				];
			}
			switch (event.type) {
				case 'touchstart':
					touch.reset();
					touch.update(event, touches);
					break;
				case 'touchmove':
					touch.update(event, touches);
					pinch(event, touches);
					break;
				case 'touchend':
					el.style.transform = '';
					if (!touch.multitouch) {
						// Only consider a swipe if we have one finger on screen.
						let direction = touch.direction();
						debug('direction', direction);
						if (direction) {
							callback(direction);
						}
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
