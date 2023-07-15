import {
  getPieceMatchingCode,
  getPieceMatchingIndex1,
  getPieceMatchingIndex2,
} from "./pieces"
// cannot move into check

// must move out of check
const angleToOffset = {
  0: 1,
  45: -7,
  90: -8,
  135: -9,
  180: -1,
  225: 7,
  270: 8,
  315: 9,
}
const diagonalAngles = [45, 135, 225, 315]
const rightAngles = [0, 90, 180, 270]
const knightOffsets = [
  2 - 8,
  1 - 16,
  -1 - 16,
  -2 - 8,
  -2 + 8,
  -1 + 16,
  1 + 16,
  2 + 8,
]

function orientation(playerNum) {
  if (playerNum === 1) return 1
  else return -1
}

function isPlayerInCheck(defPieces, atkPieces) {
  let { index: kingIndex } = getPieceMatchingCode("K", defPieces)
  return !atkPieces.every(atkPiece => {
    if (isPlayerInCheckFrom(atkPiece, kingIndex, atkPieces, defPieces))
      console.log(`Player is in check from ${atkPiece.code}`)
    return !isPlayerInCheckFrom(atkPiece, kingIndex, atkPieces, defPieces)
  })
  // atkPieces.every(atkPiece => {
  //   if (isPlayerInCheckFrom(atkPiece, kingIndex, atkPieces, defPieces)) {
  //     console.log("isPlayerInCheckFrom() returned TRUE")
  //     console.log("isPlayerInCheck() returning TRUE")
  //   }
  //   return !isPlayerInCheckFrom(atkPiece, kingIndex, atkPieces, defPieces)
  //   })
  // console.log("isPlayerInCheck() returning FALSE")
  // return false
}

function isPlayerInCheckFrom(atkPiece, kingIndex, atkPieces, defPieces) {
  if (
    getTilesCovered[atkPiece.letter](atkPiece, atkPieces, defPieces).includes(
      kingIndex
    )
  )
    console.log(`=== King @${kingIndex} is covered by ${atkPiece.code}`)

  return getTilesCovered[atkPiece.letter](
    atkPiece,
    atkPieces,
    defPieces
  ).includes(kingIndex)
}

const getTilesCovered = {
  P: (atkPiece, atkPieces, defPieces) => {
    let srcIndex = atkPiece.index,
      way = orientation(atkPiece.player)

    return [
      srcIndex + angleToOffset[45] * way,
      srcIndex + angleToOffset[135] * way,
    ]
    // return getTilesCoveredByOffsets(
    //   [angleToOffset[45] * way, angleToOffset[135] * way],
    //   srcIndex
    // )
  },
  N: (atkPiece, atkPieces, defPieces) => {
    let srcIndex = atkPiece.index

    return getTilesCoveredByOffsets(knightOffsets, srcIndex)
  },
  B: (atkPiece, atkPieces, defPieces) => {
    return linearTilesCovered(diagonalAngles, atkPiece, atkPieces, defPieces)
  },
  R: (atkPiece, atkPieces, defPieces) => {
    return linearTilesCovered(rightAngles, atkPiece, atkPieces, defPieces)
  },
  Q: (atkPiece, atkPieces, defPieces) => {
    return linearTilesCovered(
      diagonalAngles.concat(rightAngles),
      atkPiece,
      atkPieces,
      defPieces
    )
  },
  K: (atkPiece, atkPieces, defPieces) => {
    let result = [],
      srcIndex = atkPiece.index,
      tarIndex

    for (const direction of Object.keys(angleToOffset)) {
      tarIndex = srcIndex + angleToOffset[direction]
      if (areLocal(tarIndex, srcIndex)) result.push(tarIndex)
    }
    return result
  },
}

function areLocal(index1, index2) {
  if (index1 < 0 || index2 < 0 || index1 > 63 || index2 > 63) return false
  let diff = (index2 % 8) - (index1 % 8)
  return diff > -3 && diff < 3
}

function getTilesCoveredByOffsets(offsets, srcIndex) {
  let tarIndex,
    result = []
  for (const offset in offsets) {
    tarIndex = srcIndex + offset
    if (areLocal(tarIndex, srcIndex)) result.push(tarIndex)
  }
  return result
}

function linearTilesCovered(angles, atkPiece, atkPieces, defPieces) {
  let result = [],
    srcIndex = atkPiece.index

  for (const direction of angles) {
    let step = angleToOffset[direction]
    result = result.concat(
      straightStepsCovered(srcIndex, step, atkPieces, defPieces)
    )
  }
  return result
}

function straightStepsCovered(srcIndex, step, atkPieces, defPieces) {
  let t,
    s,
    result = []
  for (
    t = srcIndex + step, s = srcIndex;
    areLocal(t, s);
    t += step, s += step
  ) {
    result.push(t)
    if (
      getPieceMatchingIndex1(t, atkPieces) ||
      getPieceMatchingIndex1(t, defPieces)
    ) {
      break
    }
  }
  return result
}

// function straightSteps(srcIndex, step, atkPieces, defPieces) {
//   let t,
//     s,
//     result = []
//   for (
//     t = srcIndex + step, s = srcIndex;
//     areLocal(t, s);
//     t += step, s += step
//   ) {
//     if (getPieceMatchingIndex1(t, atkPieces)) {
//       break
//     }
//     if (getPieceMatchingIndex1(t, defPieces)) {
//       result.push(t)
//       break
//     }
//     result.push(t)
//   }
//   return result
// }

export { isPlayerInCheck }
