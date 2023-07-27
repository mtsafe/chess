import {
  chessmen,
  validMovePlayer1,
  validMovePlayer2,
  invalidMovePlayer1,
  invalidMovePlayer2,
  validatePosition,
} from "./testmoves"

function validMoveKnightA2B(a, b) {
  validMovePlayer1(a, b, "knight")
}

function invalidMoveKnightA2B(a, b) {
  invalidMovePlayer1(a, b, "knight")
}

describe("Test knights", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
    // Select Test Mode 1 = player moves any pieces
    cy.get("#ai-algo").select("Test Mode 1")
  })

  it("Move each knight: move around, attacks, and invalid moves", () => {
    let jump,
      forward = -8,
      backward = 8,
      left = -1,
      right = 1
    let { qn1, kn1 } = chessmen
    // move knights every way
    jump = forward * 2 + left * 1
    validMoveKnightA2B(qn1, (qn1 += jump))
    validMoveKnightA2B(kn1, (kn1 += jump))
    jump = forward * 1 + right * 2
    validMoveKnightA2B(qn1, (qn1 += jump))
    validMoveKnightA2B(kn1, (kn1 += jump))
    jump = backward * 1 + left * 2
    validMoveKnightA2B(qn1, (qn1 += jump))
    validMoveKnightA2B(kn1, (kn1 += jump))
    jump = backward * 2 + right * 1
    validMoveKnightA2B(qn1, (qn1 += jump))
    validMoveKnightA2B(kn1, (kn1 += jump))
    jump = forward * 2 + right * 1
    validMoveKnightA2B(qn1, (qn1 += jump))
    validMoveKnightA2B(kn1, (kn1 += jump))
    jump = forward * 1 + left * 2
    validMoveKnightA2B(qn1, (qn1 += jump))
    validMoveKnightA2B(kn1, (kn1 += jump))
    jump = backward * 1 + right * 2
    validMoveKnightA2B(qn1, (qn1 += jump))
    validMoveKnightA2B(kn1, (kn1 += jump))
    jump = backward * 2 + left * 1
    validMoveKnightA2B(qn1, (qn1 += jump))
    validMoveKnightA2B(kn1, (kn1 += jump))

    // move knights onto same team pieces and off board
    jump = forward * 1 + left * 2
    invalidMoveKnightA2B(qn1, qn1 + jump)
    invalidMoveKnightA2B(kn1, kn1 + jump)
    jump = forward * 1 + right * 2
    invalidMoveKnightA2B(qn1, qn1 + jump)
    invalidMoveKnightA2B(kn1, kn1 + jump)

    // move knights to capture
    jump = forward * 2 + left * 1
    validMoveKnightA2B(qn1, (qn1 += jump))
    validMoveKnightA2B(kn1, (kn1 += jump))
    jump = forward * 2 + right * 1
    validMoveKnightA2B(qn1, (qn1 += jump))
    validMoveKnightA2B(kn1, (kn1 += jump))
    jump = forward * 2 + left * 1
    validMoveKnightA2B(qn1, (qn1 += jump))
    validMoveKnightA2B(kn1, (kn1 += jump))
  })
})
