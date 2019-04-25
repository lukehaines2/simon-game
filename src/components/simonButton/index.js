import React from "react";
import cx from "classnames";

import "./simonButton.scss";

export const SimonButton = props => {
  const { button, handlePlaySound, soundPlaying } = props;
  const { name, sound } = button;
  
  const onClick = () => {
    !soundPlaying && handlePlaySound(sound, button.name);
  };

  return (
    <div className={cx("simonBtn", name, { soundPlaying: soundPlaying === name })} onClick={onClick} />
  )
}
