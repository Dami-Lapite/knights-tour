// The Knight's Tour by Dami Lapite, Feb 2021

import React, { Component } from 'react';
import Square from './Components/Square';
import isLegalMove from './Functions/isLegalMove';
import generateLegalMoves from './Functions/generateLegalMoves';
import getKnightTour from './Functions/getKnightTour';
import './Styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      squares: [],
      currentSquareId: "",
      knightPathPos: 1,
      stepMode: false,
      tour: [],
      playerPath: [],
    };
  }

  // Function: Checks if the first move is yet to be made
  // Used by: Square Props to make all squares clickable
  isFirstMove = () => {
    return(this.state.currentSquareId === "");
  }

  // Function: Checks if a starting square has been selected
  // Used by: Computer Mode Button to toggle disabled state
  isSecondMove = () =>{
    return(this.state.knightPathPos === 2);
  }

  // Function: Checks if knight is on the square with squareID
  // Used by: Square Props to display knight image
  isCurrentSquare = (squareID) =>{
    return(squareID === this.state.currentSquareId);
  }

  // Function: Completes the knight's tour once a starting square is selected
  // Used by: Computer Mode Button when clicked
  computerMode = () =>{
    let path = [];
    let visited = new Array(64);
    for (let i=0; i<64; ++i) visited[i] = 0;
    let tour = getKnightTour(this.state.currentSquareId,path,visited).path;
    this.setCurrentSquare(tour[1]);
    this.setState({stepMode: true, tour: tour});
  }

  // Function: Marks a square as visited, and assigns its position in the tour.
  // Used by: computerMode() to display tour on board
  completePath = (squareID,count) =>{
    let currentSquare = this.state.squares.find(currentSquare => currentSquare.id === squareID);
    currentSquare.visited = true;
    currentSquare.pathPos = count;
  }

  // Function: Checks if path is Complete i.e. all 64 sqaures have been visited
  // Used by: Card component to display completion message
  isPathComplete = () =>{
    return(this.state.knightPathPos > 64);
  }

  // Function: Checks if there are any legal and unvisited moves based on knight's current position
  // Used by: Card component to display trapped message
  anyLegalMoves = () =>{
    if (this.state.currentSquareId !== ""){
      let legalMoves = generateLegalMoves(this.state.currentSquareId);
      let foundUnvisited = false;
      for (var move of legalMoves) {
        let moveId = move.x.toString() + move.y.toString();
        let square = this.state.squares.find(square => square.id === moveId);
        if (!square.visited){
          foundUnvisited = true;
          break;
        }
      }
      return(foundUnvisited);
    }else{
      return true;
    }
  }

  // Function: moves to next square on completed tour
  // Used by: Next button when clicked
  handleNext = () =>{
    let idx = this.state.knightPathPos - 1;
    if (idx <= 63){
      this.setCurrentSquare(this.state.tour[idx]);
    }
  }

  // Funciton: returns conditionals for sqaure display and clickability
  // Used by: Square Component
  squareProps = (squareID) =>{
    return({"isEnabled": this.isEnabled(), "isInitial" : this.isFirstMove(), "isCurrent": this.isCurrentSquare(squareID)});
  }

  // Function: checks if legal squares should be cliclkable
  // Used by: Sqaure Props
  isEnabled = () =>{
    return((this.state.currentSquareId === "") || (!this.state.stepMode));
  }

  // Function: completes the tour on the board all at once
  // Used by: Skip button when clicked
  handleSkip = () =>{
    for (let idx = this.state.knightPathPos - 1; idx < this.state.tour.length; idx++) {
      this.completePath(this.state.tour[idx],idx + 1);
    }
    this.setState({currentSquareId: this.state.tour[63], knightPathPos: 65});
  }

  // Function: Sets knight on square with currentId
  // Used by: Square component as a call back function when clicked
  setCurrentSquare = (currentId) =>{
    this.setState({currentSquareId: currentId});
    let currentSquare = this.state.squares.find(currentSquare => currentSquare.id === currentId);
    currentSquare.visited = true;
    currentSquare.pathPos = this.state.knightPathPos;
    let temp = this.state.knightPathPos + 1;
    let tempPath = this.state.playerPath;
    tempPath.push(currentId);
    this.setState({knightPathPos: temp, playerPath: tempPath});
  }

  isPlayerMode = ()=>{
    return ((this.state.knightPathPos > 2) && !this.state.stepMode);
  }

  undoStep = ()=>{
    let tempPath = this.state.playerPath;
    let undoId = tempPath[tempPath.length - 1];
    let undoSquare = this.state.squares.find(undoSquare => undoSquare.id === undoId);
    undoSquare.visited = false;
    undoSquare.pathPos = 0;
    tempPath.pop();
    let newId = tempPath[tempPath.length - 1];
    let tempPos = this.state.knightPathPos - 1;
    this.setState({currentSquareId: newId, knightPathPos: tempPos, playerPath: tempPath});
  }

  // Function: Restarts the game
  // Used by: Start Again Button when clicked
  reloadPage = () =>{
    window.location.reload();
  }

  // Function: Loads board as array of square objects
  // Used for : Rendering squares ans setting initial state
  componentDidMount(){
    fetch("./boardData.json")
      .then(res => res.json())
      .then( json => {
          this.setState({
            isLoaded: true,
            squares: json.squares,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render (){
    return (
      <div className="App">
        <div className="wrapper">
        <div className="container">
              <div className="card">
                {this.isPathComplete() ? (<div>
                  <h1>Knight's Tour Complete !</h1>
                </div>):(
                this.anyLegalMoves() ? <div>
                  <h1>The Knight's Tour</h1>
                  <p className="cardText">The aim of the game is to use the chess Knight's movements to visit each square on the board exactly once.
                  <br/>Begin by clicking on a square to select it.
                  <br/>Computer mode generates a complete tour path based on the starting square.</p>
                </div>:<div>
                <h2>Oops...you're trapped!</h2>
                </div>)}
                <button className="button" onClick={this.reloadPage}>Restart</button>
                {this.isSecondMove() ? (
                  <button className="button" onClick={this.computerMode}>Computer Mode</button>
                ):<button className="button disabled">Computer Mode</button>}
                {this.state.stepMode && <div>
                  <button className="button" onClick={this.handleNext}>Next Step&emsp;<i className="fas fa-angle-right icon"></i></button>
                  <button className="button" onClick={this.handleSkip}>Skip to Last Step&emsp;<i className="fas fa-fast-forward icon"></i></button>
                </div>}
                {this.isPlayerMode() && <div>
                  <button className="button" onClick={this.undoStep}>Undo step&emsp;<i className="fas fa-undo-alt icon"></i></button>
                </div>}
              </div>
              <div className="board">
                  {this.state.squares.map((square) => (
                <Square key={square.id} isLegal={isLegalMove(square.i,square.j,this.state.currentSquareId)} squareProps={this.squareProps(square.id)} squareData={square} parentCallBack={this.setCurrentSquare}/>
              ))}
              </div>
        </div>
        <div className="footer">
          <p className="footerText">
          <span><a className="fab fa-github icon" 
          style={{display: "table-cell"}} href="https://github.com/Dami-Lapite/anime-quotes" target="_blank"></a></span>&emsp;
          <span><a className="fas fa-external-link-alt icon"
          style={{display: "table-cell"}} href="https://www.damilapite.com/" target="_blank"></a></span>
          &emsp;Designed & Developed by Dami Lapite - 2021</p>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
