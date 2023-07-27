import {
  chessmen,
  validMovePlayer1,
  validMovePlayer2,
  invalidMovePlayer1,
  invalidMovePlayer2,
  validatePosition,
} from "./testmoves"

describe("Test check", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
    // Select Test Mode 1 = player moves any pieces
    cy.get("#ai-algo").select("Test Mode 1")
  })

  it("Cannot move king into check", () => {
    let { pd1, pe1, q1, k1, qr2, qn2, qb2, q2, k2 } = chessmen
    // move kings near pawns
    validMovePlayer1(pe1, (pe1 -= 16), "pawn")
    validMovePlayer1(k1, (k1 -= 8), "king")
    validMovePlayer1(k1, (k1 -= 8), "king")
    validMovePlayer1(k1, (k1 += 1), "king")
    validMovePlayer1(k1, (k1 += 1), "king")
    validMovePlayer1(k1, (k1 -= 8), "king")
    validMovePlayer1(k1, (k1 -= 8), "king")
    // now try to illegally step into check by pawns
    invalidMovePlayer1(k1, k1 - 8, "king")
    // use queen to kill pawn d7
    validMovePlayer1(q1, (q1 -= 7), "queen")
    validMovePlayer1(q1, (q1 -= 9), "queen")
    validMovePlayer1(q1, (q1 -= 32), "queen")
    validMovePlayer1(q1, (q1 += 7), "queen")
    // now try to illegally step into check by bishop
    invalidMovePlayer1(k1, k1 - 1, "king")
    // use queen to kill pawn e7
    validMovePlayer1(k1, (k1 += 7), "king")
    validMovePlayer1(q1, (q1 += 2), "queen")
    validMovePlayer1(q1, (q1 -= 8), "queen")
    validMovePlayer1(q1, (q1 += 14), "queen")
    // now try to illegally step into check by queen
    invalidMovePlayer1(k1, k1 - 7, "king")
    // move king to other side
    validMovePlayer1(k1, (k1 += 7), "king")
    validMovePlayer1((pd1 = 51), (pd1 -= 16), "pawn")
    validMovePlayer1(q1, (q1 -= 7), "queen")
    validMovePlayer1(k1, (k1 -= 1), "king")
    validMovePlayer1(k1, (k1 -= 9), "king")
    validMovePlayer1(k1, (k1 -= 9), "king")
    // use queen to kill pawn b7
    validMovePlayer1(q1, (q1 += 7), "queen")
    validMovePlayer1(q1, (q1 -= 9), "queen")
    validMovePlayer1(q1, (q1 -= 8), "queen")
    // now try to illegally step into check by knight
    invalidMovePlayer1(k1, k1 - 9, "king")
    invalidMovePlayer1(k1, k1 - 7, "king")
    // use queen to kill pawn a7
    validMovePlayer1(q1, (q1 -= 1), "queen")
    validMovePlayer1(q1, (q1 += 1), "queen")
    // now try to illegally step into check by rook
    invalidMovePlayer1(k1, k1 - 1, "king")
    // set up player 2 queenside castle
    validMovePlayer2(qn2, (qn2 += 15), "knight")
    validMovePlayer2(qb2, (qb2 += 45), "bishop")
    validMovePlayer2(q2, (q2 += 16), "queen")
    // now try to illegally queenside castle covered by check by queen
    invalidMovePlayer2(k2, k2 - 2, "king")
    validatePosition(qr2, 2, "rook")
    // back up player 1 queen
    validMovePlayer1(q1, (q1 += 8), "queen")
    // now try to legally queenside castle while b8 is covered by check by queen
    validMovePlayer2(k2, (k2 -= 2), "king")
    validatePosition((qr2 += 3), 2, "rook")
  })

  it("Cannot kingside castle into check", () => {
    let { pd1, pe1, qb1, k1, kb1, kn1, kr1, qr2, k2, kb2, kn2, kr2, pe2, pg2 } =
      chessmen

    // set up player 1 for kingside castle
    validMovePlayer1(pe1, (pe1 -= 16), "pawn")
    validMovePlayer1(kb1, (kb1 -= 36), "bishop")
    validMovePlayer1(kn1, (kn1 -= 15), "knight")
    // now try to legally kingside castle
    validMovePlayer1(k1, (k1 += 2), "king")
    validatePosition((kr1 -= 2), 1, "rook")

    // set up player 2 for kingside castle
    validMovePlayer2(kn2, (kn2 += 15), "knight")
    validMovePlayer2(pe2, (pe2 += 8), "pawn")
    validMovePlayer2(kb2, (kb2 += 14), "bishop")
    validMovePlayer2(pg2, (pg2 += 8), "pawn")

    // set up player 2 to cover kingside castle at f8
    validMovePlayer1(pd1, (pd1 -= 8), "pawn")
    validMovePlayer1(qb1, (qb1 -= 35), "bishop")

    // now try to illegally queenside castle covered by check by bishop
    invalidMovePlayer2(k2, k2 + 2, "king")
    validatePosition(qr2, 2, "rook")
    // move player 1 bishop to cover rook
    validMovePlayer1(qb1, (qb1 -= 9), "bishop")
    validMovePlayer1(qb1, (qb1 += 7), "bishop")
    // now try to legally kingside castle while h8 is covered by bishop
    validMovePlayer2(k2, (k2 += 2), "king")
    validatePosition((kr2 -= 2), 2, "rook")
  })
})
