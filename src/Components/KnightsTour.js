import React, { Component } from "react";
import ChessBoard from "./ChessBoard";
import "../styles/App.css";

class KnightsTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserButtons: false,
      isGameOver: false,
      isTourComplete: false,
    };
  }

  showButtons = () => {
    this.setState({ showUserButtons: true });
  };

  reloadPage = () => {
    window.location.reload();
  };

  gameOver = (isTourComplete) => {
    this.setState({ isGameOver: true, isTourComplete: isTourComplete });
  };

  render() {
    return (
      <div id="knights-tour" className="knights-tour">
        <div id="info-card" className="info-card">
          <div className="info-container">
            <h3>{this.props.content.title}</h3>
            <p className="description">
              {this.props.content.infoCard.description}
            </p>
            <div className="button-container">
              {this.state.showUserButtons && (
                <div className="user-buttons">
                  <button className="restart" onClick={this.reloadPage}>
                    {this.props.content.infoCard.restartButton}
                  </button>
                </div>
              )}
            </div>
            {this.state.isGameOver && (
              <div className="tour-status">
                {this.state.isTourComplete ? (
                  <p>{this.props.content.infoCard.tourComplete}</p>
                ) : (
                  <p>{this.props.content.infoCard.trapped}</p>
                )}
              </div>
            )}
          </div>
        </div>
        <ChessBoard
          boardData={this.props.content.board}
          isTrapped={this.gameOver}
          showButtons={this.showButtons}
        />
      </div>
    );
  }
}

export default KnightsTour;
