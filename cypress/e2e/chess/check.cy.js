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
    // Select Test Mode = player moves any pieces
    cy.get("#ai-algo").select("Test Mode")
  })

  it("Cannot move king into check", () => {
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
    validMovePlayer1(pe1, (pe1 += 2 * up), "pawn")
    validMovePlayer1(k1, (k1 += up), "king")
    validMovePlayer1(k1, (k1 += up), "king")
    validMovePlayer1(k1, (k1 += right), "king")
    validMovePlayer1(k1, (k1 += right), "king")
    validMovePlayer1(k1, (k1 += up), "king")
    validMovePlayer1(k1, (k1 += up), "king")
    // now try to illegally step into check by pawns
    invalidMovePlayer1(k1, k1 + up, "king")
    // use queen to kill pawn d7
    validMovePlayer1(q1, (q1 += up + right), "queen")
    validMovePlayer1(q1, (q1 += up + left), "queen")
    validMovePlayer1(q1, (q1 += 4 * up), "queen")
    validMovePlayer1(q1, (q1 += down + left), "queen")
    // now try to illegally step into check by bishop
    invalidMovePlayer1(k1, k1 + left, "king")
    // use queen to kill pawn e7
    validMovePlayer1(k1, (k1 += down + left), "king")
    validMovePlayer1(q1, (q1 += 2 * right), "queen")
    validMovePlayer1(q1, (q1 += up), "queen")
    validMovePlayer1(q1, (q1 += 2 * down + 2 * left), "queen")
    // now try to illegally step into check by queen
    invalidMovePlayer1(k1, k1 + up + right, "king")
    // move king to other side
    validMovePlayer1(k1, (k1 += down + left), "king")
    validMovePlayer1(pd1, (pd1 += 2 * up), "pawn")
    validMovePlayer1(q1, (q1 += up + right), "queen")
    validMovePlayer1(k1, (k1 += left), "king")
    validMovePlayer1(k1, (k1 += up + left), "king")
    validMovePlayer1(k1, (k1 += up + left), "king")
    // use queen to kill pawn b7
    validMovePlayer1(q1, (q1 += down + left), "queen")
    validMovePlayer1(q1, (q1 += up + left), "queen")
    validMovePlayer1(q1, (q1 += up), "queen")
    // now try to illegally step into check by knight
    invalidMovePlayer1(k1, k1 + up + left, "king")
    invalidMovePlayer1(k1, k1 + up + right, "king")
    // use queen to kill pawn a7
    validMovePlayer1(q1, (q1 += left), "queen")
    validMovePlayer1(q1, (q1 += right), "queen")
    // now try to illegally step into check by rook
    invalidMovePlayer1(k1, k1 + left, "king")
    // set up player 2 queenside castle
    validMovePlayer2(qn2, (qn2 += 2 * down + left), "knight")
    validMovePlayer2(qb2, (qb2 += 5 * down + 5 * right), "bishop")
    validMovePlayer2(q2, (q2 += 2 * down), "queen")
    // now try to illegally queenside castle covered by check by queen
    invalidMovePlayer2(k2, k2 + queensidecastle, "king")
    validatePosition(qr2, 2, "rook")
    // back up player 1 queen
    validMovePlayer1(q1, (q1 += down), "queen")
    // now try to legally queenside castle while b8 is covered by check by queen
    validMovePlayer2(k2, (k2 += queensidecastle), "king")
    validatePosition((qr2 += 3), 2, "rook")
  })

  it("Cannot move king into check [INVERTED]", () => {
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
    validMovePlayer2(pe2, (pe2 += 2 * down), "pawn")
    validMovePlayer2(k2, (k2 += down), "king")
    validMovePlayer2(k2, (k2 += down), "king")
    validMovePlayer2(k2, (k2 += right), "king")
    validMovePlayer2(k2, (k2 += right), "king")
    validMovePlayer2(k2, (k2 += down), "king")
    validMovePlayer2(k2, (k2 += down), "king")
    // now try to illegally step into check by pawns
    invalidMovePlayer2(k2, k2 + down, "king")
    // use queen to kill pawn d2
    validMovePlayer2(q2, (q2 += down + right), "queen")
    validMovePlayer2(q2, (q2 += down + left), "queen")
    validMovePlayer2(q2, (q2 += 4 * down), "queen")
    validMovePlayer2(q2, (q2 += up + left), "queen")
    // now try to illegally step into check by bishop
    invalidMovePlayer2(k2, k2 + left, "king")
    // use queen to kill pawn e2
    validMovePlayer2(k2, (k2 += up + left), "king")
    validMovePlayer2(q2, (q2 += 2 * right), "queen")
    validMovePlayer2(q2, (q2 += down), "queen")
    validMovePlayer2(q2, (q2 += 2 * up + 2 * left), "queen")
    // now try to illegally step into check by queen
    invalidMovePlayer2(k2, k2 + down + right, "king")
    // move king to other side
    validMovePlayer2(k2, (k2 += up + left), "king")
    validMovePlayer2(pd2, (pd2 += 2 * down), "pawn")
    validMovePlayer2(q2, (q2 += down + right), "queen")
    validMovePlayer2(k2, (k2 += left), "king")
    validMovePlayer2(k2, (k2 += down + left), "king")
    validMovePlayer2(k2, (k2 += down + left), "king")
    // use queen to kill pawn b2
    validMovePlayer2(q2, (q2 += up + left), "queen")
    validMovePlayer2(q2, (q2 += down + left), "queen")
    validMovePlayer2(q2, (q2 += down), "queen")
    // now try to illegally step into check by knight
    invalidMovePlayer2(k2, k2 + down + left, "king")
    invalidMovePlayer2(k2, k2 + down + right, "king")
    // use queen to kill pawn a2
    validMovePlayer2(q2, (q2 += left), "queen")
    validMovePlayer2(q2, (q2 += right), "queen")
    // now try to illegally step into check by rook
    invalidMovePlayer2(k2, k2 + left, "king")
    // set up player 2 queenside castle
    validMovePlayer1(qn1, (qn1 += 2 * up + left), "knight")
    validMovePlayer1(qb1, (qb1 += 5 * up + 5 * right), "bishop")
    validMovePlayer1(q1, (q1 += 2 * up), "queen")
    // now try to illegally queenside castle covered by check by queen
    invalidMovePlayer1(k1, k1 + queensidecastle, "king")
    validatePosition(qr1, 1, "rook")
    // back up player 1 queen
    validMovePlayer2(q2, (q2 += up), "queen")
    // now try to legally queenside castle while b1 is covered by check by queen
    validMovePlayer1(k1, (k1 += queensidecastle), "king")
    validatePosition((qr1 += 3), 1, "rook")
  })

  it("Cannot kingside castle into check", () => {
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

    // set up player 1 for kingside castle
    validMovePlayer1(pe1, (pe1 += 2 * up), "pawn")
    validMovePlayer1(kb1, (kb1 += 4 * up + 4 * left), "bishop")
    validMovePlayer1(kn1, (kn1 += 2 * up + right), "knight")
    // now try to legally kingside castle
    validMovePlayer1(k1, (k1 += kingsidecastle), "king")
    validatePosition((kr1 += 2 * left), 1, "rook")

    // set up player 2 for kingside castle
    validMovePlayer2(kn2, (kn2 += 2 * down + left), "knight")
    validMovePlayer2(pe2, (pe2 += down), "pawn")
    validMovePlayer2(kb2, (kb2 += 2 * down - 2 * right), "bishop")
    validMovePlayer2(pg2, (pg2 += down), "pawn")

    // set up player 2 to cover kingside castle at f8
    validMovePlayer1(pd1, (pd1 += up), "pawn")
    validMovePlayer1(qb1, (qb1 += 5 * up + 5 * right), "bishop")

    // now try to illegally queenside castle covered by check by bishop
    invalidMovePlayer2(k2, k2 + queensidecastle, "king")
    validatePosition(qr2, 2, "rook")
    // move player 1 bishop to cover rook
    validMovePlayer1(qb1, (qb1 += up + left), "bishop")
    validMovePlayer1(qb1, (qb1 += down + left), "bishop")
    // now try to legally kingside castle while h8 is covered by bishop
    validMovePlayer2(k2, (k2 += kingsidecastle), "king")
    validatePosition((kr2 += 2 * left), 2, "rook")
  })

  it("Cannot kingside castle into check [INVERTED]", () => {
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

    // set up player 2 for kingside castle
    validMovePlayer2(pe2, (pe2 += 2 * down), "pawn")
    validMovePlayer2(kb2, (kb2 += 4 * down + 4 * left), "bishop")
    validMovePlayer2(kn2, (kn2 += 2 * down + right), "knight")
    // now try to legally kingside castle
    validMovePlayer2(k2, (k2 += kingsidecastle), "king")
    validatePosition((kr2 += 2 * left), 2, "rook")

    // set up player 1 for kingside castle
    validMovePlayer1(kn1, (kn1 += 2 * up + left), "knight")
    validMovePlayer1(pe1, (pe1 += up), "pawn")
    validMovePlayer1(kb1, (kb1 += 2 * up - 2 * right), "bishop")
    validMovePlayer1(pg1, (pg1 += up), "pawn")

    // set up player 1 to cover kingside castle at f1
    validMovePlayer2(pd2, (pd2 += down), "pawn")
    validMovePlayer2(qb2, (qb2 += 5 * down + 5 * right), "bishop")

    // now try to illegally queenside castle covered by check by bishop
    invalidMovePlayer1(k1, k1 + queensidecastle, "king")
    validatePosition(qr1, 1, "rook")
    // move player 2 bishop to cover rook
    validMovePlayer2(qb2, (qb2 += down + left), "bishop")
    validMovePlayer2(qb2, (qb2 += up + left), "bishop")
    // now try to legally kingside castle while h1 is covered by bishop
    validMovePlayer1(k1, (k1 += kingsidecastle), "king")
    validatePosition((kr1 += 2 * left), 1, "rook")
  })

  it("Cannot get out of check by king attacking into check", () => {
    cy.get("#ai-algo").select("2 Player Mode")
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
    // 1. e2-e4 e7-e6
    validMovePlayer1(pe1, (pe1 += 2 * up), "pawn")
    validMovePlayer2(pe2, (pe2 += down), "pawn")
    // 2. d2-d3 b7-b6
    validMovePlayer1(pd1, (pd1 += up), "pawn")
    validMovePlayer2(pb2, (pb2 += down), "pawn")
    // 3. Bc1-d2 b6-b5
    validMovePlayer1(qb1, (qb1 += up + right), "bishop")
    validMovePlayer2(pb2, (pb2 += down), "pawn")
    // 4. Qd1-g4 b5-b4
    validMovePlayer1(q1, (q1 += 3 * up + 3 * right), "queen")
    validMovePlayer2(pb2, (pb2 += down), "pawn")
    // 5. Bd2xb4 a7-a6
    validMovePlayer1(qb1, (qb1 += 2 * up + 2 * left), "bishop")
    validMovePlayer2(pa2, (pa2 += down), "pawn")
    // 6. Qg4-g5 a6-a5
    validMovePlayer1(q1, (q1 += up), "queen")
    validMovePlayer2(pa2, (pa2 += down), "pawn")
    // 7. Qg5-e7+ ... Queen 1 places check; Ke8xe7 ... Invalid Move
    validMovePlayer1(q1, (q1 += 2 * up + 2 * left), "queen")
    invalidMovePlayer2(k2, (k2 += down), "king")
    // King 2 is still in check from bishop at b4
    // 7. Qg5-e7+ Bf8xe7 ... Instead bishop takes queen
    validMovePlayer2(kb2, (kb2 += down + left), "bishop")
  })

  it("Cannot get out of check by king attacking into check [INVERTED]", () => {
    cy.get("#ai-algo").select("2 Player Mode")
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
    validMovePlayer1(ph1, (ph1 += up), "pawn")
    validMovePlayer2(pe2, (pe2 += 2 * down), "pawn")
    validMovePlayer1(pe1, (pe1 += up), "pawn")
    validMovePlayer2(pd2, (pd2 += down), "pawn")
    validMovePlayer1(pb1, (pb1 += up), "pawn")
    validMovePlayer2(qb2, (qb2 += down + right), "bishop")
    validMovePlayer1(pb1, (pb1 += up), "pawn")
    validMovePlayer2(q2, (q2 += 3 * down + 3 * right), "queen")
    validMovePlayer1(pb1, (pb1 += up), "pawn")
    validMovePlayer2(qb2, (qb2 += 2 * down + 2 * left), "bishop")
    validMovePlayer1(pa1, (pa1 += up), "pawn")
    validMovePlayer2(q2, (q2 += down), "queen")
    validMovePlayer1(pa1, (pa1 += up), "pawn")
    validMovePlayer2(q2, (q2 += 2 * down + 2 * left), "queen")
    invalidMovePlayer1(k1, (k1 += up), "king")
    validMovePlayer1(kb1, (kb1 += up + left), "bishop")
  })
})
