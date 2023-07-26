import {
  chessmen,
  validMovePlayer1,
  validMovePlayer2,
  invalidMovePlayer1,
  invalidMovePlayer2,
  validatePosition,
} from "./testmoves"

function validPawnMoveA2B(a, b) {
  validMovePlayer1(a, b, "pawn")
}

function invalidPawnMoveA2B(a, b) {
  invalidMovePlayer1(a, b, "pawn")
}

function validPawnPromoteA2B(a, b) {
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
    for (let i = 0; i < 8; i++) validPawnMoveA2B(i + 48, i + 32)
  })

  it("Moves each pawn: single steps, attacks, promotes, and invalid moves", () => {
    for (let i = 0; i < 8; i++) {
      for (let j = 48; j > 23; j -= 8) {
        validPawnMoveA2B(i + j, i + j - 8)
      }
    }

    // Step off board left, right
    invalidPawnMoveA2B(16, 7)
    invalidPawnMoveA2B(16, 15)
    invalidPawnMoveA2B(16, 23)
    invalidPawnMoveA2B(23, 24)
    invalidPawnMoveA2B(23, 16)
    invalidPawnMoveA2B(23, 32)

    // Step forward & backward
    for (let i = 16; i < 24; i++) {
      invalidPawnMoveA2B(i, i - 8)
      invalidPawnMoveA2B(i, i + 8)
    }

    // attack left, right
    let attack
    for (let i = 16; i < 24; i++) {
      if (i % 2 === 0) attack = -7
      else attack = -9
      validPawnMoveA2B(i, i + attack)
    }

    // Step forward
    for (let i = 8; i < 16; i++) {
      invalidPawnMoveA2B(i, i - 8)
    }

    // attack left, right
    for (let i = 8; i < 16; i++) {
      if (i % 2 === 0) attack = -7
      else attack = -9
      validPawnPromoteA2B(i, i + attack)
      cy.get(`div[tile_id="${i}"] div img[alt=""]`).should("be.visible")
    }
  })
})
