describe('Image attacher', () => {
  before(() => {
    cy.resetDatabase();
    cy.createUser();
    cy.loginUser();
    cy.visit('http://localhost:4200/create-recipe');
  });

  beforeEach(() => {
    cy.loginUser();
  });

  it('should attach and remove an image and show loader while image is attaching', () => {
    cy.get('sfr-image-attach [type="file"]').attachFile('egg-muffin.jpg');
    cy.get('sfr-image-attach sfr-loader').should('exist');
    cy.get('sfr-image-attach img').should('exist');
    cy.get('sfr-image-attach button').eq(1).click();
    cy.get('sfr-image-attach img').should('not.exist');
  });
});
