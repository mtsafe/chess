import {
  chessmen,
  validMovePlayer1,
  validMovePlayer2,
  invalidMovePlayer1,
  invalidMovePlayer2,
  validatePosition,
} from "./testmoves"

function assertStatus(whosTurn, status, gameMode) {
  let statusMsgContains = "Go!"
  if (gameMode === 1) {
    if (status === "+") statusMsgContains = "in check"
  } else if (gameMode === 2) {
    if (status === "-") statusMsgContains = `TURN: Player ${whosTurn}`
    else if (status === "+") statusMsgContains = `${whosTurn} CHECK!`
    else if (status === "#") statusMsgContains = "CHECKMATE:"
    else if (status === "=") statusMsgContains = "STALEMATE:"
  }
  cy.get("#statusMsg").should("contain", statusMsgContains)
}

describe("Test check", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
    // Select 2 Player mode - taking turns
    cy.get("#ai-algo").select("2 Player Mode")
  })

  it("Status of check is messaged", () => {
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
    assertStatus(1, "-", 2)
    // 1. e2-e3 d7-d6
    validMovePlayer1(pe1, (pe1 += up), "pawn")
    assertStatus(2, "-", 2)
    validMovePlayer2(pd2, (pd2 += down), "pawn")
    assertStatus(1, "-", 2)
    // 2. Bf1-b5+ b6-b5
    validMovePlayer1(kb1, (kb1 += 4 * up + 4 * left), "bishop")
    assertStatus(2, "+", 2)
  })

  it("Status of checkmate is messaged: Fool's Mate", () => {
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
    assertStatus(1, "-", 2)
    // 1. f2-f3 e7-e6
    validMovePlayer1(pf1, (pf1 += up), "pawn")
    assertStatus(2, "-", 2)
    validMovePlayer2(pe2, (pe2 += down), "pawn")
    assertStatus(1, "-", 2)
    // 2. g2-g4 Qd1-h4#
    validMovePlayer1(pg1, (pg1 += 2 * up), "pawn")
    assertStatus(2, "-", 2)
    validMovePlayer2(q2, (q2 += 4 * down + 4 * right), "queen")
    assertStatus(1, "#", 2)
  })

  it("Status of stalemate is messaged", () => {
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
    assertStatus(1, "-", 2)
    // 1. c4 h5
    validMovePlayer1(pc1, (pc1 += 2 * up), "pawn")
    assertStatus(2, "-", 2)
    validMovePlayer2(ph2, (ph2 += 2 * down), "pawn")
    assertStatus(1, "-", 2)
    // 2. h4 a5
    validMovePlayer1(ph1, (ph1 += 2 * up), "pawn")
    assertStatus(2, "-", 2)
    validMovePlayer2(pa2, (pa2 += 2 * down), "pawn")
    assertStatus(1, "-", 2)
    // 3. Qa4 Ra6
    validMovePlayer1(q1, (q1 += 3 * up + 3 * left), "queen")
    assertStatus(2, "-", 2)
    validMovePlayer2(qr2, (qr2 += 2 * down), "rook")
    assertStatus(1, "-", 2)
    // 4. Qxa5 Rah6
    validMovePlayer1(q1, (q1 += up), "queen")
    assertStatus(2, "-", 2)
    validMovePlayer2(qr2, (qr2 += 7 * right), "rook")
    assertStatus(1, "-", 2)
    // 5. Qxc7 f6
    validMovePlayer1(q1, (q1 += 2 * up + 2 * right), "queen")
    assertStatus(2, "-", 2)
    validMovePlayer2(pf2, (pf2 += down), "pawn")
    assertStatus(1, "-", 2)
    // 6. Qxd7+ Kf7
    validMovePlayer1(q1, (q1 += right), "queen")
    assertStatus(2, "+", 2)
    validMovePlayer2(k2, (k2 += down + right), "king")
    assertStatus(1, "-", 2)
    // 7. Qxb7 Qd3
    validMovePlayer1(q1, (q1 += 2 * left), "queen")
    assertStatus(2, "-", 2)
    validMovePlayer2(q2, (q2 += 5 * down), "queen")
    assertStatus(1, "-", 2)
    // 8. Qxb8 Qh7
    validMovePlayer1(q1, (q1 += up), "queen")
    assertStatus(2, "-", 2)
    validMovePlayer2(q2, (q2 += 4 * up + 4 * right), "queen")
    assertStatus(1, "-", 2)
    // 9. qxc8 Kg6
    validMovePlayer1(q1, (q1 += right), "queen")
    assertStatus(2, "-", 2)
    validMovePlayer2(k2, (k2 += down + right), "king")
    assertStatus(1, "-", 2)
    // 10. Qe6 1/2-1/2
    validMovePlayer1(q1, (q1 += 2 * down + 2 * right), "queen")
    assertStatus(2, "=", 2)
  })
})
