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
      knightPathPos: 1,
      stepMode: false,
      tour: []
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
    this.setState({knightPathPos: temp});
    console.log(this.state.knightPathPos, currentId);
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
                    <p className="cardText">The aim of the game is to use the chess Knight's movements to visit each square on the board exactly once.</p>
                    <p className="cardText">(Select starting square to enable computer mode.)</p>
                  </div>:<div>
                  <h1 className="cardHeader">Oops...you're trapped!</h1>
                  </div>)}
                  <div className="button"><Button variant="contained" onClick={this.reloadPage}>Re-Start</Button></div>
                  {this.isSecondMove() ? (
                    <div className="button"><Button variant="contained" onClick={this.computerMode}>Computer Mode</Button></div>
                  ):<div className="button"><Button variant="contained" disabled>Computer Mode</Button></div>}
                  {this.state.stepMode && <div className="button">
                    <Button variant="contained" onClick={this.handleNext} style={{marginRight:"5px"}}>Next</Button>
                    <Button variant="contained" onClick={this.handleSkip} style={{marginLeft:"5px"}}>Skip</Button>
                  </div>}
                </div>
              </Card>
              <div className="footer">
                <p className="footerText">
                <span><a className="fab fa-github" href="https://github.com/Dami-Lapite/knights-tour"></a></span>&emsp;
                <span><a className="fas fa-external-link-alt project-icon"
                                          href="https://www.damilapite.com/"></a></span>
                &emsp;Designed and Developed by Dami Lapite - 2021</p>
              </div>
            </Grid>
            <Grid container className="Board" style={{ width: 756, height: 760}} spacing={0}>
            {this.state.squares.map((square) => (
              <Square key={square.id} isLegal={isLegalMove(square.i,square.j,this.state.currentSquareId)} squareProps={this.squareProps(square.id)} squareData={square} parentCallBack={this.setCurrentSquare}/>
            ))}
          </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
