import React, { Component } from "react";
import ChessBoard from "./ChessBoard";
import "../styles/App.css";

class KnightsTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameOver: false,
      isTourComplete: false,
      computerMode: false,
      startingSquareId: null,
      enableRestart: false,
      enableComputerMode: false,
    };
  }

  disableComputerMode = () => {
    this.setState({ enableComputerMode: false });
  };

  handleComputerMode = () => {
    if (this.state.startingSquareId !== null && this.state.enableComputerMode) {
      this.setState({ computerMode: true });
    }
  };

  handleFirstMove = (squareId) => {
    this.setState({
      enableRestart: true,
      enableComputerMode: true,
      startingSquareId: squareId,
    });
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
              <button
                className={`${
                  !this.state.enableComputerMode ? "disabled" : ""
                }`}
                onClick={this.handleComputerMode}
              >
                {this.props.content.infoCard.computerModeButton}
              </button>
              <button
                className={`${!this.state.enableRestart ? "disabled" : ""}`}
                onClick={this.reloadPage}
              >
                {this.props.content.infoCard.restartButton}
              </button>
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
          handleFirstMove={this.handleFirstMove}
          computerMode={this.state.computerMode}
          disableComputerMode={this.disableComputerMode}
        />
      </div>
    );
  }
}

export default KnightsTour;
