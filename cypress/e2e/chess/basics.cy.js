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

  it("Action CAPTURE object works properly", () => {
    // Needs test code
  })

  it("Action EN_PASSANT object works properly", () => {
    // Needs test code
  })

  it("Action MOVE object works properly", () => {
    // Needs test code
  })

  it("Action CAPTURE_PROMOTE object works properly", () => {
    // Needs test code
  })

  it("Action MOVE_PROMOTE object works properly", () => {
    // Needs test code
  })

  it("Action KINGSIDE_CASTLE object works properly", () => {
    // Needs test code
  })

  it("Action QUEENSIDE_CASTLE object works properly", () => {
    // Needs test code
  })
})
