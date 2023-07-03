function newTiles() {
  let result = []
  for (let i = 0; i < 64; i++) {
    result = [...result, { tile_id: i.toString(), tile_num: i, letter: "0" }]
  }
  return result
}
export { newTiles }
