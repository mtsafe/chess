import {
  chessmen,
  validMovePlayer1,
  validMovePlayer2,
  invalidMovePlayer1,
  invalidMovePlayer2,
  validatePosition,
} from "./testmoves"

function validPawnPromoteA2B(a, b, player) {
  let dataTransfer = new DataTransfer()
  let whoseStr = "Your"
  if (player === 2) whoseStr = "Computer's"
  cy.get(`div[tile_id="${a}"] div img[alt="${whoseStr} pawn"]`).should(
    "be.visible"
  )
  cy.get(`div[tile_id="${a}"] div img[alt="${whoseStr} pawn"]`).trigger(
    "dragstart",
    {
      dataTransfer,
    }
  )
  cy.get(`div[tile_id="${b}"] div img`).trigger("drop", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img[alt="${whoseStr} queen"]`).should(
    "be.visible"
  )
}

describe("Test player 1 pawns", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
    // Select Test Mode 1 = player moves any pieces
    cy.get("#ai-algo").select("Test Mode 1")
  })

  it("Moves each pawn double step", () => {
    for (let i = 0; i < 8; i++) validMovePlayer1(i + 48, i + 32, "pawn")
  })

  it("Moves each pawn: single steps, attacks, promotes, and invalid moves", () => {
    for (let i = 0; i < 8; i++) {
      for (let j = 48; j > 23; j -= 8) {
        validMovePlayer1(i + j, i + j - 8, "pawn")
      }
    }

    // Step off board left, right
    invalidMovePlayer1(16, 7, "pawn")
    invalidMovePlayer1(16, 15, "pawn")
    invalidMovePlayer1(16, 23, "pawn")
    invalidMovePlayer1(23, 24, "pawn")
    invalidMovePlayer1(23, 16, "pawn")
    invalidMovePlayer1(23, 32, "pawn")

    // Step forward & backward
    for (let i = 16; i < 24; i++) {
      invalidMovePlayer1(i, i - 8, "pawn")
      invalidMovePlayer1(i, i + 8, "pawn")
    }

    // attack left, right
    let attack
    for (let i = 16; i < 24; i++) {
      if (i % 2 === 0) attack = -7
      else attack = -9
      validMovePlayer1(i, i + attack, "pawn")
    }

    // Step forward
    for (let i = 8; i < 16; i++) {
      invalidMovePlayer1(i, i - 8, "pawn")
    }

    // attack left, right
    for (let i = 8; i < 16; i++) {
      if (i % 2 === 0) attack = -7
      else attack = -9
      validPawnPromoteA2B(i, i + attack, 1)
      cy.get(`div[tile_id="${i}"] div img[alt=""]`).should("be.visible")
    }
  })
})

describe("Test player 2 pawns", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
    // Select Test Mode 1 = player moves any pieces
    cy.get("#ai-algo").select("Test Mode 1")
  })

  it("Moves each pawn double step", () => {
    for (let i = 0; i < 8; i++) validMovePlayer2(i + 8, i + 24, "pawn")
  })

  it("Moves each pawn: single steps, attacks, promotes, and invalid moves", () => {
    for (let i = 0; i < 8; i++) {
      for (let j = 8; j < 40; j += 8) {
        validMovePlayer2(i + j, i + j + 8, "pawn")
      }
    }

    // Step off board left, right
    invalidMovePlayer2(40, 47, "pawn")
    invalidMovePlayer2(40, 39, "pawn")
    invalidMovePlayer2(40, 31, "pawn")
    invalidMovePlayer2(47, 40, "pawn")
    invalidMovePlayer2(47, 48, "pawn")
    invalidMovePlayer2(47, 56, "pawn")

    // Step forward & backward
    for (let i = 40; i < 48; i++) {
      invalidMovePlayer2(i, i + 8, "pawn")
      invalidMovePlayer2(i, i - 8, "pawn")
    }

    // attack left, right
    let attack
    for (let i = 40; i < 48; i++, "pawn") {
      if (i % 2 === 0) attack = 9
      else attack = 7
      validMovePlayer2(i, i + attack, "pawn")
    }

    // Step forward
    for (let i = 48; i < 56; i++) {
      invalidMovePlayer2(i, i + 8, "pawn")
    }

    // attack left, right
    for (let i = 48; i < 56; i++) {
      if (i % 2 === 0) attack = 9
      else attack = 7
      validPawnPromoteA2B(i, i + attack, 2)
      cy.get(`div[tile_id="${i}"] div img[alt=""]`).should("be.visible")
    }
  })
})
