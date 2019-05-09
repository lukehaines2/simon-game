import React from "react";

import "./gameControls.scss";

export const GameControls = props => {
  const onClick = () => {
    props.startGame();
  };

  return (
    <div className="controlWrapper">
      <button className='btn btn-danger start' onClick={onClick}>Start</button>
      <p>Sound Playing: {props.soundPlaying}</p>
      <p>Score: {props.score}</p>
      <p>Level: {props.level}</p>
      ----
      <p>For cheaters! -> {props.sequence}</p>
    </div>
  )
}
