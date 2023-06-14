const { test, expect } = require('@playwright/test');
const { HomePage } = require('../POM/home-page');
const { DashboardPage } = require('../POM/dashboard-page');
const { CartPage } = require('../POM/cart-page');
const { OrderPage } = require('../POM/order-page');

  test("verify that the checkout is not possible without the shipping information", async ({ page }) => {
    const homePage = new HomePage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    const orderPage = new OrderPage(page);
    
    await homePage.goto();
    await homePage.login("testeador@mail.com","Password1!");
    let flag = await dashboardPage.addItems(1);

    /**
     * Validte if addItem has a valid amount and go forward 
     * with the place order flow
     * 
     */
    if(flag){
      await dashboardPage.cartClick();
      await cartPage.checkoutItems();

      //Object with customer information
      let customerData={
        cvv:"",
        nameOnCard:"tes test",
        country: ""
      }

      /**
       * Submit order with missing information
       * Save the response in message
       */
      var message= await orderPage.submitOrder(customerData);

      //Validate response from submit order with missing information
      expect(message).toEqual("Please Enter Full Shipping Information");
    }

    
  });

