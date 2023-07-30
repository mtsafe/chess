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

  it("Cannot drag and drop transparent img", () => {
    // Needs test code
    let dataTransfer = new DataTransfer()
    let a = 20,
      b = a - 8
    cy.get(`div[tile_id="${a}"] div img[alt = ""]`).should("be.visible")
    cy.get(`div[tile_id="${b}"] div img[alt = "Computer's pawn"]`).should(
      "be.visible"
    )
    cy.get(`div[tile_id="${a}"] div img[alt = ""]`).trigger("dragstart", {
      dataTransfer,
    })
    cy.get(`div[tile_id="${b}"] div img`).trigger("drop", { dataTransfer })
    cy.get(`div[tile_id="${a}"] div img[alt = ""]`).should("be.visible")
    cy.get(`div[tile_id="${b}"] div img[alt = "Computer's pawn"]`).should(
      "be.visible"
    )
  })

  it("Action CAPTURE object works properly", () => {
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
    // Move pawns out and player 1 pawn takes player 2 pawn
    // 1. e4 d5
    // 2. exd5
    validMovePlayer1(pe1, (pe1 += 2 * up), "pawn")
    validMovePlayer2(pd2, (pd2 += 2 * down), "pawn")
    validMovePlayer1(pe1, (pe1 += up + left), "pawn")
    // Move pawns out and player 2 pawn takes player 1 pawn
    // 2. exd5 f4
    // 3. g5 fxg5
    validMovePlayer2(pf2, (pf2 += 2 * down), "pawn")
    validMovePlayer1(pg1, (pg1 += 2 * up), "pawn")
    validMovePlayer2(pf2, (pf2 += down + right), "pawn")
  })

  it("Action EN_PASSANT object works properly", () => {
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
    // Move players 1 & 2 pawns out to en passant
    // 1. b4 g5
    // 2. b5 g4
    // 3. f4 gEf3
    // 4. a3 c5
    // 5. bEc6
    validMovePlayer1(pb1, (pb1 += 2 * up), "pawn")
    validMovePlayer2(pg2, (pg2 += 2 * down), "pawn")
    validMovePlayer1(pb1, (pb1 += up), "pawn")
    validMovePlayer2(pg2, (pg2 += down), "pawn")
    validMovePlayer1(pf1, (pf1 += 2 * up), "pawn")
    validMovePlayer2(pg2, (pg2 += down + left), "pawn")
    validMovePlayer1(pa1, (pa1 += up), "pawn")
    validMovePlayer2(pc2, (pc2 += 2 * down), "pawn")
    validMovePlayer1(pb1, (pb1 += up + right), "pawn")
  })

  it("Action MOVE object works properly", () => {
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
    // Move players 1 & 2 pawns out
    // 1. e3 d6
    validMovePlayer1(pe1, (pe1 += up), "pawn")
    validMovePlayer2(pd2, (pd2 += down), "pawn")
  })

  it("Action CAPTURE_PROMOTE object works properly", () => {
    // Needs test code
  })

  it("Action MOVE_PROMOTE object works properly", () => {
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
    // Move players 1 & 2 pawns out
    // 1. a4 h5
    validMovePlayer1(pa1, (pa1 += 2 * up), "pawn")
    validMovePlayer2(ph2, (ph2 += 2 * down), "pawn")
    // 2. a5 h4
    validMovePlayer1(pa1, (pa1 += up), "pawn")
    validMovePlayer2(ph2, (ph2 += down), "pawn")
    // 3. a6 h3
    validMovePlayer1(pa1, (pa1 += up), "pawn")
    validMovePlayer2(ph2, (ph2 += down), "pawn")
    // 4. Nc6 Nf3
    validMovePlayer1(kn1, (kn1 += 2 * up + left), "knight")
    validMovePlayer2(qn2, (qn2 += 2 * down + right), "knight")
    // 5. axb7 hxg2
    validMovePlayer1(pa1, (pa1 += up + right), "pawn")
    validMovePlayer2(ph2, (ph2 += down + left), "pawn")
    // 6. b8 f8
    validMovePlayer1(pa1, (pa1 += up), "pawn")
    validMovePlayer2(ph2, (ph2 += down), "pawn")
  })

  it("Action KINGSIDE_CASTLE object works properly", () => {
    // Needs test code
  })

  it("Action QUEENSIDE_CASTLE object works properly", () => {
    // Needs test code
  })
})
