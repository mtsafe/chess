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
  })

  it("Move 2 pawns, then click reset, and move them again from the same position", () => {
    // Select 2 Player Mode = player moves pieces taking turns
    cy.get("#ai-algo").select("2 Player Mode")
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
    // Move players 1 & 2 pawns out
    // 1. e3 d6
    validMovePlayer1(pe1, (pe1 += up), "pawn")
    validMovePlayer2(pd2, (pd2 += down), "pawn")
    cy.get("#restart-button").click()
    validMovePlayer1(pe1 - up, pe1, "pawn")
    validMovePlayer2(pd2 - down, pd2, "pawn")
  })

  it("Move 1 pawn, then click reset, and move it again from the same position", () => {
    // Select 2 Player Mode = player moves pieces taking turns
    cy.get("#ai-algo").select("2 Player Mode")
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
    // Move player 1 pawn out
    // 1. e3
    validMovePlayer1(pe1, (pe1 += up), "pawn")
    cy.get("#restart-button").click()
    validMovePlayer1(pe1 - up, pe1, "pawn")
  })
})
