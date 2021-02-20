import React, { Component } from 'react';
import styles from '../Styles/square.module.css';
import ImSrc from '../Images/chessKnight.png'

export class Square extends Component {
    clickhandler = () =>{
        this.props.parentCallBack(this.props.squareData.id);
    }
    render() {
        return (
            <div>
                {this.props.isInitial ? (
                    (this.props.squareData.color == "white" ? (
                    <div className={styles.whiteSquare} onClick={this.clickhandler}></div>
                ):  <div className={styles.blackSquare} onClick={this.clickhandler}></div>
                )):
                (this.props.squareData.visited ? (
                    <div className={styles.visitedSquare}>
                    {this.props.isCurrent ? (
                        <img src={ImSrc} width="50px" height="50px" alt="knight"/>
                    ):null}
                    </div>
                ): (this.props.isLegal ? (
                    <div className={styles.legalSquare} onClick={this.clickhandler}></div>
                )
                :(this.props.squareData.color == "white" ? (
                    <div className={styles.whiteSquare} ></div>
                ):  <div className={styles.blackSquare} ></div>
                )))}
            </div>
        )
    }
}

export default Square;
