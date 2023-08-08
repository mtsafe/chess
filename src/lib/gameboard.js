function rc2Index(rank, column) {
  return (8 - rank) * 8 + column - 1
}
function rf2Index(rank, file) {
  return (8 - rank) * 8 + file.charCodeAt(0) - 97
}
function index2RF(index) {
  index2File(index) + index2Rank(index)
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

export { rc2Index, rf2Index, index2RF, index2Rank, index2File, index2Column }
