import {
  chessmen,
  validMovePlayer1,
  validMovePlayer2,
  invalidMovePlayer1,
  invalidMovePlayer2,
  validatePosition,
} from "./testmoves"

function validMoveA2B(a, b, player, pName) {
  let dataTransfer = new DataTransfer()
  const playerStr = ["", "Your", "Computer's"]
  cy.get(
    `div[tile_id="${a}"] div img[alt="${playerStr[player]} ${pName}"]`
  ).should("be.visible")
  cy.get(
    `div[tile_id="${a}"] div img[alt="${playerStr[player]} ${pName}"]`
  ).trigger("dragstart", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img`).trigger("drop", {
    dataTransfer,
  })
  cy.get(
    `div[tile_id="${b}"] div img[alt="${playerStr[player]} ${pName}"]`
  ).should("be.visible")
}

describe("Test AIStrategies", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
  })

  it("Test AI Algo Test Mode 1", () => {
    let a = 48
    cy.get("#ai-algo").should("be.visible")
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
    validMoveA2B(pa1, (pa1 += up), 1, "pawn")
    validMoveA2B(pa1, (pa1 += up), 1, "pawn")
    validMoveA2B(pb1, (pb1 += 2 * up), 1, "pawn")
    validMoveA2B(pc1, (pc1 += 2 * up), 1, "pawn")
    validMoveA2B(pd1, (pd1 += 2 * up), 1, "pawn")
    validMoveA2B(pe1, (pe1 += 2 * up), 1, "pawn")
    validMoveA2B(pf1, (pf1 += 2 * up), 1, "pawn")
    validMoveA2B(pg1, (pg1 += 2 * up), 1, "pawn")
    validMoveA2B(ph1, (ph1 += 2 * up), 1, "pawn")
    validMoveA2B(qr1, (qr1 += up), 1, "rook")
    validMoveA2B(qn1, (qn1 += 2 * up + left), 1, "knight")
    validMoveA2B(qb1, (qb1 += up + left), 1, "bishop")
    validMoveA2B(q1, (q1 += up + left), 1, "queen")
    validMoveA2B(kb1, (kb1 += 2 * up + 2 * right), 1, "bishop")
    validMoveA2B(kn1, (kn1 += 2 * up + left), 1, "knight")
    validMoveA2B(k1, (k1 += kingsidecastle), 1, "king")
    // Move player 2 pieces
    validMoveA2B(pa2, (pa2 += down), 2, "pawn")
    validMoveA2B(pa2, (pa2 += down), 2, "pawn")
    validMoveA2B(pb2, (pb2 += 2 * down), 2, "pawn")
    validMoveA2B(pc2, (pc2 += 2 * down), 2, "pawn")
    validMoveA2B(pd2, (pd2 += 2 * down), 2, "pawn")
    validMoveA2B(pe2, (pe2 += 2 * down), 2, "pawn")
    validMoveA2B(pf2, (pf2 += 2 * down), 2, "pawn")
    validMoveA2B(pg2, (pg2 += 2 * down), 2, "pawn")
    validMoveA2B(ph2, (ph2 += 2 * down), 2, "pawn")
    validMoveA2B(qr2, (qr2 += down), 2, "rook")
    validMoveA2B(qn2, (qn2 += 2 * down + right), 2, "knight")
    validMoveA2B(qb2, (qb2 += down + right), 2, "bishop")
    validMoveA2B(q2, (q2 += down + right), 2, "queen")
    validMoveA2B(kb2, (kb2 += down + right), 2, "bishop")
    validMoveA2B(kn2, (kn2 += 2 * down + right), 2, "knight")
    validMoveA2B(k2, (k2 += kingsidecastle), 2, "king")

    // Select Test Mode 2 = player takes turns
    cy.get("#ai-algo").select("Test Mode 2")
    cy.get("#ai-algo").should("have.value", "1")
  })

  it("Test AI Algo Test Mode 2", () => {
    let a = 48
    cy.get("#ai-algo").should("be.visible")
    // Select Test Mode 1 = player moves any pieces
    cy.get("#ai-algo").select("Test Mode 1")
    cy.get("#ai-algo").should("have.value", "0")
    // Move player 1 pieces
    let up = -8,
      down = 8,
      left = -1,
      right = 1,
      kingsidecastle = 2
    // Move player 2 pieces

    // Select Test Mode 2 = player takes turns
    cy.get("#ai-algo").select("Test Mode 2")
    cy.get("#ai-algo").should("have.value", "1")
  })

  // Gameplay should continue even when AI Algos switch
  it("Tests AI Algos Switching", () => {
    let a = 48
    cy.get("#ai-algo").should("be.visible")
    // Select Test Mode 1 = player moves any pieces
    cy.get("#ai-algo").select("Test Mode 1")
    cy.get("#ai-algo").should("have.value", "0")
    // Move player 1 pieces
    let up = -8,
      down = 8,
      left = -1,
      right = 1,
      kingsidecastle = 2
    // Move player 2 pieces

    // Select Test Mode 2 = player takes turns
    cy.get("#ai-algo").select("Test Mode 2")
    cy.get("#ai-algo").should("have.value", "1")
  })
})
