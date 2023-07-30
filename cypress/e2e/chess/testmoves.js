const chessmen = {
  qr2: 0,
  qn2: 1,
  qb2: 2,
  q2: 3,
  k2: 4,
  kb2: 5,
  kn2: 6,
  kr2: 7,
  pa2: 8,
  pb2: 9,
  pc2: 10,
  pd2: 11,
  pe2: 12,
  pf2: 13,
  pg2: 14,
  ph2: 15,
  pa1: 48,
  pb1: 49,
  pc1: 50,
  pd1: 51,
  pe1: 52,
  pf1: 53,
  pg1: 54,
  ph1: 55,
  qr1: 56,
  qn1: 57,
  qb1: 58,
  q1: 59,
  k1: 60,
  kb1: 61,
  kn1: 62,
  kr1: 63,
}

function hitRestartButton() {
  cy.get("#restart-button").click()
}

function validMovePlayer1(a, b, pName) {
  validMoveA2B(a, b, 1, pName)
}
function validMovePlayer2(a, b, pName) {
  validMoveA2B(a, b, 2, pName)
}
function invalidMovePlayer1(a, b, pName) {
  invalidMoveA2B(a, b, 1, pName)
}
function invalidMovePlayer2(a, b, pName) {
  invalidMoveA2B(a, b, 2, pName)
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
  // Check for pawn promotion
  if ((b < 8 || b > 55) && pName === "pawn")
    imgSelector = `alt="${playerStr[player]} queen"`
  // validate positions a and b
  cy.get(`div[tile_id="${a}"] div img[alt=""]`).should("be.visible")
  cy.get(`div[tile_id="${b}"] div img[${imgSelector}]`).should("be.visible")
}

function invalidMoveA2B(a, b, player, pName) {
  let dataTransfer = new DataTransfer()
  const playerStr = ["", "Your", "Computer's"]
  let imgSelector = `alt="${playerStr[player]} ${pName}"`
  // any pieces off the board should be invisible
  if (a < 0 || a > 63)
    cy.get(`div[tile_id="${a}"] div img[${imgSelector}]`).should(
      "not.be.visible"
    )
  // all pieces must be visible (no invisible pieces)
  cy.get(`div[tile_id="${a}"] div img[${imgSelector}]`).should("be.visible")
  cy.get(`div[tile_id="${a}"] div img[${imgSelector}]`).trigger("dragstart", {
    dataTransfer,
  })
  // piece stays at tile "a" on an invalid move
  cy.get(`div[tile_id="${b}"] div img`).trigger("drop", { dataTransfer })
  cy.get(`div[tile_id="${a}"] div img[${imgSelector}]`).should("be.visible")
}

function validatePosition(a, player, pName) {
  const playerStr = ["", "Your", "Computer's"]
  let imgSelector = `alt="${playerStr[player]} ${pName}"`
  if (a < 0 || a > 63) {
    console.log(`Code Error: validatePosition(${a}, ${position}, ${pName})`)
    return
  }
  cy.get(`div[tile_id="${a}"] div img[${imgSelector}]`).should("be.visible")
}

export {
  chessmen,
  hitRestartButton,
  validMovePlayer1,
  validMovePlayer2,
  invalidMovePlayer1,
  invalidMovePlayer2,
  validatePosition,
}
