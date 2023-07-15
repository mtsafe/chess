import { PieceImg } from "./PieceImg"
// import { TileImg } from "./TileImg"

export function SquareTile({
  tile_id,
  tile_num,
  handleOnDrag_SetDropzones,
  handleOnDrop_ExecuteMove,
  getPieceMatchingIndexProp,
  isDropZone,
}) {
  let squareShift = 0
  let className, frameBorderClass, tileShade
  if (Math.floor(tile_num / 8) % 2 !== 0) squareShift = 1
  tileShade = (tile_num + squareShift) % 2
  if (tileShade === 0) {
    className = "square-tile light-tile"
    frameBorderClass = "interact-frame border-dark"
  } else {
    className = "square-tile dark-tile"
    frameBorderClass = "interact-frame border-light"
  }

  return (
    <div className={className} tile_id={tile_id}>
      <div className={frameBorderClass}>
        <PieceImg
          tile_num={tile_num}
          tileShade={tileShade}
          handleOnDrag_SetDropzones={handleOnDrag_SetDropzones}
          getPieceMatchingIndexProp={getPieceMatchingIndexProp}
          isDropZone={isDropZone}
          handleOnDrop_ExecuteMove={handleOnDrop_ExecuteMove}
        />
      </div>
    </div>
  )
}
