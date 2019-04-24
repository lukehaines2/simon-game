import React from "react";

import { SimonButton } from "../simonButton";
import "./simonContainer.scss";

const sound1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"); 
const sound2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"); 
const sound3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"); 
const sound4 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"); 

const buttons = [
  {
    name: "red",
    sound: sound1
  }, {
    name: "blue",
    sound: sound2
  }, {
    name: "green",
    sound: sound3
  }, {
    name: "yellow",
    sound: sound4
  }
];


export default class SimonContainer extends React.Component {

  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.state = {
      soundPlaying: false
    }
  }

  playSound(sound) {
    this.setState({ soundPlaying: true })
    sound.play().then(() => this.setState({ soundPlaying: false }));
  }

  render() {
    return(
      <div className="simonContainer">
        {buttons.map( (button, i) => (
          <SimonButton key={button.name} button={button} playSound={this.playSound} />
        ))}
        {this.state.soundPlaying && <div>Playing!</div>}
        {/*<Control name='center' />*/}
      </div>
    )
  }
}
