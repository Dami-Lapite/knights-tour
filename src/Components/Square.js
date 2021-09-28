import React, { Component } from 'react';
import styles from '../Styles/square.module.css';
import ImSrc from '../Images/chessKnight.png'

export class Square extends Component {

    // Function: handles square clicks
    // Uses setCurrentSquare in App.js as call back function
    clickhandler = () =>{
        this.props.parentCallBack(this.props.squareData.id);
    }
    render() {
        return (
            <div>
                {this.props.squareProps.isInitial ? (
                    (this.props.squareData.color === "white" ? (
                    <div className={styles.whiteSquare} onClick={this.clickhandler}></div>
                ):  <div className={styles.blackSquare} onClick={this.clickhandler}></div>
                )):
                (this.props.squareData.visited ? (
                    (this.props.squareData.color === "white" ? (
                    <div className={styles.whiteSquare} >
                        {this.props.squareProps.isCurrent ? (
                        <img src={ImSrc}  alt="knight"/>
                        ):<div><p className={styles.pathPosition}>{this.props.squareData.pathPos}</p></div>}
                    </div>):<div className={styles.blackSquare} >
                        {this.props.squareProps.isCurrent ? (
                        <img src={ImSrc}  alt="knight"/>
                        ):<div><p className={styles.pathPosition}>{this.props.squareData.pathPos}</p></div>}
                    </div>)): 
                (this.props.isLegal ? (
                    this.props.squareProps.isEnabled ? (
                        <div className={styles.legalSquare} onClick={this.clickhandler}></div>
                    ):(<div className={styles.legalSquare}></div>)
                ):(this.props.squareData.color === "white" ? (
                    <div className={styles.whiteSquare} ></div>
                ):  <div className={styles.blackSquare} ></div>
                )))}
            </div>
        )
    }
}

export default Square;
