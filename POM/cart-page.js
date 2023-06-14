// playwright-dev-page.js
const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    //get "Checkout" button
    this.getCheckoutButton = page.locator('button', { hasText: 'Checkout' });

  }

  //Click on "Checkout" button
  async checkoutItems() {
    await this.getCheckoutButton.click()
  }

}