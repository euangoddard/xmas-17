import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';


export default class About extends Component {
  render() {
    console.log(style);
    return <div class={style.about}>
      <h1>About this card</h1>
      <p>
        This card was created by <a href="https://github.com/euangoddard" target="_blank">Euan Goddard</a> to celebrate Christmas 2017 and to
        learn <a href="https://preactjs.com/" target="_blank">Preact</a>. It is available as an installed progressive web app (i.e. works offline) &ndash; this was achieved
        using <a href="https://github.com/developit/preact-cli" target="_blank">Preact CLI</a>. The source code is available <a href="https://github.com/euangoddard/xmas-17" target="_blank">on github</a>.
      </p>
      <p>All images were obtained from the marvellous <a href="https://unsplash.com/search/photos/christmas" target="_blank">Unsplash</a> collection of free images.</p>
      <h2>Merry Christmas and a Happy 2018!</h2>
      <p class={style.centred}><Link href="/" class="link-button">Back to the card</Link></p>
    </div>;
  }
}