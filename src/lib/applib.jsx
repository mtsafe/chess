// Treats foot and testLetter as read-only

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
  console.log("spitBaller")
  let testFoot = foot
    .map((toe, index) => {
      if (toe.toString() === "0") return index
    })
    .filter(index => typeof index === "number")
  let toeNumber = getRandomInt(numMovesLeft(foot))
  return testFoot[toeNumber].toString()
}

function walker(foot) {
  console.log("walker")
  for (let i = 0; i < 9; i++) {
    if (foot[i] === "0") return i.toString()
  }
  return "0"
}

function defender(foot) {
  console.log("defender")
  let index = locateOneMoveWin(foot, "X")
  console.log("index = locateOneMoveWin(foot, 'X') = " + index)
  if (index === null) return spitBaller(foot)
  return index.toString()
}

function offender(foot) {
  console.log("offender")
  let index = locateOneMoveWin(foot, "O")
  if (index === null) return spitBaller(foot)
  return index.toString()
}

function bossLvl1(foot) {
  console.log("bossLvl1")
  let index = locateOneMoveWin(foot, "O")
  if (index !== null) return index.toString()

  index = locateOneMoveWin(foot, "X")
  if (index !== null) return index.toString()

  return spitBaller(foot)
}

export function aiChoosesToe(aiStrategy, foot) {
  // aiChoosesToe returns an index as a string type.
  // aiStrategy is a number type.
  switch (aiStrategy) {
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

export function numMovesLeft(foot) {
  let result = 0
  for (let i = 0; i < 9; i++) {
    if (foot[i] === "0") result++
  }
  return result
}

export function tie(foot) {
  // assumes already checked for winner
  return numMovesLeft(foot) === 0
}

export function locateOneMoveWin(foot, testLetter) {
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

export function winnnnner(foot, testLetter) {}

export function winner(foot, testLetter) {
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
