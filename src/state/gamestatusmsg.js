import { isCheckMate, isPlayerInCheck, isStaleMate } from "./check"

function newStatusMsg({ takingTurns, whosTurn }, onDragState) {
  if (takingTurns) {
    let atkPieces, defPieces, notWhosTurn
    if (whosTurn === 1) {
      defPieces = onDragState.pieces1
      atkPieces = onDragState.pieces2
      notWhosTurn = 2
    } else if (whosTurn === 2) {
      defPieces = onDragState.pieces2
      atkPieces = onDragState.pieces1
      notWhosTurn = 1
    }

    if (isPlayerInCheck(defPieces, atkPieces)) {
      if (isCheckMate(defPieces, atkPieces, onDragState))
        return `CHECKMATE: Player ${notWhosTurn} wins!`
      return `TURN: Player ${whosTurn} CHECK!`
    }
    if (isStaleMate(defPieces, atkPieces, onDragState))
      return "STALEMATE: Try again."
    return `TURN: Player ${whosTurn}`
  }
  if (isPlayerInCheck(onDragState.pieces1, onDragState.pieces2)) {
    if (isPlayerInCheck(onDragState.pieces2, onDragState.pieces1))
      return "Both players 1 and 2 are in check." // Not really possible (yet)
    return "Player 1 is in check."
  }
  if (isPlayerInCheck(onDragState.pieces2, onDragState.pieces1))
    return "Player 2 is in check."
  return "Go!" // Anyone's turn
}

function getGameStatus(gamePlay, moveActions) {
  let takingTurns = gamePlay !== 0
  let whosTurn = 0
  if (takingTurns) whosTurn = (moveActions?.length % 2) + 1
  return { takingTurns, whosTurn }
}
export { newStatusMsg, getGameStatus }
