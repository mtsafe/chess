import { SquareTile } from "./SquareTile"

export function GameBoard({
  tiles,
  handleOnDrag_SetDropzones,
  handleOnDrop_ExecuteMove,
  getPieceMatchingIndexProp,
  getMoveMatchingTarProp,
}) {
  return (
    <div id="chess-board" className="game-board-chess">
      {tiles.map(tile => {
        let isDropZone = false

        if (getMoveMatchingTarProp(tile.tile_num) !== undefined)
          isDropZone = true
        if (isDropZone) console.log(`- square ${tile.tile_num} isDropZone`)
        return (
          <SquareTile
            {...tile}
            key={tile.tile_id}
            tile_id={tile.tile_id}
            tile_num={tile.tile_num}
            handleOnDrag_SetDropzones={handleOnDrag_SetDropzones}
            handleOnDrop_ExecuteMove={handleOnDrop_ExecuteMove}
            getPieceMatchingIndexProp={getPieceMatchingIndexProp}
            isDropZone={isDropZone}
          />
        )
      })}
    </div>
  )
}
