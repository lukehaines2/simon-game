import React from "react";

import "./simonButton.scss";

export const SimonButton = props => {
  const { button, playSound } = props;
  
  const onClick = () => {
    playSound(button.sound);
  };
  
  return(
    <div className={"simonBtn " + button.name} onClick={onClick} />
  )
}
