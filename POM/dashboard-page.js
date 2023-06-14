const { expect } = require('@playwright/test');

exports.DashboardPage = class DashboardPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    //"Add to cart" button
     this.getAddToCartButton = page.locator("//button[contains(text(),'Add To Cart')]");

     //Cart button
     this.getCartButton = page.locator("//li/button[contains(text(),' Cart')]");
   
  }

  /**
   * 
   * @param {*} items 
   * Validate and Add items from dashboard result 
   * acording with the items amount received
   */
  async addItems(items) {
    await this.getAddToCartButton.last().waitFor();

    if(items <= await this.getAddToCartButton.count()){
      for(let i=0;i<items;i++){
        console.log("entre al for")
        await this.getAddToCartButton.nth(i).click();
      }    
      return true;
    }else{
      return false;
    }
  }
  

  //Click on Cart button 
  async cartClick(){
    await this.getCartButton.click();
  }

}