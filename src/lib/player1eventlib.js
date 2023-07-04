// import {
//   aiChoosesTile,
//   index2Rank,
//   index2File,
//   index2Column,
//   rf2Index,
// } from "./applib"
import { getPieceMatchingIndex } from "../state/pieces"
import {
  player1Pawn1Step,
  player1Pawn2Step,
  player1PawnCaptureLeft,
} from "./player1moves"

// EVENT HANDLER SUPPORT FUNCTIONS
function findDropTargets(pieceElement, pieces1, pieces2) {
  let result = []
  let tile_num = parseInt(pieceElement.getAttribute("tile_num"))
  let { letter } = getPieceMatchingIndex(parseInt(tile_num), pieces1, pieces2)
  switch (letter) {
    case "P":
      result.push(player1Pawn1Step(letter, tile_num, pieces1, pieces2))
      result.push(player1Pawn2Step(letter, tile_num, pieces1, pieces2))
      result.push(player1PawnCaptureLeft(letter, tile_num, pieces1, pieces2))
      // result.push(tile_num - 7) // capture right or en passant
      // result.push(tile_num - 9) // capture left or en passant
      break
  }
  // console.log("letter=" + letter + " tile_num=" + tile_num)
  // console.dir(result)
  // console.dir(
  //   result.map(target => {
  //     if (target !== undefined) return target
  //   })
  // )
  return result.filter(Boolean) // remove undefined elements from array
}

export { findDropTargets }
