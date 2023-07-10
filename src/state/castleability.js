function newCastleability() {
  return {
    player1Kingside: true,
    player1Queenside: true,
    player2Kingside: true,
    player2Queenside: true,
  }
}

function verifyCastleability(srcIndex, oldCastleability) {
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

// function verifyCastleability(srcIndex, oldCastleability) {
//   switch (srcIndex) {
//     case 0:
//       return {
//         ...oldCastleability,
//         player2Queenside: false,
//       }
//     case 4:
//       return {
//         ...oldCastleability,
//         player2Kingside: false,
//         player2Queenside: false,
//       }
//     case 7:
//       return {
//         ...oldCastleability,
//         player2Kingside: false,
//       }
//     case 56:
//       return {
//         ...oldCastleability,
//         player1Queenside: false,
//       }
//     case 60:
//       return {
//         ...oldCastleability,
//         player1Kingside: false,
//         player1Queenside: false,
//       }
//     case 63:
//       return {
//         ...oldCastleability,
//         player1Kingside: false,
//       }
//   }
//   return oldCastleability
// }

export { verifyCastleability, newCastleability }
