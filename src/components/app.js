import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Home from '../routes/home';
import About from '../routes/about';

const TRACKING_ID = 'UA-110442895-1';

export default class App extends Component {

  componentDidMount() {
    if (typeof window !== 'undefined"' && typeof document !== 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`;
      document.head.appendChild(script);
      this.gtag('js', new Date());
      this.gtag('config', TRACKING_ID, { send_page_view: false });
    }
  }

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
    this.gtag('config', TRACKING_ID, { page_path: e.url });
  };

  render() {
    return (
      <div id="app">
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <About path="/about" />
        </Router>
      </div>
    );
  }

  gtag() {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(arguments);
    }
  }
}
