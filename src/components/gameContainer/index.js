import React from "react";

import { SimonButton } from "../simonButton";
import { GameControls } from "../gameControls";
import "./gameContainer.scss";

const red = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"); 
const blue = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"); 
const green = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"); 
const yellow = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

const buttonSounds = [red, blue, green, yellow]
const buttons = ["red", "blue", "green", "yellow"];


const generateSeries = (min, max) => {
  const series = []
  for (let i = 0; i < 10; i++) {
    series.push(Math.floor(Math.random() * max))
  }
  return series
}


export default class SimonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.playSequence = this.playSequence.bind(this);
    this.state = {
      soundPlaying: false,
      sequence: generateSeries(0, 4),
      score: 0,
      answered: 0
    }
  }

  playSound(index, shouldEval) {
    const sound = buttonSounds[index];
    this.setState({ soundPlaying: buttons[index] });
    sound.playbackRate = 0.5;
    sound.play().then(() => setTimeout(() => {
      this.setState({ soundPlaying: false });
      if (shouldEval) {
        this.evalAnswer(index);
      }
    }, 900 ));
  }

  playSequence() {
    const { sequence } = this.state;
    let i = 0;

    const interval = setInterval(() => {
      this.playSound(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
      }
    }, 1000)
  }

  evalAnswer(ans) {
    const { sequence, answered, score } = this.state;
    const answer = sequence[answered];
    
    if (ans === answer) {
      // correct answer
      this.setState({ 
        answered: answered+1,
        score: score+1
      });
    } else {
      // wrong answer
      this.resetScores();
      alert("GAME OVER");
    }
  }

  resetScores() {
    this.setState({
      answered: 0,
      score: 0
    })
  }

  render() {
    const { sequence, soundPlaying, score } = this.state;
    return (
      <div className="gameContainer">
        <h1>Simon Game</h1>
        {buttons.map((name, i) => (
          <SimonButton key={name} name={name} index={i} handlePlaySound={this.playSound} {...{soundPlaying}} />
        ))}
        {<GameControls {...{sequence, score, soundPlaying}} playSequence={this.playSequence} />}
      </div>
    )
  }
}
