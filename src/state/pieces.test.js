// import {
//   newPieces1,
//   newPieces2,
//   getFreshPiecesWithout,
//   getPieceMatchingIndex,
// } from "./pieces"

function newPieces1() {
  // player one is light shade
  let result = [
    { name: "Queen", code: "Q", letter: "Q", index: 3 },
    { name: "King", code: "K", letter: "K", index: 4 },
    { name: "Bishop", code: "QB", letter: "B", index: 2 },
    { name: "Bishop", code: "KB", letter: "B", index: 5 },
    { name: "Knight", code: "QN", letter: "N", index: 1 },
    { name: "Knight", code: "KN", letter: "N", index: 6 },
    { name: "Rook", code: "QR", letter: "R", index: 0 },
    { name: "Rook", code: "KR", letter: "R", index: 7 },
    { name: "Pawn", code: "Pa", letter: "P", index: 8 },
    { name: "Pawn", code: "Pb", letter: "P", index: 9 },
    { name: "Pawn", code: "Pc", letter: "P", index: 10 },
    { name: "Pawn", code: "Pd", letter: "P", index: 11 },
    { name: "Pawn", code: "Pe", letter: "P", index: 12 },
    { name: "Pawn", code: "Pf", letter: "P", index: 13 },
    { name: "Pawn", code: "Pg", letter: "P", index: 14 },
    { name: "Pawn", code: "Ph", letter: "P", index: 15 },
  ]
  result = result.map(piece => {
    piece.player = 1
    return piece
  })
  return result
}

function getFreshPiecesWithout(tarIndex, pieces) {
  return pieces
    .map(p => {
      if (p.index !== tarIndex) return p
    })
    .filter(Boolean)
}

test("test data is array", () => {
  let pieces = newPieces1()
  let testValue = Array.isArray(pieces)
  expect(testValue).toBe(true)
})

test("result is array", () => {
  let pieces = getFreshPiecesWithout(8, newPieces1())
  let testValue = Array.isArray(pieces)
  expect(testValue).toBe(true)
})

test("result does not contain one member", () => {
  let pieces = getFreshPiecesWithout(8, newPieces1())
  let testValue = true
  pieces.forEach(piece => {
    testValue = testValue && piece.index !== 8
  })
  expect(testValue).toBe(true)
})

test("multiple calls", () => {
  let pieces = getFreshPiecesWithout(8, newPieces1())
  pieces = getFreshPiecesWithout(7, pieces)
  pieces = getFreshPiecesWithout(12, pieces)
  let testValue = true
  pieces.forEach(piece => {
    testValue =
      testValue && piece.index !== 7 && piece.index !== 8 && piece.index !== 12
  })
  console.dir(pieces)
  expect(testValue).toBe(true)
})

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

// test("todos list", async () => {
// axios.get.mockResolvedValue({ data: dummyTodos });
// render(<Todos />);

// const todoList = await waitFor(() => screen.findAllByTestId("todo"));

// expect(todoList).toHaveLength(3);
// });
