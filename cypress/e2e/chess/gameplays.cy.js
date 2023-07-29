import {
  chessmen,
  validMovePlayer1,
  validMovePlayer2,
  invalidMovePlayer1,
  invalidMovePlayer2,
  validatePosition,
} from "./testmoves"

describe("Test Gameplay Modes", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
    cy.get("#ai-algo").should("be.visible")
  })

  it("Test AI Algo Test Mode 1: move without taking turns", () => {
    let a = 48
    // Select Test Mode 1 = player moves any pieces
    cy.get("#ai-algo").select("Test Mode 1")
    cy.get("#ai-algo").should("have.value", "0")

    // Move player 1 pieces
    let up = -8,
      down = 8,
      left = -1,
      right = 1,
      kingsidecastle = 2
    let { pa1, pb1, pc1, pd1, pe1, pf1, pg1, ph1 } = chessmen
    let { qr1, qn1, qb1, q1, k1, kb1, kn1, kr1 } = chessmen
    let { pa2, pb2, pc2, pd2, pe2, pf2, pg2, ph2 } = chessmen
    let { qr2, qn2, qb2, q2, k2, kb2, kn2, kr2 } = chessmen
    validMovePlayer1(pa1, (pa1 += up), "pawn")
    validMovePlayer1(pa1, (pa1 += up), "pawn")
    validMovePlayer1(pb1, (pb1 += 2 * up), "pawn")
    validMovePlayer1(pc1, (pc1 += 2 * up), "pawn")
    validMovePlayer1(pd1, (pd1 += 2 * up), "pawn")
    validMovePlayer1(pe1, (pe1 += 2 * up), "pawn")
    validMovePlayer1(pf1, (pf1 += 2 * up), "pawn")
    validMovePlayer1(pg1, (pg1 += 2 * up), "pawn")
    validMovePlayer1(ph1, (ph1 += 2 * up), "pawn")
    validMovePlayer1(qr1, (qr1 += up), "rook")
    validMovePlayer1(qn1, (qn1 += 2 * up + left), "knight")
    validMovePlayer1(qb1, (qb1 += up + left), "bishop")
    validMovePlayer1(q1, (q1 += up + left), "queen")
    validMovePlayer1(kb1, (kb1 += 2 * up + 2 * right), "bishop")
    validMovePlayer1(kn1, (kn1 += 2 * up + left), "knight")
    validMovePlayer1(k1, (k1 += kingsidecastle), "king")
    // Move player 2 pieces
    validMovePlayer2(pa2, (pa2 += down), "pawn")
    validMovePlayer2(pa2, (pa2 += down), "pawn")
    validMovePlayer2(pb2, (pb2 += 2 * down), "pawn")
    validMovePlayer2(pc2, (pc2 += 2 * down), "pawn")
    validMovePlayer2(pd2, (pd2 += 2 * down), "pawn")
    validMovePlayer2(pe2, (pe2 += 2 * down), "pawn")
    validMovePlayer2(pf2, (pf2 += 2 * down), "pawn")
    validMovePlayer2(pg2, (pg2 += 2 * down), "pawn")
    validMovePlayer2(ph2, (ph2 += 2 * down), "pawn")
    validMovePlayer2(qr2, (qr2 += down), "rook")
    validMovePlayer2(qn2, (qn2 += 2 * down + right), "knight")
    validMovePlayer2(qb2, (qb2 += down + right), "bishop")
    validMovePlayer2(q2, (q2 += down + right), "queen")
    validMovePlayer2(kb2, (kb2 += down + right), "bishop")
    validMovePlayer2(kn2, (kn2 += 2 * down + right), "knight")
    validMovePlayer2(k2, (k2 += kingsidecastle), "king")
  })

  it("Test AI Algo Test Mode 2: Taking turns", () => {
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
    // Cannot move player 2 first
    invalidMovePlayer2(kn2, kn2 + 2 * down + left, "knight")
    // Cannot move player 1 pieces 2 times
    validMovePlayer1(pa1, (pa1 += up), "pawn")
    invalidMovePlayer1(pa1, pa1 + up, "pawn")
    // Cannot move player 2 pieces 2 times
    validMovePlayer2(kn2, (kn2 += 2 * down + left), "knight")
    invalidMovePlayer2(kn2, kn2 + down + 2 * right, "knight")
    // Retry previously invalid player 1 move
    validMovePlayer1(pa1, (pa1 += up), "pawn")
    // Retry previously invalid player 2 move
    validMovePlayer2(kn2, (kn2 += down + 2 * right), "knight")
  })

  // Gameplay should continue even when AI Algos switch
  it("Tests AI Algos Switching", () => {
    let a = 48
    // Select Test Mode 1 = player moves any pieces
    cy.get("#ai-algo").select("Test Mode 1")
    cy.get("#ai-algo").should("have.value", "0")
    let up = -8,
      down = 8,
      left = -1,
      right = 1,
      kingsidecastle = 2
    let { pa1, pb1, pc1, pd1, pe1, pf1, pg1, ph1 } = chessmen
    let { qr1, qn1, qb1, q1, k1, kb1, kn1, kr1 } = chessmen
    let { pa2, pb2, pc2, pd2, pe2, pf2, pg2, ph2 } = chessmen
    let { qr2, qn2, qb2, q2, k2, kb2, kn2, kr2 } = chessmen
    // Move player 1 pieces
    validMovePlayer1(pa1, (pa1 += 2 * up), "pawn")
    validMovePlayer1(pc1, (pc1 += 2 * up), "pawn")
    validMovePlayer1(pe1, (pe1 += 2 * up), "pawn")
    validMovePlayer1(pg1, (pg1 += 2 * up), "pawn")
    // Move player 2 pieces
    validMovePlayer2(pa2, (pa2 += 2 * down), "pawn")
    validMovePlayer2(pc2, (pc2 += 2 * down), "pawn")
    validMovePlayer2(pe2, (pe2 += 2 * down), "pawn")
    validMovePlayer2(pg2, (pg2 += 2 * down), "pawn")

    // Select Test Mode 2 = player takes turns
    cy.get("#ai-algo").select("Test Mode 2")
    cy.get("#ai-algo").should("have.value", "1")
    // Invalid pawn first moves already moved
    invalidMovePlayer1(pa1, pa1 + 2 * up, "pawn")
    invalidMovePlayer2(pa2, pa2 + 2 * down, "pawn")
    // Turn for player 1
    invalidMovePlayer2(pb2, pb2 + down, "pawn")
    validMovePlayer1(pb1, (pb1 += up), "pawn")
    // Turn for player 2
    invalidMovePlayer1(pb1, pb1 + up, "pawn")
    validMovePlayer2(pb2, (pb2 += down), "pawn")
    // Turn for player 1
    invalidMovePlayer2(pb2, pb2 + down, "pawn")
  })
})
