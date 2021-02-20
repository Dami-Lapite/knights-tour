import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Square from './Components/Square';
import isLegalMove from './Functions/isLegalMove';
import generateLegalMoves from './Functions/generateLegalMoves';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      squares: [],
      currentSquareId: "",
      knightPath: []
    };
  }

  isFirstMove = () => {
    return(this.state.currentSquareId == "");
  }

  isCurrentSquare = (squareID) =>{
    if(squareID == this.state.currentSquareId){
      return true;
    }else{
      return false;
    }
  }

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
      if(!foundUnvisited){
        return("Trapped !")
      }
    }
  }

  setCurrentSquare = (currentId) =>{
    this.setState({currentSquareId: currentId});
    var tempArray = this.state.knightPath.concat(currentId);
    this.setState({knightPath: tempArray});
    let currentSquare = this.state.squares.find(currentSquare => currentSquare.id == currentId);
    currentSquare.visited = true;
  }

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
            <Grid item xs={5} alignItems="center" style={{justifyContent:"center"}}>
              <h3>{this.anyLegalMoves()}</h3>
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
