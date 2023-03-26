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
      stepThrough: false,
      stepThroughCount: 0,
      enableUndo: false,
      undoState: false,
      restartState: false,
    };
  }

  disableUndo = () => {
    this.setState({ enableUndo: false, enableComputerMode: true });
  };

  setUndoState = (state) => {
    this.setState({ undoState: state });
  };

  handleReset = (state) => {
    if (state) {
      this.setState({
        restartState: true,
      });
    } else {
      this.setState({
        isGameOver: false,
        isTourComplete: false,
        computerMode: false,
        startingSquareId: null,
        enableRestart: false,
        enableComputerMode: false,
        stepThrough: false,
        stepThroughCount: 0,
        enableUndo: false,
        undoState: false,
        restartState: false,
      });
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
      this.setState({
        computerMode: true,
        stepThrough: true,
      });
    }
  };

  handleStepThrough = () => {
    let newCount = this.state.stepThroughCount + 1;
    this.setState({ stepThroughCount: newCount });
  };

  handleSkipToEnd = () => {
    this.setState({ stepThrough: false });
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
      computerMode: false,
      enableComputerMode: false,
      stepThrough: false,
    });
  };

  render() {
    return (
      <div id="knights-tour" className="knights-tour">
        <div className="info-card-container">
          <div id="info-card" className="info-card">
            <div className="info-container">
              <h3>{this.props.content.title}</h3>
              <p className="description">
                {this.props.content.infoCard.description}
              </p>
              <div className="button-container">
                <button
                  className={`computer-mode ${
                    !this.state.enableComputerMode && !this.state.stepThrough
                      ? "disabled"
                      : ""
                  } ${this.state.stepThrough ? "step-through" : ""}`}
                  onClick={
                    this.state.stepThrough
                      ? this.handleStepThrough
                      : this.handleComputerMode
                  }
                >
                  {this.state.stepThrough
                    ? this.props.content.infoCard.nextButton
                    : this.props.content.infoCard.computerModeButton}
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
                  className={`undo ${
                    !this.state.enableUndo && !this.state.stepThrough
                      ? "disabled"
                      : ""
                  } ${this.state.stepThrough ? "step-through" : ""}`}
                  onClick={() =>
                    this.state.stepThrough
                      ? this.handleSkipToEnd()
                      : this.setUndoState(true)
                  }
                >
                  {this.state.stepThrough
                    ? this.props.content.infoCard.skipButton
                    : this.props.content.infoCard.undoButton}
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
        </div>
        <div className="chess-board-container">
          <ChessBoard
            boardData={this.props.content.board}
            isTrapped={this.gameOver}
            handleFirstMove={this.handleFirstMove}
            computerMode={this.state.computerMode}
            stepThrough={this.state.stepThrough}
            stepThroughCount={this.state.stepThroughCount}
            handleSecondMove={this.handleSecondMove}
            undoState={this.state.undoState}
            resetUndo={() => this.setUndoState(false)}
            disableUndo={this.disableUndo}
            restartState={this.state.restartState}
            resetRestart={() => this.handleReset(false)}
          />
        </div>
      </div>
    );
  }
}

export default KnightsTour;
