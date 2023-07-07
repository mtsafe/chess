function newCastleability() {
  return {
    player1Kingside: true,
    player1Queenside: true,
    player2Kingside: true,
    player2Queenside: true,
  }
}

function castleabilityObj(srcIndex, oldCastleability) {
  switch (srcIndex) {
    case 0:
      return {
        ...oldCastleability,
        player2Queenside: false,
      }
    case 4:
      return {
        ...oldCastleability,
        player2Kingside: false,
        player2Queenside: false,
      }
    case 7:
      return {
        ...oldCastleability,
        player2Kingside: false,
      }
    case 56:
      return {
        ...oldCastleability,
        player1Queenside: false,
      }
    case 60:
      return {
        ...oldCastleability,
        player1Kingside: false,
        player1Queenside: false,
      }
    case 63:
      return {
        ...oldCastleability,
        player1Kingside: false,
      }
  }
  return oldCastleability
}

export { castleabilityObj, newCastleability }
