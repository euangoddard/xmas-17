import { h, Component } from 'preact';
import style from './style';
import { Day } from '../../components/day';
import { Intro } from '../../components/intro';

const DAY_OF_ADVENT = 25;

const FRICTION = 0.95;
const STOP_THRESHOLD = 0.3;

let windowProxy;
if (typeof window === "undefined") {
	windowProxy = { innerWidth: 1200 };
} else {
	windowProxy = window;
}

export default class Home extends Component {

	state = { isMouseDown: false, x: 0, offsetX: 0, trackingPoints: [], decVelX: 0 };

	render(props, state) {
		return (
			<div
				class="fullscreen container"
				onTouchStart={this.startDrag}
				onTouchEnd={this.endDrag}
				onTouchMove={this.drag}
				onMouseDown={this.startDrag}
				onMouseUp={this.endDrag}
				onMouseMove={this.drag}
				onMouseWheel={this.scroll}
				onMouseLeave={this.endDrag}
			>
				<div
					class={`fullscreen ${style.days} ${this.grabbingClass}`}
					style={this.getTransform(state)}
				>
					<Intro offsetX={state.offsetX} />
					{this.renderDays(state.offsetX)}
				</div>
			</div>
		);
	}

	startDrag = e => {
		const x = getXFromTouchOrPointer(e);
		this.setState({ isMouseDown: true, x, trackingPoints: [] });
	}

	endDrag = e => {
		const x = getXFromTouchOrPointer(e);
		this.addTrackingPoint(x);
		this.setState({ isMouseDown: false });
		this.startDeceleration();
	}

	drag = e => {
		if (this.state.isMouseDown) {
			const x = getXFromTouchOrPointer(e);
			this.addTrackingPoint(x);
			const delta = this.state.x - x;
			this.setState({ x });
			this.updateOffset(delta);
		}
	}

	scroll = e => {
		e.preventDefault();
		const delta = e.deltaX + e.deltaY;
		this.updateOffset(delta);
	}

	addTrackingPoint(x) {
		const time = Date.now();
		const trackingPoints = [...this.state.trackingPoints];
		while (trackingPoints.length > 0) {
			if (time - trackingPoints[0].time <= 100) {
				break;
			}
			trackingPoints.shift();
		}
		trackingPoints.push({ x, time })
		this.setState({trackingPoints});
	}

	updateOffset(delta) {
		const offsetX = constrainNumber(this.state.offsetX + delta, 0, windowProxy.innerWidth * DAY_OF_ADVENT);
		this.setState({ offsetX });
	}

	getTransform({ offsetX }) {
		return { transform: `translate3d(${-1 * offsetX}px, 0, 0)` };
	}

	renderDays(offsetX) {
		const days = [];
		const windowWidth = windowProxy.innerWidth;
		for (let i = 0; i < DAY_OF_ADVENT; i++) {
			const dayOffsetX = offsetX - windowWidth * (i + 1);
			days.push(<Day day={i} offsetX={dayOffsetX} />);
		}
		return days;
	}

	get grabbingClass() {
		return this.state.isMouseDown ? style.grabbing : '';
	}

	// Deceleration
	startDeceleration() {
		const { trackingPoints } = this.state;
		const firstPoint = trackingPoints[0];
		const lastPoint = trackingPoints[trackingPoints.length - 1];

		var xOffset = lastPoint.x - firstPoint.x;
		var timeOffset = lastPoint.time - firstPoint.time;

		const D = (timeOffset / 15);

		const decVelX = (xOffset / D) || 0; // prevent NaN

		let decelerating = false;
		if (Math.abs(decVelX) > 1) {
			decelerating = true;
			requestAnimationFrame(this.stepDeceleration.bind(this));
		}
		this.setState({ decelerating, decVelX });
	}

	stepDeceleration() {
		if (!this.state.decelerating) {
			return;
		}

		const decVelX = this.state.decVelX * FRICTION;
		if (Math.abs(decVelX) > STOP_THRESHOLD) {
			this.updateOffset(-1 * decVelX);

			requestAnimationFrame(this.stepDeceleration.bind(this));
			this.setState({decVelX});
		} else {
			this.setState({decelerating: false});
		}
	}

}

function getXFromTouchOrPointer(event) {
	let x;
	if ('touches' in event) {
		try {
			x = event.changedTouches[0].clientX;
		} catch (e) {
			console.log(event);
		}
		
	} else {
		x = event.clientX;
	}
	return x;
}

function constrainNumber(number, min, max) {
	return Math.min(Math.max(number, min), max);
}