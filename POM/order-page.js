// playwright-dev-page.js
const { expect } = require('@playwright/test');

exports.OrderPage = class OrderPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    //get checkout button
    this.getOrderButton = page.locator("//a[contains(text(),'Place Order ')]"); 

    //error message
    this.getShippingError = page.locator("//div[contains(text(),' Please Enter Full Shipping Information ')]");

    //thanks message
    this.getThanksMessage= page.locator("//div[contains(text(),' Order Placed Successfully')]");

    //get cvv field 
    this.getCVVField =page.locator(".form__cc div:nth-of-type(2)>.input");

    //get name on card field
    this.getNameOnCardField = page.locator(".form__cc > div:nth-of-type(3) .input") 
    
    //get select country
    this.getSelectCountry = page.getByPlaceholder('Select Country');
    this.getSelectCountryMenu = page.getByRole('button', { name: 'Tunisia' });

    //get csv file button
    this.getDowndloadCSVFile = page.getByRole('button', { name: 'Click To Download Order Details in CSV' });
  }

  /**
   * billing Data sent by Object with customer billing information
   * @param {*} billingData 
   * 
   * Return Validation after place order
   * @returns  message
   */
  async submitOrder(billingData){
    //Fill CVV 
    await this.getCVVField.fill(billingData.cvv)

    //Fill Name On Card 
    await this.getNameOnCardField.fill(billingData.nameOnCard);

    /**
     * Fill Country
     * 
     * Validate if customer country is empty to avoid fill empty value
     */
    if(billingData.country != ""){
      await this.getSelectCountry.type(billingData.country,{delay:250});
      await this.getSelectCountryMenu.click();
    }

    //Variable to save Message after Placer Order
    let message="";

    //Click on Place Order
    await this.getOrderButton.click();
       
    //Validate if order was proccess correctly
    if(await this.getShippingError.isVisible()){
      message = await this.getShippingError.textContent();
    }else{
      message =await this.getThanksMessage.textContent();
    }
    return message.trim();
  }

  /**
   * CSV Download and saved in local folder 
   * @returns fileName
   */
  async downloadFile(){


    const download = await Promise.all([
      // waiting for download before clicking
      this.page.waitForEvent("download"),
      this.getDowndloadCSVFile.click()
    ])

    //attachments are downloaded into a temporary folder.
    const fileName = download[0].suggestedFilename();

    // Downloaded files are deleted when the browser context is closed.
    await download[0].saveAs(`./utils/downloads-files/${fileName}`);

    return fileName;
  }

}

