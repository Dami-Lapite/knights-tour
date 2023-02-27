import React, { Component } from "react";
import "../styles/App.css";
import knight from "../assets/images/chessKnight.png";

export class Square extends Component {
  clickHandler = () => {
    if (this.props.isFirstMove || this.props.squareProps.highlighted) {
      this.props.handleClick(this.props.squareData.id);
    }
  };
  render() {
    return (
      <div>
        <div
          className={`square ${this.props.squareData.color} ${
            this.props.squareProps.highlighted ? "highlight" : ""
          } ${this.props.isFirstMove ? "clickable" : ""}`}
          onClick={this.clickHandler}
        >
          {this.props.squareProps.isCurrent && (
            <img src={knight} alt="chess knight" />
          )}
          {!this.props.squareProps.isCurrent &&
            this.props.squareData.visited && (
              <p>{this.props.squareData.pathPosition}</p>
            )}
        </div>
      </div>
    );
  }
}

export default Square;
