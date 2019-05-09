import React from "react";

import { SimonButton } from "../simonButton";
import { GameControls } from "../gameControls";
import "./gameContainer.scss";

const red = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
const blue = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
const green = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
const yellow = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

const buttonSounds = [red, blue, green, yellow];
const buttons = ["red", "blue", "green", "yellow"];

const generateSeries = () => {
  const series = [];
  for (let i = 0; i < 20; i++) {
    series.push(Math.floor(Math.random() * 4));
  }
  return series
}


export default class SimonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.playSequence = this.playSequence.bind(this);
    this.startGame = this.startGame.bind(this);
    this.state = {
      soundPlaying: false,
      sequence: generateSeries(),
      score: 0,
      answered: 0,
      level: 1
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
    }, 900));
  }

  getSeqByLevel(level) {
    return this.state.sequence.slice(0, level);
  }

  startGame() {
    // Slice first index from sequence
    const seq = this.getSeqByLevel(1);
    this.playSequence(seq);      
  };

  playSequence(seq) {
    let i = 0;

    const interval = setInterval(() => {
      this.playSound(seq[i]);
      i++;
      if (i >= seq.length) {
        clearInterval(interval);
      }
    }, 1000);
  }

  evalAnswer(ans) {
    const { sequence, answered, level, score } = this.state;
    const seq = this.getSeqByLevel(level);
    // console.log(answered, seq.length);

    if (answered === seq.length) {
      // console.log("hit if");
      const nextSeq = this.getSeqByLevel(level+1);
      this.nextLevel(nextSeq);
    }
    
    const answer = sequence[answered];
    if (ans === answer) {
      // correct answer
      if (answered === 0 && seq.length < 2) {
        const nextSeq = this.getSeqByLevel(level+1);
        this.nextLevel(nextSeq);
      } else {
        this.setState({
          answered: answered+1,
          score: score+1,
        });
      }
    } else {
      // wrong answer
      this.resetScores();
      alert("GAME OVER");
    }
  }

  nextLevel(seq) {
    this.setState({
      answered: 0,
      score: 0,
      level: this.state.level+1
    })
    this.playSequence(seq);
  }

  resetScores() {
    this.setState({
      answered: 0,
      score: 0
    });
  }

  render() {
    const { sequence, soundPlaying, score, level } = this.state;
    return (
      <div className="gameContainer">
        <h1>Simon Game</h1>
        {buttons.map((name, i) => (
          <SimonButton key={name} {...{soundPlaying}} name={name} index={i} handlePlaySound={this.playSound} />
        ))}
        <GameControls {...{sequence, score, level, soundPlaying}} startGame={this.startGame} />
      </div>
    )
  }
}
