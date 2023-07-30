import {
  chessmen,
  validMovePlayer1,
  validMovePlayer2,
  invalidMovePlayer1,
  invalidMovePlayer2,
  validatePosition,
} from "./testmoves"

describe("Test bishop", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
    // Select Test Mode 1 = player moves any pieces
    cy.get("#ai-algo").select("Test Mode 1")
  })

  it("Player 1 moves bishop: steps, attacks, and invalid moves", () => {
    let { pa1, pb1, pc1, pd1, pe1, pf1, pg1, ph1 } = chessmen
    let { qr1, qn1, qb1, q1, k1, kb1, kn1, kr1 } = chessmen
    let { pa2, pb2, pc2, pd2, pe2, pf2, pg2, ph2 } = chessmen
    let { qr2, qn2, qb2, q2, k2, kb2, kn2, kr2 } = chessmen
    let up = -8,
      down = 8,
      left = -1,
      right = 1
    // get the bishop out
    validMovePlayer1(pd1, (pd1 += 2 * up), "pawn")
    validMovePlayer1(qb1, (qb1 += 3 * up + 3 * right), "bishop")
    // now cha-cha
    validMovePlayer1(qb1, (qb1 += down + right), "bishop")
    validMovePlayer1(qb1, (qb1 += up + left), "bishop")
    validMovePlayer1(qb1, (qb1 += up + right), "bishop")
    validMovePlayer1(qb1, (qb1 += down + left), "bishop")
    // now do invalid moves
    validMovePlayer1(pe1, (pe1 += up), "pawn")
    invalidMovePlayer1(qb1, qb1 + 2 * down + 2 * left, "bishop")
    invalidMovePlayer1(qb1, qb1 + 3 * up + 3 * right, "bishop")
    invalidMovePlayer1(qb1, qb1 + 2 * down + 2 * right, "bishop")
    invalidMovePlayer1(qb1, qb1 + 4 * up + 4 * left, "bishop")
    // now do attack move
    validMovePlayer1(qb1, (qb1 += 3 * up + 3 * left), "bishop")
    // now try to illegally step into check from pinned position
    validMovePlayer2(pd2, (pd2 += down), "pawn")
    validMovePlayer2(pf2, (pf2 += down), "pawn")
    validMovePlayer2(pg2, (pg2 += 2 * down), "pawn")
    validMovePlayer2(qb2, (qb2 += 2 * down + 2 * right), "bishop")
    validMovePlayer2(qb2, (qb2 += up + right), "bishop")
    validMovePlayer1(kb1, (kb1 += up + left), "bishop")
    validMovePlayer1(kb1, (kb1 += 3 * up + 3 * right), "bishop")
    invalidMovePlayer2(kb2, kb2 + 2 * down + 2 * left, "bishop")
  })

  it("Player 2 moves bishop: steps, attacks, and invalid moves", () => {
    let { pa1, pb1, pc1, pd1, pe1, pf1, pg1, ph1 } = chessmen
    let { qr1, qn1, qb1, q1, k1, kb1, kn1, kr1 } = chessmen
    let { pa2, pb2, pc2, pd2, pe2, pf2, pg2, ph2 } = chessmen
    let { qr2, qn2, qb2, q2, k2, kb2, kn2, kr2 } = chessmen
    let up = -8,
      down = 8,
      left = -1,
      right = 1
    // get the bishop out
    validMovePlayer2(pd2, (pd2 += 2 * down), "pawn")
    validMovePlayer2(qb2, (qb2 += 3 * down + 3 * right), "bishop")
    // now cha-cha
    validMovePlayer2(qb2, (qb2 += up + right), "bishop")
    validMovePlayer2(qb2, (qb2 += down + left), "bishop")
    validMovePlayer2(qb2, (qb2 += down + right), "bishop")
    validMovePlayer2(qb2, (qb2 += up + left), "bishop")
    // now do invalid moves
    validMovePlayer2(pe2, (pe2 += down), "pawn")
    invalidMovePlayer2(qb2, qb2 + 2 * up + 2 * left, "bishop")
    invalidMovePlayer2(qb2, qb2 + 3 * down + 3 * right, "bishop")
    invalidMovePlayer2(qb2, qb2 + 2 * up + 2 * right, "bishop")
    invalidMovePlayer2(qb2, qb2 + 4 * down + 4 * left, "bishop")
    // now do attack move
    validMovePlayer2(qb2, (qb2 += 3 * down + 3 * left), "bishop")
    // now try to illegally step into check from pinned position
    validMovePlayer1(pd1, (pd1 += up), "pawn")
    validMovePlayer1(pf1, (pf1 += up), "pawn")
    validMovePlayer1(pg1, (pg1 += 2 * up), "pawn")
    validMovePlayer1(qb1, (qb1 += 2 * up + 2 * right), "bishop")
    validMovePlayer1(qb1, (qb1 += down + right), "bishop")
    validMovePlayer2(kb2, (kb2 += down + left), "bishop")
    validMovePlayer2(kb2, (kb2 += 3 * down + 3 * right), "bishop")
    invalidMovePlayer1(kb1, kb1 + 2 * up + 2 * left, "bishop")
  })
})
