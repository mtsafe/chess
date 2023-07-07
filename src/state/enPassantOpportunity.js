function getEnPassantOpp(move) {
  if (move.srcPiece !== "P") return
  if (move.srcIndex - move.tarIndex === 16) return move.tarIndex
  if (move.srcIndex - move.tarIndex === -16) return move.tarIndex
}
export { getEnPassantOpp }
