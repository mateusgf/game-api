function checkWinner(hostAction: string, guestAction: string): {winner: string; winnerAction: string} {
  if(hostAction === guestAction){
    return {winner: "draw", winnerAction: "draw"};
  }
  else if(guestAction === "rock"){
    return (hostAction === "paper") ? {winner: "host", winnerAction: "paper"} : {winner: "guest", winnerAction: "rock"}
  }
  else if(guestAction === "paper"){
    return (hostAction === "scissors") ? {winner: "host", winnerAction: "scissors"} : {winner: "guest", winnerAction: "paper"}
  }
  else if(guestAction === "scissors"){
    return (hostAction === "rock") ? {winner: "host", winnerAction: "rock"} : {winner: "guest", winnerAction: "scissors"}
  }
  return {winner: "", winnerAction: ""};
}




const Game = {
  checkWinner,
};


export default Game;