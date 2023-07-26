import {
  chessmen,
  validMovePlayer1,
  validMovePlayer2,
  invalidMovePlayer1,
  invalidMovePlayer2,
  validatePosition,
} from "./testmoves"

function validMoveKingA2B(a, b) {
  validMovePlayer1(a, b, "king")
}

function invalidMoveKingA2B(a, b) {
  invalidMovePlayer1(a, b, "king")
}

function validPawnMoveA2B(a, b) {
  validMovePlayer1(a, b, "pawn")
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
    // now do invalid move
    validMoveKingA2B(k, (k += 1))
    invalidMoveKingA2B(k, k + 1)
    // now try to illegally step into check
    validMoveKingA2B(k, (k -= 9))
    invalidMoveKingA2B(k, (k -= 8))
  })
})
