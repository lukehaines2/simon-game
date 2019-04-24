import React from "react";


export const SimonButton = props => {
  const { button, playSound } = props;
  
  const onClick = () => {
    console.log(button.sound);
    playSound(button.sound);
  };
  
  return(
    <div className={"simonBtn " + button.name} onClick={onClick}>
      {button.name}
    </div>
  )
}
