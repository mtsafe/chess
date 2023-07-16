function hitRestartButton() {
  cy.get("#restart-button").click()
}

function validMoveA2B(a, b, pName) {
  let dataTransfer = new DataTransfer()
  cy.get(`div[tile_id="${a}"] div img[alt="Your ${pName}"]`).should(
    "be.visible"
  )
  cy.get(`div[tile_id="${a}"] div img[alt="Your ${pName}"]`).trigger(
    "dragstart",
    {
      dataTransfer,
    }
  )
  cy.get(`div[tile_id="${b}"] div img`).trigger("drop", {
    dataTransfer,
  })
  cy.get(`div[tile_id="${b}"] div img[alt="Your ${pName}"]`).should(
    "be.visible"
  )
}

function invalidMoveA2B(a, b, pName) {
  let dataTransfer = new DataTransfer()
  if (a < 0 || a > 63) return
  cy.get(`div[tile_id="${a}"] div img[alt="Your ${pName}"]`).should(
    "be.visible"
  )
  cy.get(`div[tile_id="${a}"] div img[alt="Your ${pName}"]`).trigger(
    "dragstart",
    {
      dataTransfer,
    }
  )
  if (b >= 0 && b <= 63)
    cy.get(`div[tile_id="${b}"] div img`).trigger("drop", { dataTransfer })
  cy.get(`div[tile_id="${a}"] div img[alt="Your ${pName}"]`).should(
    "be.visible"
  )
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

describe("Test check", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
  })

  it("Cannot move king into check", () => {
    let p = 52,
      k = 60,
      q = 59
    // move kings near pawns
    validPawnMoveA2B(p, (p -= 16))
    validMoveA2B(k, (k -= 8), "king")
    validMoveA2B(k, (k -= 8), "king")
    validMoveA2B(k, (k += 1), "king")
    validMoveA2B(k, (k += 1), "king")
    validMoveA2B(k, (k -= 8), "king")
    validMoveA2B(k, (k -= 8), "king")
    // now try to illegally step into check by pawns
    invalidMoveA2B(k, k - 8, "king")
    // use queen to kill pawn d7
    validMoveA2B(q, (q -= 7), "queen")
    validMoveA2B(q, (q -= 9), "queen")
    validMoveA2B(q, (q -= 32), "queen")
    validMoveA2B(q, (q += 7), "queen")
    // now try to illegally step into check by bishop
    invalidMoveA2B(k, k - 1, "king")
    // use queen to kill pawn e7
    validMoveA2B(k, (k += 7), "king")
    validMoveA2B(q, (q += 2), "queen")
    validMoveA2B(q, (q -= 8), "queen")
    validMoveA2B(q, (q += 14), "queen")
    // now try to illegally step into check by queen
    invalidMoveA2B(k, k - 7, "king")
    // move king to other side
    validMoveA2B(k, (k += 7), "king")
    validPawnMoveA2B((p = 51), (p -= 16))
    validMoveA2B(k, (k -= 1), "king")
    validMoveA2B(k, (k -= 9), "king")
    validMoveA2B(k, (k -= 9), "king")
    // use queen to kill pawn b7
    validMoveA2B(q, (q -= 9), "queen")
    validMoveA2B(q, (q -= 8), "queen")
    // now try to illegally step into check by knight
    invalidMoveA2B(k, k - 9, "king")
    invalidMoveA2B(k, k - 7, "king")
    // use queen to kill pawn a7
    validMoveA2B(q, (q -= 1), "queen")
    validMoveA2B(q, (q += 1), "queen")
    invalidMoveA2B(k, k - 1, "king")
    // now try to illegally step into check by rook
  })
})
