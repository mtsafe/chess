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
  cy.get(`div[tile_id="${b}"] div img[${imgSelector}]`).should("be.visible")
}

function invalidMoveA2B(a, b, player, pName) {
  let dataTransfer = new DataTransfer()
  const playerStr = ["", "Your", "Computer's"]
  let imgSelector = `alt="${playerStr[player]} ${pName}"`
  if (a < 0 || a > 63) return
  cy.get(`div[tile_id="${a}"] div img[${imgSelector}]`).should("be.visible")
  cy.get(`div[tile_id="${a}"] div img[${imgSelector}]`).trigger("dragstart", {
    dataTransfer,
  })
  if (b >= 0 && b <= 63)
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

describe("Test check", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
  })

  it("Cannot drag and drop transparent img", () => {
    // Needs test code
    let dataTransfer = new DataTransfer()
    let a = 20,
      b = a - 8
    cy.get(`div[tile_id="${a}"] div img[alt = ""]`).should("be.visible")
    cy.get(`div[tile_id="${b}"] div img[alt = "Computer's pawn"]`).should(
      "be.visible"
    )
    cy.get(`div[tile_id="${a}"] div img[alt = ""]`).trigger("dragstart", {
      dataTransfer,
    })
    cy.get(`div[tile_id="${b}"] div img`).trigger("drop", { dataTransfer })
    cy.get(`div[tile_id="${a}"] div img[alt = ""]`).should("be.visible")
    cy.get(`div[tile_id="${b}"] div img[alt = "Computer's pawn"]`).should(
      "be.visible"
    )
  })
})
