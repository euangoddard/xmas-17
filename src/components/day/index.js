import { h, Component } from 'preact';
import style from './style';
import { isFutureDate, formatDateDelta } from '../../utils/date';
import { OPEN_STATE } from '../../utils/opens-state';


export class Day extends Component {

  constructor() {
    super();
    this.state = {
      isFuture: true,
      deltaFormatted: null,
      isOpened: false,
    };
  }
  componentDidMount() {
    this.setState({ isOpened: OPEN_STATE.opens[this.props.day] });
    this.timer = setInterval(() => {
      const isFuture = isFutureDate(this.date);
      if (this.state.isFuture !== isFuture) {
        this.setState({ isFuture });
      }
      if (isFuture) {
        const delta = this.date - new Date();
        const deltaFormatted = formatDateDelta(delta);
        if (this.state.deltaFormatted !== deltaFormatted) {
          this.setState({ deltaFormatted });
        }
      }

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render({ day, offsetX }, state) {
    const mod2Class = day % 2 === 0 ? style.cover : style.box;
    const dayClass = style[`day-${day + 1}`];
    return <div class={`${style.day} ${mod2Class} ${dayClass}`}>
      <h1 class={style.label}>{day + 1}</h1>
      <div class={style.background} style={this.getStyle(day, offsetX)}></div>
      {this.renderGaurd(state)}
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

  renderGaurd({ isFuture, deltaFormatted, isOpened }) {
    const content = isFuture ? <p>Open in {deltaFormatted}</p> : <button type="button" onClick={this.open}>Open</button>;
    if (!isOpened) {
      return <div class={style.guard}>
        <h1>{this.props.day + 1} Dec</h1>
        {content}
      </div>;
    }

  }

  open = e => {
    OPEN_STATE.openDay(this.props.day);
    this.setState({ isOpened: true });
  }

  get date() {
    const { day } = this.props;
    const date = new Date(2017, 10, day + 1);
    return date;
  }
}
