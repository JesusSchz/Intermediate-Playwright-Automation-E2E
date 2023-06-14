const { test, expect } = require('@playwright/test');
const { HomePage } = require('../POM/home-page');

  test("Verify Registration is working properly", async ({ page }) => {
    //HomePage initialization 
    const homePage = new HomePage(page);
    
    //Customers Data saved on readJson
    var readJson= homePage.readUserJSON();

    //loop customer data to be register 
    for(let i=0;i<readJson.length;i++){
      //go to home page
      await homePage.goto();

      //save response from readUserJSON method
      var message=await homePage.userRegister(readJson[i]);

      //Vlidate response accoring with Customer age
      if(readJson[i].isEighteenOrOlder === "true"){
        expect(message).toEqual("Account Created Successfully");
      }else{
        expect(message).toEqual("*Please check above checkbox");
      }
    }
  });