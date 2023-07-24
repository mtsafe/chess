function newCastleability() {
  return {
    player1Kingside: true,
    player1Queenside: true,
    player2Kingside: true,
    player2Queenside: true,
  }
}

function castleabilityUpdater(srcIndex, oldCastleability) {
  const castleabilityUpdaterPositionTable = {
    0: { ...oldCastleability, player2Queenside: false },
    4: { ...oldCastleability, player2Kingside: false, player2Queenside: false },
    7: { ...oldCastleability, player2Kingside: false },
    56: { ...oldCastleability, player1Queenside: false },
    60: {
      ...oldCastleability,
      player1Kingside: false,
      player1Queenside: false,
    },
    63: { ...oldCastleability, player1Kingside: false },
    default: oldCastleability,
  }

  return (
    castleabilityUpdaterPositionTable[srcIndex] ||
    castleabilityUpdaterPositionTable["default"]
  )
}

export { castleabilityUpdater, newCastleability }
