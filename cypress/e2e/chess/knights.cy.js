function hitRestartButton() {
  cy.get("#restart-button").click()
}

function validMoveKnightA2B(a, b) {
  let dataTransfer = new DataTransfer()
  cy.get(`div[tile_id="${a}"] div img[alt="Your knight"]`).should("be.visible")
  cy.get(`div[tile_id="${a}"] div img[alt="Your knight"]`).trigger(
    "dragstart",
    {
      dataTransfer,
    }
  )
  cy.get(`div[tile_id="${b}"] div img`).trigger("drop", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img[alt="Your knight"]`).should("be.visible")
}

function invalidMoveKnightA2B(a, b) {
  let dataTransfer = new DataTransfer()
  if (a < 0 || a > 63) return
  cy.get(`div[tile_id="${a}"] div img[alt="Your knight"]`).should("be.visible")
  cy.get(`div[tile_id="${a}"] div img[alt="Your knight"]`).trigger(
    "dragstart",
    {
      dataTransfer,
    }
  )
  if (b >= 0 && b <= 63)
    cy.get(`div[tile_id="${b}"] div img`).trigger("drop", { dataTransfer })
  cy.get(`div[tile_id="${a}"] div img[alt="Your knight"]`).should("be.visible")
}

describe("Test knights", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
  })

  it("Move each knight: move around, attacks, and invalid moves", () => {
    let jump,
      forward = -8,
      backward = 8,
      left = -1,
      right = 1,
      k1 = 57,
      k2 = 62
    // move knights every way
    jump = forward * 2 + left * 1
    validMoveKnightA2B(k1, (k1 += jump))
    validMoveKnightA2B(k2, (k2 += jump))
    jump = forward * 1 + right * 2
    validMoveKnightA2B(k1, (k1 += jump))
    validMoveKnightA2B(k2, (k2 += jump))
    jump = backward * 1 + left * 2
    validMoveKnightA2B(k1, (k1 += jump))
    validMoveKnightA2B(k2, (k2 += jump))
    jump = backward * 2 + right * 1
    validMoveKnightA2B(k1, (k1 += jump))
    validMoveKnightA2B(k2, (k2 += jump))
    jump = forward * 2 + right * 1
    validMoveKnightA2B(k1, (k1 += jump))
    validMoveKnightA2B(k2, (k2 += jump))
    jump = forward * 1 + left * 2
    validMoveKnightA2B(k1, (k1 += jump))
    validMoveKnightA2B(k2, (k2 += jump))
    jump = backward * 1 + right * 2
    validMoveKnightA2B(k1, (k1 += jump))
    validMoveKnightA2B(k2, (k2 += jump))
    jump = backward * 2 + left * 1
    validMoveKnightA2B(k1, (k1 += jump))
    validMoveKnightA2B(k2, (k2 += jump))

    // move knights onto same team pieces and off board
    jump = forward * 1 + left * 2
    invalidMoveKnightA2B(k1, k1 + jump)
    invalidMoveKnightA2B(k2, k2 + jump)
    jump = forward * 1 + right * 2
    invalidMoveKnightA2B(k1, k1 + jump)
    invalidMoveKnightA2B(k2, k2 + jump)

    // move knights to capture
    jump = forward * 2 + left * 1
    validMoveKnightA2B(k1, (k1 += jump))
    validMoveKnightA2B(k2, (k2 += jump))
    jump = forward * 2 + right * 1
    validMoveKnightA2B(k1, (k1 += jump))
    validMoveKnightA2B(k2, (k2 += jump))
    jump = forward * 2 + left * 1
    validMoveKnightA2B(k1, (k1 += jump))
    validMoveKnightA2B(k2, (k2 += jump))
  })
})
