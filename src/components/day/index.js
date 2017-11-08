import { h, Component } from 'preact';
import style from './style';
import { isFutureDate } from '../../utils/date';

export class Day extends Component {

  constructor() {
    super();
    // set initial time:
    this.state = {
      isFuture: true,
    };
  }
  componentDidMount() {
    // update time every second
    this.timer = setInterval(() => {
      const { day } = this.props;
      const date = new Date(2017, 10, day + 1);
      this.setState({ isFuture: isFutureDate(date) });
    }, 1000);
  }

  componentWillUnmount() {
    // stop when not renderable
    clearInterval(this.timer);
  }

  render({ day, offsetX }, { isFuture }) {
    const mod2Class = day % 2 === 0 ? style.cover : style.box;
    const dayClass = style[`day-${day + 1}`];
    return <div class={`${style.day} ${mod2Class} ${dayClass}`}>
      <h1 class={style.label}>{day + 1}</h1>
      <p>{isFuture.toString()}</p>
      <div class={style.background} style={this.getStyle(day, offsetX)}></div>
    </div>;
  }

  getStyle(day, offsetX) {
    if (typeof window === "undefined") {
      return {};
    }
    const relativeOffset = 20 * offsetX / window.innerWidth;
    if (20 < Math.abs(relativeOffset)) {
      // Only cause style re-paints for the current visible area
      return {};
    }

    let transform;
    if (day % 2 === 0) {
      transform = `translate3d(${relativeOffset}%, 0, 0)`;
    } else {
      transform = `rotateY(${relativeOffset}deg)`;
    }
    return { transform };
  }

  isFuture(currentTime) {
    const currentTimeDate = new Date(currentTime);

  }
}
