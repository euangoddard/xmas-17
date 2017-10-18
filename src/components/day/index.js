import { h, Component } from 'preact';
import style from './style';


export class Day extends Component {
  render({day, offsetX}) {
    const mod2Class = day % 2 === 0 ? style.cover: style.box;
    const dayClass = style[`day-${day + 1}`];
    return <div class={`${style.day} ${mod2Class} ${dayClass}`}>
      <h1 class={style.label}>{day + 1}</h1>
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
    return {transform};
  }
}
