import {
  chessmen,
  validMovePlayer1,
  validMovePlayer2,
  invalidMovePlayer1,
  invalidMovePlayer2,
  validatePosition,
} from "./testmoves"

describe("Test rook", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
    // Select Test Mode = player moves any pieces
    cy.get("#ai-algo").select("Test Mode")
  })

  it("Player 1 moves rook: steps, attacks, and invalid moves", () => {
    let { pa1, pb1, pc1, pd1, pe1, pf1, pg1, ph1 } = chessmen
    let { qr1, qn1, qb1, q1, k1, kb1, kn1, kr1 } = chessmen
    let { pa2, pb2, pc2, pd2, pe2, pf2, pg2, ph2 } = chessmen
    let { qr2, qn2, qb2, q2, k2, kb2, kn2, kr2 } = chessmen
    let up = -8,
      down = 8,
      left = -1,
      right = 1
    // get the rook out
    validMovePlayer1(pa1, (pa1 += 2 * up), "pawn")
    validMovePlayer1(qr1, (qr1 += 2 * up), "rook")
    validMovePlayer1(qr1, (qr1 += 3 * right), "rook")
    validMovePlayer1(qr1, (qr1 += 2 * up), "rook")
    // now cha-cha
    validMovePlayer1(qr1, (qr1 += down), "rook")
    validMovePlayer1(qr1, (qr1 += left), "rook")
    validMovePlayer1(qr1, (qr1 += right), "rook")
    // now do invalid moves
    invalidMovePlayer1(qr1, qr1 + 4 * left, "rook")
    invalidMovePlayer1(qr1, qr1 + 5 * right, "rook")
    invalidMovePlayer1(qr1, qr1 + 2 * down, "rook")
    // now do attack move
    validMovePlayer1(qr1, (qr1 += 4 * right), "rook")
    validMovePlayer1(qr1, (qr1 += 3 * up), "rook")
    validMovePlayer1(qr1, (qr1 += left), "rook")
    // now try to illegally step into check from pinned position
    validMovePlayer1(pe1, (pe1 += 2 * up), "pawn")
    validMovePlayer1(qr1, (qr1 += 4 * down), "rook")
    validMovePlayer1(qr1, (qr1 += 2 * left), "rook")
    validMovePlayer2(kr2, (kr2 += 4 * down), "rook")
    validMovePlayer2(kr2, (kr2 += 3 * left), "rook")
    invalidMovePlayer1(qr1, qr1 + right, "rook")
  })

  it("Player 2 moves rook: steps, attacks, and invalid moves", () => {
    let { pa1, pb1, pc1, pd1, pe1, pf1, pg1, ph1 } = chessmen
    let { qr1, qn1, qb1, q1, k1, kb1, kn1, kr1 } = chessmen
    let { pa2, pb2, pc2, pd2, pe2, pf2, pg2, ph2 } = chessmen
    let { qr2, qn2, qb2, q2, k2, kb2, kn2, kr2 } = chessmen
    let up = -8,
      down = 8,
      left = -1,
      right = 1
    // get the rook out
    validMovePlayer2(pa2, (pa2 += 2 * down), "pawn")
    validMovePlayer2(qr2, (qr2 += 2 * down), "rook")
    validMovePlayer2(qr2, (qr2 += 3 * right), "rook")
    validMovePlayer2(qr2, (qr2 += 2 * down), "rook")
    // now cha-cha
    validMovePlayer2(qr2, (qr2 += up), "rook")
    validMovePlayer2(qr2, (qr2 += left), "rook")
    validMovePlayer2(qr2, (qr2 += right), "rook")
    // now do invalid moves
    invalidMovePlayer2(qr2, qr2 + 4 * left, "rook")
    invalidMovePlayer2(qr2, qr2 + 5 * right, "rook")
    invalidMovePlayer2(qr2, qr2 + 2 * up, "rook")
    // now do attack move
    validMovePlayer2(qr2, (qr2 += 4 * right), "rook")
    validMovePlayer2(qr2, (qr2 += 3 * down), "rook")
    validMovePlayer2(qr2, (qr2 += left), "rook")
    // now try to illegally step into check from pinned position
    validMovePlayer2(pe2, (pe2 += 2 * down), "pawn")
    validMovePlayer2(qr2, (qr2 += 4 * up), "rook")
    validMovePlayer2(qr2, (qr2 += 2 * left), "rook")
    validMovePlayer1(kr1, (kr1 += 4 * up), "rook")
    validMovePlayer1(kr1, (kr1 += 3 * left), "rook")
    invalidMovePlayer2(qr2, qr2 + right, "rook")
  })
})
