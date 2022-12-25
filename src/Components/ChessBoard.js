import React, { Component } from "react";
import isLegalMove from "../Functions/isLegalMove";
import getKnightTour from "../Functions/getKnightTour";
import generateLegalIds from "../Functions/generateLegalIds";
import { cloneDeep, isEmpty } from "lodash";
import Square from "./Square";
import "../styles/App.css";

class ChessBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSquareId: null,
      squares: [],
      knightPathPosition: 1,
      knightPath: [],
    };
  }

  isFirstMove = () => {
    return this.state.currentSquareId === null;
  };

  setCurrentSquare = (id) => {
    let currentSquare = this.state.squares.find((square) => square.id === id);
    currentSquare.visited = true;
    currentSquare.pathPosition = this.state.knightPathPosition;
    let knightPathPosition = this.state.knightPathPosition + 1;
    let knightPath = cloneDeep(this.state.knightPath);
    knightPath.push(id);
    this.setState(
      {
        currentSquareId: id,
        knightPathPosition: knightPathPosition,
        knightPath: knightPath,
      },
      this.checkIfTrapped
    );
  };

  checkIfTrapped = () => {
    let legalMoves = generateLegalIds(this.state.currentSquareId);
    let trapped = true;
    legalMoves.every((move) => {
      let legalSquare = this.state.squares.find(
        (square) => square.id === move.id
      );
      if (!legalSquare.visited) {
        trapped = false;
      }
      return trapped;
    });
    if (trapped) {
      this.props.isTrapped(this.state.knightPath.length === 64);
    }
  };

  handleClick = (id) => {
    if (this.isFirstMove()) {
      this.props.handleFirstMove(id);
    }
    if (!this.props.computerMode && this.state.knightPathPosition === 2) {
      this.props.disableComputerMode();
    }
    this.setCurrentSquare(id);
  };

  getSquareProps = (square) => {
    if (this.isFirstMove()) {
      return { highlighted: false, isCurrent: false };
    } else {
      return {
        highlighted:
          !square.visited &&
          isLegalMove(square.i, square.j, this.state.currentSquareId),
        isCurrent: square.id === this.state.currentSquareId,
      };
    }
  };

  setCompleteTour = (tourPath) => {
    for (let i = 1; i < 64; ++i) {
      let id = tourPath[i];
      let square = this.state.squares.find((square) => square.id === id);
      square.visited = true;
      square.pathPosition = i + 1;
      if (i === 63) {
        this.setState({ currentSquareId: id, knightPathPosition: 64 });
      }
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.computerMode !== prevProps.computerMode) {
      if (this.props.computerMode) {
        let path = [];
        let visited = new Array(64);
        for (let i = 0; i < 64; ++i) visited[i] = 0;
        let completedTour = getKnightTour(
          this.state.currentSquareId,
          path,
          visited
        ).path;
        this.setCompleteTour(completedTour);
        this.props.disableComputerMode();
      }
    }
  }

  componentDidMount() {
    this.setState({ squares: cloneDeep(this.props.boardData.squares) });
  }

  render() {
    return (
      <div id="board" className="board">
        {!isEmpty(this.state.squares) &&
          this.state.squares.map((square) => (
            <Square
              key={square.id}
              squareData={square}
              isFirstMove={this.isFirstMove()}
              squareProps={this.getSquareProps(square)}
              handleClick={this.handleClick}
            />
          ))}
      </div>
    );
  }
}

export default ChessBoard;
