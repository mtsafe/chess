function hitRestartButton() {
  cy.get("#restart-button").click()
}

function validMoveKingA2B(a, b) {
  let dataTransfer = new DataTransfer()
  cy.get(`div[tile_id="${a}"] div img[alt="Your king"]`).should("be.visible")
  cy.get(`div[tile_id="${a}"] div img[alt="Your king"]`).trigger("dragstart", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img`).trigger("drop", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img[alt="Your king"]`).should("be.visible")
}

function invalidMoveKingA2B(a, b) {
  let dataTransfer = new DataTransfer()
  if (a < 0 || a > 63) return
  cy.get(`div[tile_id="${a}"] div img[alt="Your king"]`).should("be.visible")
  cy.get(`div[tile_id="${a}"] div img[alt="Your king"]`).trigger("dragstart", {
    dataTransfer,
  })
  if (b >= 0 && b <= 63)
    cy.get(`div[tile_id="${b}"] div img`).trigger("drop", { dataTransfer })
  cy.get(`div[tile_id="${a}"] div img[alt="Your king"]`).should("be.visible")
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

describe("Test king", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
  })

  it("Moves king: steps, attacks, and invalid moves", () => {
    let p = 52,
      k = 60
    validPawnMoveA2B(p, (p -= 16))
    validMoveKingA2B(k, (k -= 8))
    validMoveKingA2B(k, (k -= 8))
    validMoveKingA2B(k, (k -= 1))
    validMoveKingA2B(k, (k -= 1))
    validMoveKingA2B(k, (k -= 8))
    // now cha-cha
    validMoveKingA2B(k, (k -= 9))
    validMoveKingA2B(k, (k += 9))
    validMoveKingA2B(k, (k -= 8))
    validMoveKingA2B(k, (k += 8))
    validMoveKingA2B(k, (k -= 7))
    validMoveKingA2B(k, (k += 7))
    validMoveKingA2B(k, (k -= 1))
    validMoveKingA2B(k, (k += 1))
    //Now do invalid move
    validMoveKingA2B(k, (k += 1))
    invalidMoveKingA2B(k, k + 1)
    // now kill the queen
    validMoveKingA2B(k, (k -= 9))
    validMoveKingA2B(k, (k -= 8))
    validMoveKingA2B(k, (k -= 8))
    validMoveKingA2B(k, (k -= 7))
  })

  // it("Moves each pawn: single steps, attacks, promotes, and invalid moves", () => {
  //   for (let i = 0; i < 8; i++) {
  //     for (let j = 48; j > 23; j -= 8) {
  //       validPawnMoveA2B(i + j, i + j - 8)
  //     }
  //   }

  //   // Step off board left, right
  //   invalidPawnMoveA2B(16, 7)
  //   invalidPawnMoveA2B(16, 15)
  //   invalidPawnMoveA2B(16, 23)
  //   invalidPawnMoveA2B(23, 24)
  //   invalidPawnMoveA2B(23, 16)
  //   invalidPawnMoveA2B(23, 32)

  //   // Step forward & backward
  //   for (let i = 16; i < 24; i++) {
  //     invalidPawnMoveA2B(i, i - 8)
  //     invalidPawnMoveA2B(i, i + 8)
  //   }

  //   // attack left, right
  //   let attack
  //   for (let i = 16; i < 24; i++) {
  //     if (i % 2 === 0) attack = -7
  //     else attack = -9
  //     validPawnMoveA2B(i, i + attack)
  //   }

  //   // Step forward
  //   for (let i = 8; i < 16; i++) {
  //     invalidPawnMoveA2B(i, i - 8)
  //   }

  //   // attack left, right
  //   for (let i = 8; i < 16; i++) {
  //     if (i % 2 === 0) attack = -7
  //     else attack = -9
  //     validPawnPromoteA2B(i, i + attack)
  //   }
  // })
})
