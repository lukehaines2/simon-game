import React from "react";
import cx from "classnames";

import "./simonButton.scss";

export const SimonButton = props => {
  const { name, index, handlePlaySound, soundPlaying } = props;
  
  const onClick = () => {
    !soundPlaying && handlePlaySound(index, true);
  };

  return (
    <div className={cx("simonBtn", name, { soundPlaying: soundPlaying === name })} onClick={onClick} />
  )
}
