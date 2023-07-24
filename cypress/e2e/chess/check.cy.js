function hitRestartButton() {
  cy.get("#restart-button").click()
}

function validMoveA2B(a, b, player, pName) {
  let dataTransfer = new DataTransfer()
  const playerStr = ["", "Your", "Computer's"]
  let imgSelector = `alt="${playerStr[player]} ${pName}"`
  cy.get(`div[tile_id="${a}"] div img[${imgSelector}]`).should("be.visible")
  cy.get(`div[tile_id="${a}"] div img[${imgSelector}]`).trigger("dragstart", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img`).trigger("drop", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img[${imgSelector}]`).should("be.visible")
}

function invalidMoveA2B(a, b, player, pName) {
  let dataTransfer = new DataTransfer()
  const playerStr = ["", "Your", "Computer's"]
  let imgSelector = `alt="${playerStr[player]} ${pName}"`
  if (a < 0 || a > 63) return
  cy.get(`div[tile_id="${a}"] div img[${imgSelector}]`).should("be.visible")
  cy.get(`div[tile_id="${a}"] div img[${imgSelector}]`).trigger("dragstart", {
    dataTransfer,
  })
  if (b >= 0 && b <= 63)
    cy.get(`div[tile_id="${b}"] div img`).trigger("drop", { dataTransfer })
  cy.get(`div[tile_id="${a}"] div img[${imgSelector}]`).should("be.visible")
}

function castleA2B(a, b) {
  let dataTransfer = new DataTransfer()
  cy.get(`div[tile_id="${a}"] div img[alt="Your king"]`).should("be.visible")
  cy.get(`div[tile_id="${a}"] div img[alt="Your king"]`).trigger("dragstart", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img`).trigger("drop", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img[alt="Your king"]`).should("be.visible")
  if (b === 58)
    cy.get(`div[tile_id="${59}"] div img[alt="Your rook"]`).should("be.visible")
  else
    cy.get(`div[tile_id="${61}"] div img[alt="Your rook"]`).should("be.visible")
}

function validPawnMoveA2B(a, b) {
  let dataTransfer = new DataTransfer()
  cy.get(`div[tile_id="${a}"] div img[alt="Your pawn"]`).trigger("dragstart", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img`).trigger("drop", {
    dataTransfer,
  })
}

describe("Test check", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
  })

  it("Cannot move king into check", () => {
    let p = 52,
      k = 60,
      q = 59
    // move kings near pawns
    validPawnMoveA2B(p, (p -= 16))
    validMoveA2B(k, (k -= 8), 1, "king")
    validMoveA2B(k, (k -= 8), 1, "king")
    validMoveA2B(k, (k += 1), 1, "king")
    validMoveA2B(k, (k += 1), 1, "king")
    validMoveA2B(k, (k -= 8), 1, "king")
    validMoveA2B(k, (k -= 8), 1, "king")
    // now try to illegally step into check by pawns
    invalidMoveA2B(k, k - 8, 1, "king")
    // use queen to kill pawn d7
    validMoveA2B(q, (q -= 7), 1, "queen")
    validMoveA2B(q, (q -= 9), 1, "queen")
    validMoveA2B(q, (q -= 32), 1, "queen")
    validMoveA2B(q, (q += 7), 1, "queen")
    // now try to illegally step into check by bishop
    invalidMoveA2B(k, k - 1, 1, "king")
    // use queen to kill pawn e7
    validMoveA2B(k, (k += 7), 1, "king")
    validMoveA2B(q, (q += 2), 1, "queen")
    validMoveA2B(q, (q -= 8), 1, "queen")
    validMoveA2B(q, (q += 14), 1, "queen")
    // now try to illegally step into check by queen
    invalidMoveA2B(k, k - 7, 1, "king")
    // move king to other side
    validMoveA2B(k, (k += 7), 1, "king")
    validPawnMoveA2B((p = 51), 1, (p -= 16))
    validMoveA2B(q, (q -= 7), 1, "queen")
    validMoveA2B(k, (k -= 1), 1, "king")
    validMoveA2B(k, (k -= 9), 1, "king")
    validMoveA2B(k, (k -= 9), 1, "king")
    // use queen to kill pawn b7
    validMoveA2B(q, (q += 7), 1, "queen")
    validMoveA2B(q, (q -= 9), 1, "queen")
    validMoveA2B(q, (q -= 8), 1, "queen")
    // now try to illegally step into check by knight
    invalidMoveA2B(k, k - 9, 1, "king")
    invalidMoveA2B(k, k - 7, 1, "king")
    // use queen to kill pawn a7
    validMoveA2B(q, (q -= 1), 1, "queen")
    validMoveA2B(q, (q += 1), 1, "queen")
    // now try to illegally step into check by rook
    invalidMoveA2B(k, k - 1, 1, "king")
    // set up player 2 queenside castle
    let qr2 = 0,
      qn2 = 1,
      qb2 = 2,
      q2 = 3,
      k2 = 4,
      kb2 = 5,
      kn2 = 6,
      kr2 = 7
    validMoveA2B(qn2, (qn2 += 15), 2, "knight")
    validMoveA2B(qb2, (qb2 += 45), 2, "bishop")
    validMoveA2B(q2, (q2 += 16), 2, "queen")
    // now try to illegally queenside castle covered by check by queen
    invalidMoveA2B(k2, k2 - 2, 2, "king")
    // back up player 1 queen
    validMoveA2B(q, (q += 8), 1, "queen")
    // now try to legally queenside castle while b8 is covered by check by queen
    validMoveA2B(k2, (k2 -= 2), 2, "king")
  })

  it("Cannot kingside castle into check", () => {
    let pd1 = 51,
      pe1 = 52,
      qb1 = 58,
      q1 = 59,
      k1 = 60,
      kb1 = 61,
      kn1 = 62
    let qr2 = 0,
      qn2 = 1,
      qb2 = 2,
      q2 = 3,
      k2 = 4,
      kb2 = 5,
      kn2 = 6,
      kr2 = 7,
      pe2 = 12,
      pf2 = 13,
      pg2 = 14,
      ph2 = 15

    // set up player 1 for kingside castle
    validMoveA2B(pe1, (pe1 -= 16), 1, "pawn")
    validMoveA2B(kb1, (kb1 -= 36), 1, "bishop")
    validMoveA2B(kn1, (kn1 -= 15), 1, "knight")
    // now try to legally kingside castle
    validMoveA2B(k1, (k1 += 2), 1, "king")

    // set up player 2 for kingside castle
    validMoveA2B(kn2, (kn2 += 15), 2, "knight")
    validMoveA2B(pe2, (pe2 += 8), 2, "pawn")
    validMoveA2B(kb2, (kb2 += 14), 2, "bishop")
    validMoveA2B(pg2, (pg2 += 8), 2, "pawn")

    // set up player 2 to cover kingside castle at f8
    validMoveA2B(pd1, (pd1 -= 8), 1, "pawn")
    validMoveA2B(qb1, (qb1 -= 35), 1, "bishop")

    // now try to illegally queenside castle covered by check by bishop
    invalidMoveA2B(k2, k2 + 2, 2, "king")
    // move player 1 bishop to cover rook
    validMoveA2B(qb1, (qb1 -= 9), 1, "bishop")
    validMoveA2B(qb1, (qb1 += 7), 1, "bishop")
    // now try to legally kingside castle while h8 is covered by bishop
    validMoveA2B(k2, (k2 += 2), 2, "king")
  })
})
