import React from 'react'
import Button from './button'
import Stars from './stars'
import Answer from './answer'
import Numbers from './numbers'
import DoneFrame from './doneFrame'

var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };


class Game extends React.Component {

    static randomNumber = () => {
        return 1 + Math.floor(Math.random() * 9);
    };

    static initialiseState = () => ({
        selectedNumbers: [],
        numberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        usedNumbers: [],
        redrawsLeft: 5,
        doneStatus: null 
    });

    state = Game.initialiseState();

    resetGame = () => this.setState(Game.initialiseState());

    selectNumber = (clickedNumber) => {        
        if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0){
            return;
        }

        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };

    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers
                                        .filter(number => number !== clickedNumber)
        }));
    };

    checkAnswer = () => {
        // answer is corect if the sum of current numbers selected is equal to number of stars
        this.setState(prevState => ({
            answerIsCorrect: prevState.numberOfStars === 
            prevState.selectedNumbers.reduce((acc, current) => acc + current, 0)
        }));
    };

    acceptAnswer = () => {
        // if answer is correct do logic
        this.setState(prevState => ({
            answerIsCorrect: null,
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            numberOfStars: Game.randomNumber()
        }), this.updateDoneStatus);
    };

    redraw = () =>{
        if(this.state.redrawsLeft === 0) {
            return;
        }

        this.setState(prevState => ({
            numberOfStars: Game.randomNumber(),
            selectedNumbers: [],
            answerIsCorrect: null,
            redrawsLeft: prevState.redrawsLeft - 1
        }), this.updateDoneStatus);
    };

    possibleSolutions = (state) => {
        const possibleNumbers = Numbers.list.filter(number => 
            state.usedNumbers.indexOf(number) === -1);

        return possibleCombinationSum(possibleNumbers, state.numberOfStars);        
    };

    updateDoneStatus = () => {
        console.log('updateDoneStatus');
        this.setState(prevState => {
            if(prevState.usedNumbers.length === 9){
                console.log('win');
                return { doneStatus: 'Victory!'};
            }

            if(prevState.redrawsLeft === 0 && !this.possibleSolutions(prevState)){
                console.log('loss');
                return { doneStatus: 'Game Over!'};
            }
        });
    };

    render() {
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={this.state.numberOfStars}/>
                    <Button selectedNumbers={this.state.selectedNumbers}
                            checkAnswer={this.checkAnswer}
                            answerIsCorrect={this.state.answerIsCorrect}
                            acceptAnswer={this.acceptAnswer}
                            redraw={this.redraw}
                            redrawsLeft={this.state.redrawsLeft}/>
                    <Answer selectedNumbers={this.state.selectedNumbers}
                            unselectNumber={this.unselectNumber}
                    />
                </div>
                {this.state.doneStatus !== null ?
                    <DoneFrame doneStatus={this.state.doneStatus}
                               resetGame={this.resetGame}/>               
                 :
                    <Numbers selectedNumbers={this.state.selectedNumbers}
                                selectNumber={this.selectNumber}
                                usedNumbers={this.state.usedNumbers}                            
                    />
                }
            </div>
        );
    };
};

export default Game;