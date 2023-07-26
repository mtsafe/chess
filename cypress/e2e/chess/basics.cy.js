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
