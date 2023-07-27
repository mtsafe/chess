function rc2Index(rank, column) {
  return (8 - rank) * 8 + column - 1
}
function rf2Index(rank, file) {
  return (8 - rank) * 8 + file.charCodeAt(0) - 97
}
function index2Rank(index) {
  return 8 - Math.floor(index / 8)
}
function index2File(index) {
  return String.fromCharCode(97 + (index % 8))
}
function index2Column(index) {
  return (index % 8) + 1
}

function getGameStatus(gamePlay, recordedMoves) {
  let takingTurns = gamePlay !== 0
  let whosTurn = 0
  if (takingTurns) whosTurn = (recordedMoves?.length % 2) + 1
  return { takingTurns, whosTurn }
}

const winMatrix = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
]

function getRandomInt(max) {
  // returns random int from 0 to max - 1
  return Math.floor(Math.random() * max)
}

function spitBaller(foot) {
  let testFoot = foot
    .map((tile, index) => {
      if (tile.toString() === "0") return index
    })
    .filter(index => typeof index === "number")
  let tileNumber = getRandomInt(numMovesLeft(foot))
  return testFoot[tileNumber].toString()
}

function walker(foot) {
  for (let i = 0; i < 64; i++) {
    if (foot[i] === "0") return i.toString()
  }
  return "0"
}

function defender(foot) {
  let index = locateOneMoveWin(foot, "X")
  if (index === null) return spitBaller(foot)
  return index.toString()
}

function offender(foot) {
  let index = locateOneMoveWin(foot, "O")
  if (index === null) return spitBaller(foot)
  return index.toString()
}

function bossLvl1(foot) {
  let index = locateOneMoveWin(foot, "O")
  if (index !== null) return index.toString()

  index = locateOneMoveWin(foot, "X")
  if (index !== null) return index.toString()

  return spitBaller(foot)
}

function aiChoosesTile(gamePlay, foot) {
  // aiChoosesTile returns an index as a string type.
  // gamePlay is a number type.
  switch (gamePlay) {
    case 0:
      return walker(foot)
    case 1:
      return spitBaller(foot)
    case 2:
      return offender(foot)
    case 3:
      return defender(foot)
    case 4:
      return bossLvl1(foot)
    default:
      return spitBaller(foot)
  }
}

function numMovesLeft(foot) {
  let result = 0
  for (let i = 0; i < 64; i++) {
    if (foot[i] === "0") result++
  }
  return result
}

function tie(foot) {
  // assumes already checked for winner
  return numMovesLeft(foot) === 0
}

function locateOneMoveWin(foot, testLetter) {
  // locateOneMoveWin returns number type
  const winLetter = "0"
  for (const triplet of winMatrix) {
    if (
      foot[triplet[0]] === winLetter &&
      foot[triplet[1]] === testLetter &&
      foot[triplet[2]] === testLetter
    )
      return triplet[0]
    if (
      foot[triplet[0]] === testLetter &&
      foot[triplet[1]] === winLetter &&
      foot[triplet[2]] === testLetter
    )
      return triplet[1]
    if (
      foot[triplet[0]] === testLetter &&
      foot[triplet[1]] === testLetter &&
      foot[triplet[2]] === winLetter
    )
      return triplet[2]
  }
  return null
}

function winner(foot, testLetter) {
  if (foot[0] === testLetter) {
    if (foot[1] === testLetter && foot[2] === testLetter) {
      return true
    } else if (foot[4] === testLetter && foot[8] === testLetter) {
      return true
    } else if (foot[3] === testLetter && foot[6] === testLetter) {
      return true
    }
  }
  if (
    foot[1] === testLetter &&
    foot[4] === testLetter &&
    foot[7] === testLetter
  ) {
    return true
  }
  if (foot[2] === testLetter) {
    if (foot[4] === testLetter && foot[6] === testLetter) {
      return true
    } else if (foot[5] === testLetter && foot[8] === testLetter) {
      return true
    }
  }
  if (
    foot[3] === testLetter &&
    foot[4] === testLetter &&
    foot[5] === testLetter
  ) {
    return true
  }
  if (
    foot[6] === testLetter &&
    foot[7] === testLetter &&
    foot[8] === testLetter
  ) {
    return true
  }
  return false
}
export {
  rc2Index,
  rf2Index,
  index2Rank,
  index2File,
  index2Column,
  getGameStatus,
  aiChoosesTile,
  numMovesLeft,
  tie,
  locateOneMoveWin,
  winner,
}
