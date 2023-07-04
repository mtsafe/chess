import { SquareTile } from "./SquareTile"

export function GameBoard({
  tiles,
  handleOnDragProp,
  handleOnDropProp,
  getPieceMatchingIndexProp,
  getMoveMatchingTarProp,
}) {
  return (
    <div id="chess-board" className="game-board-chess">
      {tiles.map(tile => {
        let isDropZone = false

        if (getMoveMatchingTarProp(tile.tile_num) !== undefined)
          console.log("marking square " + tile.tile_num)
        if (getMoveMatchingTarProp(tile.tile_num) !== undefined)
          isDropZone = true
        return (
          <SquareTile
            {...tile}
            key={tile.tile_id}
            tile_id={tile.tile_id}
            tile_num={tile.tile_num}
            handleOnDragProp={handleOnDragProp}
            handleOnDropProp={handleOnDropProp}
            getPieceMatchingIndexProp={getPieceMatchingIndexProp}
            isDropZone={isDropZone}
          />
        )
      })}
    </div>
  )
}
