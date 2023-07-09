function hitRestartButton() {
  cy.get("#restart-button").click()
}
function validMovePawnA2B(a, b) {
  let dataTransfer = new DataTransfer()
  cy.get(`div[tile_id="${a}"] div img[alt="Your pawn"]`).should("be.visible")
  cy.get(`div[tile_id="${a}"] div img[alt="Your pawn"]`).trigger("dragstart", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img`).trigger("drop", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img[alt="Your pawn"]`).should("be.visible")
}

function invalidMovePawnA2B(a, b) {
  let dataTransfer = new DataTransfer()
  cy.get(`div[tile_id="${a}"] div img[alt="Your pawn"]`).should("be.visible")
  cy.get(`div[tile_id="${a}"] div img[alt="Your pawn"]`).trigger("dragstart", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img`).trigger("drop", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${a}"] div img[alt="Your pawn"]`).should("be.visible")
}

function validPromotePawnA2B(a, b) {
  let dataTransfer = new DataTransfer()
  cy.get(`div[tile_id="${a}"] div img[alt="Your pawn"]`).should("be.visible")
  cy.get(`div[tile_id="${a}"] div img[alt="Your pawn"]`).trigger("dragstart", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img`).trigger("drop", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img[alt="Your queen"]`).should("be.visible")
}

describe("Test pawns", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
  })

  it("Moves each pawn double step", () => {
    for (let i = 0; i < 8; i++) validMovePawnA2B(i + 48, i + 32)
  })

  it("Moves each pawn 4 single steps, tries invalid moves, attacks, and promotes", () => {
    for (let i = 0; i < 8; i++) {
      for (let j = 48; j > 23; j -= 8) {
        validMovePawnA2B(i + j, i + j - 8)
      }
    }

    // Step off board left, right
    invalidMovePawnA2B(16, 7)
    invalidMovePawnA2B(16, 15)
    invalidMovePawnA2B(16, 23)
    invalidMovePawnA2B(23, 24)
    invalidMovePawnA2B(23, 16)
    invalidMovePawnA2B(23, 32)

    // Step forward & backward
    for (let i = 16; i < 24; i++) {
      invalidMovePawnA2B(i, i - 8)
      invalidMovePawnA2B(i, i + 8)
    }

    // attack left, right
    let attack
    for (let i = 16; i < 24; i++) {
      if (i % 2 === 0) attack = -7
      else attack = -9
      validMovePawnA2B(i, i + attack)
    }

    // Step forward
    for (let i = 8; i < 16; i++) {
      invalidMovePawnA2B(i, i - 8)
    }

    // attack left, right
    for (let i = 8; i < 16; i++) {
      if (i % 2 === 0) attack = -7
      else attack = -9
      validPromotePawnA2B(i, i + attack)
    }
  })
})
