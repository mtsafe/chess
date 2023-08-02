function newStatusMsg({ takingTurns, whosTurn }) {
  let statusMsg = "Go!"
  if (takingTurns) {
    statusMsg = `TURN: Player ${whosTurn}`
    console.log(`${statusMsg}`)
  }
  return statusMsg
}

function getGameStatus(gamePlay, moveActions) {
  let takingTurns = gamePlay !== 0
  let whosTurn = 0
  if (takingTurns) whosTurn = (moveActions?.length % 2) + 1
  return { takingTurns, whosTurn }
}
export { newStatusMsg, getGameStatus }
