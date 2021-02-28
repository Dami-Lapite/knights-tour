// The Knight's Tour by Dami Lapite, Feb 2021

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Square from './Components/Square';
import isLegalMove from './Functions/isLegalMove';
import generateLegalMoves from './Functions/generateLegalMoves';
import getKnightTour from './Functions/getKnightTour';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      squares: [],
      currentSquareId: "",
      knightPathPos: 1
    };
  }

  // Function: Checks if the first move is yet to be made
  // Used by: Square component to make all squares clickable
  isFirstMove = () => {
    return(this.state.currentSquareId == "");
  }

  // Function: Checks if a starting square has been selected
  // Used by: Computer Mode Button to toggle disabled state
  isSecondMove = () =>{
    return(this.state.knightPathPos == 2);
  }

  // Function: Checks if knight is on the square with squareID 
  // Used by: Square component to display knight image
  isCurrentSquare = (squareID) =>{
    return(squareID == this.state.currentSquareId);
  }

  // Function: Completes the knight's tour once a starting square is selected
  // Used by: Computer Mode Button when clicked
  computerMode = () =>{
    let path = [];
    let visited = new Array(64); 
    for (let i=0; i<64; ++i) visited[i] = 0;
    let tour = getKnightTour(this.state.currentSquareId,path,visited).path;
    let count = 1;
    for (var squareID of tour) {
      if(this.state.currentSquareId != squareID){
        this.completePath(squareID, count);
      }
      count+=1;
    }
    this.setState({currentSquareId: tour[63], knightPathPos: 65});
  }

  // Function: Marks a square as visited, and assigns its position in the tour.
  // Used by: computerMode() to display tour on board
  completePath = (squareID,count) =>{
    let currentSquare = this.state.squares.find(currentSquare => currentSquare.id == squareID);
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
    if (this.state.currentSquareId != ""){
      let legalMoves = generateLegalMoves(this.state.currentSquareId);
      let foundUnvisited = false;
      for (var move of legalMoves) {
        let moveId = move.x.toString() + move.y.toString();
        let square = this.state.squares.find(square => square.id == moveId);
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

  // Function: Sets knight on square with currentId
  // Used by: Square component as a call back function when clicked
  setCurrentSquare = (currentId) =>{
    this.setState({currentSquareId: currentId});
    let currentSquare = this.state.squares.find(currentSquare => currentSquare.id == currentId);
    currentSquare.visited = true;
    currentSquare.pathPos = this.state.knightPathPos;
    let temp = this.state.knightPathPos + 1;
    this.setState({knightPathPos: temp});
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
        <div className="container">
          <Grid container>
            <Grid item xs={5}>
              <Card className="Card">
                <div>
                  {this.isPathComplete() ? (<div>
                    <h1 className="cardHeader">Knight's Tour Complete !</h1>
                  </div>):(
                  this.anyLegalMoves() ? <div>
                    <h1 className="cardHeader">The Knight's Tour</h1>
                    <p className="cardText">The aim of the game is use the chess Knight's movements to visit each square on the board exactly once.</p>
                    <p className="cardText">(Select starting square to enable computer mode.)</p>
                  </div>:<div>
                  <h1 className="cardHeader">Oops...you're trapped!</h1>
                  </div>)}
                  <div className="button"><Button variant="contained" onClick={this.reloadPage}>Start Again</Button></div>
                  {this.isSecondMove() ? (
                    <div className="button"><Button variant="contained" onClick={this.computerMode}>Computer Mode</Button></div>
                  ):<div className="button"><Button variant="contained" disabled>Computer Mode</Button></div>}
                </div>
              </Card>
            </Grid>
            <Grid container className="Board" style={{ width: 756, height: 760}} spacing={0}>
            {this.state.squares.map((square) => (
              <Square key={square.id} isInitial={this.isFirstMove()} isLegal={isLegalMove(square.i,square.j,this.state.currentSquareId)} squareData={square} isCurrent={this.isCurrentSquare(square.id)} parentCallBack={this.setCurrentSquare}/>
            ))}
          </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
