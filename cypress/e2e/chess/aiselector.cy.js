describe("Test AISelector", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/")
  })

  it("Selects AI Algos", () => {
    let a = 48
    cy.get("#ai-algo").should("be.visible")
    cy.get("#ai-algo").select("Test Mode")
    cy.get("#ai-algo").should("have.value", "0")
    cy.get("#ai-algo").select("2 Player Mode")
    cy.get("#ai-algo").should("have.value", "1")
    // Select Test Mode = player moves any pieces
    // Select 2 Player Mode = player takes turns
  })
})
