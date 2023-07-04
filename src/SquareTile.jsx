import { PieceImg } from "./PieceImg"
// import { TileImg } from "./TileImg"

export function SquareTile({
  tile_id,
  tile_num,
  handleOnDragProp,
  handleOnDropProp,
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
          handleOnDragProp={handleOnDragProp}
          getPieceMatchingIndexProp={getPieceMatchingIndexProp}
          isDropZone={isDropZone}
          handleOnDropProp={handleOnDropProp}
        />
      </div>
    </div>
  )
}
