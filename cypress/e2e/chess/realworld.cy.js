import {
  chessmen,
  validMovePlayer1,
  validMovePlayer2,
  invalidMovePlayer1,
  invalidMovePlayer2,
  validatePosition,
} from "./testmoves"

describe("Retest Real World Previous Failures", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
    cy.get("#ai-algo").should("be.visible")
  })

  it("Test Mode 2: Queen can attack pawn", () => {
    // Select Test Mode 2 = player moves pieces taking turns
    cy.get("#ai-algo").select("Test Mode 2")
    cy.get("#ai-algo").should("have.value", "1")
    let up = -8,
      down = 8,
      left = -1,
      right = 1,
      kingsidecastle = 2
    let { pa1, pb1, pc1, pd1, pe1, pf1, pg1, ph1 } = chessmen
    let { qr1, qn1, qb1, q1, k1, kb1, kn1, kr1 } = chessmen
    let { pa2, pb2, pc2, pd2, pe2, pf2, pg2, ph2 } = chessmen
    let { qr2, qn2, qb2, q2, k2, kb2, kn2, kr2 } = chessmen
    // 1. e4 d5
    // 2. exd5 Qxd5
    validMovePlayer1(pe1, (pe1 += 2 * up), "pawn")
    validMovePlayer2(pd2, (pd2 += 2 * down), "pawn")
    validMovePlayer1(pe1, (pe1 += up + left), "pawn")
    validMovePlayer2(q2, (q2 += 3 * down), "queen")
  })
})
