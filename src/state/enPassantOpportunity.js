function getEnPassantOpp(move, letter) {
  if (letter !== "P") return
  if (
    move.srcIndex - move.tarIndex === 16 ||
    move.srcIndex - move.tarIndex === -16
  )
    return move.tarIndex
}
export { getEnPassantOpp }
