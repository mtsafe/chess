Cypress.Commands.add("isWithinViewport", { prevSubject: true }, subject => {
  const rect = subject[0].getBoundingClientRect()

  expect(rect.top).to.be.within(0, window.innerHeight)
  expect(rect.right).to.be.within(0, window.innerWidth)
  expect(rect.bottom).to.be.within(0, window.innerHeight)
  expect(rect.left).to.be.within(0, window.innerWidth)

  return subject
})

Cypress.Commands.add("isOutsideViewport", { prevSubject: true }, subject => {
  const rect = subject[0].getBoundingClientRect()

  expect(rect.top).not.to.be.within(0, window.innerHeight)
  expect(rect.right).not.to.be.within(0, window.innerWidth)
  expect(rect.bottom).not.to.be.within(0, window.innerHeight)
  expect(rect.left).not.to.be.within(0, window.innerWidth)

  return subject
})

// Use assertion as:
// cy.isWithinViewport(subject)
// cy.isOutsideViewport(subject)
// Viewport is current 1000 x 1000 in cypress.config.js
