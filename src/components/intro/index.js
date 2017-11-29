import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';


export class Intro extends Component {
  render({ offsetX }) {
    return <div class={style.intro}>
      <div style={this.getStyles(offsetX)}>Scroll or drag to start your advent adventure...</div>
      <Link href="/about" class={style.about + ' link-button'}>About</Link>
    </div>;
  }

  getStyles(offsetX) {
    if (typeof window === "undefined") {
      return {};
    }
    const ratio = offsetX / window.innerWidth
    const percent = 100 * ratio;
    return {
      transform: `translate3d(${1.5 * offsetX}px, 0, ${-1.5 * percent}px)`,
      opacity: 1 - ratio,
    }
  }
}
