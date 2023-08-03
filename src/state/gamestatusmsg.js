import { isPlayerInCheck } from "./check"

function newStatusMsg({ takingTurns, whosTurn }, pieces1, pieces2) {
  let check,
    statusMsg = "Go!"
  if (takingTurns) {
    statusMsg = `TURN: Player ${whosTurn}`
    console.log(`${statusMsg}`)
  }
  if (
    (whosTurn === 1 && isPlayerInCheck(pieces1, pieces2)) ||
    (whosTurn === 2 && isPlayerInCheck(pieces2, pieces1))
  )
    statusMsg += " CHECK!"
  return statusMsg
}

function getGameStatus(gamePlay, moveActions) {
  let takingTurns = gamePlay !== 0
  let whosTurn = 0
  if (takingTurns) whosTurn = (moveActions?.length % 2) + 1
  return { takingTurns, whosTurn }
}
export { newStatusMsg, getGameStatus }
