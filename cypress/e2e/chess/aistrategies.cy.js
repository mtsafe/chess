function hitRestartButton() {
  cy.get("#restart-button").click()
}

function validMoveA2B(a, b, player, pName) {
  let dataTransfer = new DataTransfer()
  const playerStr = ["", "Your", "Computer's"]
  cy.get(
    `div[tile_id="${a}"] div img[alt="${playerStr[player]} ${pName}"]`
  ).should("be.visible")
  cy.get(
    `div[tile_id="${a}"] div img[alt="${playerStr[player]} ${pName}"]`
  ).trigger("dragstart", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img`).trigger("drop", {
    dataTransfer,
  })
  cy.get(
    `div[tile_id="${b}"] div img[alt="${playerStr[player]} ${pName}"]`
  ).should("be.visible")
}

describe("Test AIStrategies", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
  })

  it("Tests AI Algos", () => {
    let a = 48
    cy.get("#ai-algo").should("be.visible")
    // Select Test Mode 1 = player moves any pieces
    cy.get("#ai-algo").select("Test Mode 1")
    cy.get("#ai-algo").should("have.value", "0")
    // Move player 1 pieces
    validMoveA2B(48, 48 - 8, 1, "pawn")
    validMoveA2B(40, 40 - 8, 1, "pawn")
    validMoveA2B(49, 49 - 16, 1, "pawn")
    validMoveA2B(50, 50 - 16, 1, "pawn")
    validMoveA2B(51, 51 - 16, 1, "pawn")
    validMoveA2B(52, 52 - 16, 1, "pawn")
    validMoveA2B(53, 53 - 16, 1, "pawn")
    validMoveA2B(54, 54 - 16, 1, "pawn")
    validMoveA2B(55, 55 - 16, 1, "pawn")
    validMoveA2B(56, 56 - 8, 1, "rook")
    validMoveA2B(57, 57 - 17, 1, "knight")
    validMoveA2B(58, 58 - 9, 1, "bishop")
    validMoveA2B(59, 59 - 9, 1, "queen")
    validMoveA2B(61, 61 - 14, 1, "bishop")
    validMoveA2B(62, 62 - 17, 1, "knight")
    validMoveA2B(60, 60 + 2, 1, "king")
    // Move player 2 pieces
    validMoveA2B(8, 8 + 8, 2, "pawn")
    validMoveA2B(16, 16 + 8, 2, "pawn")
    validMoveA2B(9, 9 + 16, 2, "pawn")
    validMoveA2B(10, 10 + 16, 2, "pawn")
    validMoveA2B(11, 11 + 16, 2, "pawn")
    validMoveA2B(12, 12 + 16, 2, "pawn")
    validMoveA2B(13, 13 + 16, 2, "pawn")
    validMoveA2B(14, 14 + 16, 2, "pawn")
    validMoveA2B(15, 15 + 16, 2, "pawn")
    validMoveA2B(0, 0 + 8, 2, "rook")
    validMoveA2B(1, 1 + 17, 2, "knight")
    validMoveA2B(2, 2 + 9, 2, "bishop")
    validMoveA2B(3, 3 + 9, 2, "queen")
    validMoveA2B(5, 5 + 9, 2, "bishop")
    validMoveA2B(6, 6 + 17, 2, "knight")
    validMoveA2B(4, 4 + 2, 2, "king")

    // Select Test Mode 2 = player takes turns
    cy.get("#ai-algo").select("Test Mode 2")
    cy.get("#ai-algo").should("have.value", "1")
  })
})
