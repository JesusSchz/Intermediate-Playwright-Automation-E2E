const { test, expect } = require('@playwright/test');
const { HomePage } = require('../POM/home-page');
const { DashboardPage } = require('../POM/dashboard-page');
const { CartPage } = require('../POM/cart-page');
const { OrderPage } = require('../POM/order-page');
const fs = require('fs'); 

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
        cvv:"123",
        nameOnCard:"tes test",
        country: "Tunisia"
      }

      //submit order with all information
      var message= await orderPage.submitOrder(customerData);

      //validate response from submit order with missing information
      expect(message).toEqual("Order Placed Successfully");

      //download csv file
      let fileName= await orderPage.downloadFile();


      /** 
       * validate csv file is downloaded
       * existsSync(filePath) checks if a file exists in the filesystem using Node. 
       * In case the file is not present in the file path, it will return a false 
       * and the assertion will fail
       * 
       * FS(file system module)
       */
      expect(fs.existsSync(`./utils/downloads-files/${fileName}`)).toBeTruthy()
    }
  });

