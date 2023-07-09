describe("site is up", () => {
  it("should visit", () => {
    cy.visit("http://127.0.0.1:5173/")
  })
})
