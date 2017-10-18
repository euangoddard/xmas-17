import { h, Component } from 'preact';
import style from './style';
import { Day } from '../../components/day';
import { Intro } from '../../components/intro';

const DAY_OF_ADVENT = 25;

let windowProxy;
if (typeof window === "undefined") {
	windowProxy = {innerWidth: 1200};
} else {
	windowProxy = window;
}

export default class Home extends Component {

	state = { isMouseDown: false, x: 0, offsetX: 0 };

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
					<Intro offsetX={state.offsetX}/>
					{this.renderDays(state.offsetX)}
				</div>
			</div>
		);
	}

	startDrag = e => {
		const x = getXFromTouchOrPointer(e);
		this.setState({ isMouseDown: true, x });
	}

	endDrag = e => {
		this.setState({ isMouseDown: false });
	}

	drag = e => {
		if (this.state.isMouseDown) {
			const x = getXFromTouchOrPointer(e);
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

}

function getXFromTouchOrPointer(event) {
	let x;
	if ('touches' in event) {
		x = event.touches[0].clientX;
	} else {
		x = event.clientX;
	}
	return x;
}

function constrainNumber(number, min, max) {
	return Math.min(Math.max(number, min), max);
}