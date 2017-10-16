import { h, Component } from 'preact';
import style from './style';

export class Intro extends Component {
  render({offsetX}) {
    return <div class={style.intro}>
      <div style={this.getStyles(offsetX)}>Scroll to start your advent adventure...</div>
    </div>;
  }

  getStyles(offsetX) {
    const ratio = offsetX / window.innerWidth
    const percent = 100 * ratio;
    return {
      transform: `translate3d(${1.5 * offsetX}px, 0, ${-1.5 * percent}px)`,
      opacity: 1 - ratio,
    }
  }
}
