import {
  chessmen,
  validMovePlayer1,
  validMovePlayer2,
  invalidMovePlayer1,
  invalidMovePlayer2,
  validatePosition,
} from "./testmoves"

// function assertStatus(whosTurn, status, gameMode) {
//   let statusMsgContains = "Go!"
//   if (gameMode === 1) {
//     if (status === "+") statusMsgContains = "in check"
//   } else if (gameMode === 2) {
//     if (status === "-") statusMsgContains = `TURN: Player ${whosTurn}`
//     else if (status === "+") statusMsgContains = `${whosTurn} CHECK!`
//     else if (status === "#") statusMsgContains = "CHECKMATE:"
//     else if (status === "=") statusMsgContains = "STALEMATE:"
//   }
//   cy.get("#statusMsg").should("contain", statusMsgContains)
// }

describe("Test check", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
    // Select 2 Player mode - taking turns
    cy.get("#ai-algo").select("Walker")
  })

  it("NPC player 2: walker", () => {
    let up = -8,
      down = 8,
      left = -1,
      right = 1,
      kingsidecastle = 2,
      queensidecastle = -2
    let { pa1, pb1, pc1, pd1, pe1, pf1, pg1, ph1 } = chessmen
    let { qr1, qn1, qb1, q1, k1, kb1, kn1, kr1 } = chessmen
    let { pa2, pb2, pc2, pd2, pe2, pf2, pg2, ph2 } = chessmen
    let { qr2, qn2, qb2, q2, k2, kb2, kn2, kr2 } = chessmen

    // move kings near pawns
    // 1. e2-e3 a7-a6
    validMovePlayer1(pe1, (pe1 += up), "pawn")
    validatePosition((pa2 += 1), 2, "pawn")
    // 2. Bf1-b5+ a6-a5
    validMovePlayer1(kb1, (kb1 += 4 * up + 4 * left), "bishop")
    validatePosition((pa2 += 1), 2, "pawn")
  })
})
