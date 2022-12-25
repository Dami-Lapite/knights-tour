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
      enableUndo: false,
      undoState: false,
      restartState: false,
    };
  }

  disableUndo = () => {
    this.setState({ enableUndo: false, enableComputerMode: true });
  };

  setUndoState = (state) => {
    if (this.state.enableUndo) {
      this.setState({ undoState: state });
    }
  };

  handleReset = (state) => {
    if (state) {
      this.setState({
        isGameOver: false,
        isTourComplete: false,
        computerMode: false,
        startingSquareId: null,
        enableRestart: false,
        enableComputerMode: false,
        enableUndo: false,
        undoState: false,
        restartState: true,
      });
    } else {
      this.setState({ restartState: false });
    }
  };

  handleSecondMove = (setBoth) => {
    if (setBoth) {
      this.setState({ enableUndo: true, enableComputerMode: false });
    } else {
      this.setState({ enableComputerMode: false });
    }
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

  gameOver = (isTourComplete) => {
    this.setState({
      isGameOver: true,
      isTourComplete: isTourComplete,
      enableUndo: false,
    });
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
                className={`computer-mode ${
                  !this.state.enableComputerMode ? "disabled" : ""
                }`}
                onClick={this.handleComputerMode}
              >
                {this.props.content.infoCard.computerModeButton}
              </button>
              <button
                className={`restart ${
                  !this.state.enableRestart ? "disabled" : ""
                }`}
                onClick={() => this.handleReset(true)}
              >
                {this.props.content.infoCard.restartButton}
              </button>
              <button
                className={`undo ${!this.state.enableUndo ? "disabled" : ""}`}
                onClick={() => this.setUndoState(true)}
              >
                {this.props.content.infoCard.undoButton}
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
          handleSecondMove={this.handleSecondMove}
          undoState={this.state.undoState}
          resetUndo={() => this.setUndoState(false)}
          disableUndo={this.disableUndo}
          restartState={this.state.restartState}
          resetRestart={() => this.handleReset(false)}
        />
      </div>
    );
  }
}

export default KnightsTour;
