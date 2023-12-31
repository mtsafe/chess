import {
  chessmen,
  validMovePlayer1,
  validMovePlayer2,
  invalidMovePlayer1,
  invalidMovePlayer2,
  validatePosition,
} from "./testmoves"

describe("Test player 1 pawns", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
    // Select Test Mode = player moves any pieces
    cy.get("#ai-algo").select("Test Mode")
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

    // attack left, right and promote
    for (let i = 8; i < 16; i++) {
      if (i % 2 === 0) attack = -7
      else attack = -9
      validMovePlayer1(i, i + attack, "pawn")
    }
  })

  it("Moves each pawn single steps and en passants", () => {
    let i, j
    for (i = 6; i >= 0; i--) {
      for (j = 48; j > 24; j -= 8) validMovePlayer1(i + j, i + j - 8, "pawn")
      validMovePlayer2(i + 8 + 1, i + 8 + 17, "pawn")
      validMovePlayer1(i + j, i + j - 7, "pawn")
    }
  })
})

describe("Test player 2 pawns", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
    // Select Test Mode = player moves any pieces
    cy.get("#ai-algo").select("Test Mode")
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

    // attack left, right and promote
    for (let i = 48; i < 56; i++) {
      if (i % 2 === 0) attack = 9
      else attack = 7
      validMovePlayer2(i, i + attack, "pawn")
    }
  })

  it("Moves each pawn single steps and en passants", () => {
    let i, j
    for (i = 6; i >= 0; i--) {
      for (j = 8; j < 32; j += 8) validMovePlayer2(i + j, i + j + 8, "pawn")
      validMovePlayer1(i + 48 + 1, i + 48 - 15, "pawn")
      validMovePlayer2(i + j, i + j + 9, "pawn")
    }
  })
})
