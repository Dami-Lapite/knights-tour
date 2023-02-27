// The Knight's Tour by Dami Lapite, Feb 2021

import React, { Component } from "react";
import KnightsTour from "./Components/KnightsTour";
import "./styles/App.css";
import icons8 from "./assets/images/icons8-icons8-50.png";
import github from "./assets/images/icons8-github-64.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      content: null,
    };
  }

  reloadPage = () => {
    window.location.reload();
  };

  componentDidMount() {
    // Fetch content json from public/content.json
    fetch("./content.json")
      .then((res) => res.json())
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            content: json,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  render() {
    return (
      <div>
        {this.state.content !== null && this.state.isLoaded ? (
          <div id="App" className="App">
            <KnightsTour content={this.state.content} />
            <div className="footer" id="footer">
              <div className="footer-item">
                <a
                  className="text-link"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.damilapite.com/"
                >
                  {this.state.content.footer.developer}
                </a>
                <a target="_blank" rel="noreferrer" href="https://icons8.com">
                  <img src={icons8} alt="icons8 logo" />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/Dami-Lapite/knights-tour"
                >
                  <img src={github} alt="github logo" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>Sorry, there's an issue loading content for this page :(</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
