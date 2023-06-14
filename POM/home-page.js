// playwright-dev-page.js
const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    //get social media links
    this.facebookLinkIcon = page.locator('.fa-facebook');
    this.instaLinkIcon = page.locator('.fa-instagram');
    this.tiwtterLinkIcon = page.locator('.fa-twitter');
    this.youTubeLinkIcon = page.locator('.fa-youtube');
    
    //get register option
    this.getRegisterLink = page.locator('a.btn1');

    // get "First Name" field
    this.getFirstNameInput = page.locator('#firstName');

    // get "Last Name" field
    this.getLastNamneInput = page.locator('#lastName');

    // get "Email" field
    this.getUserEmailInput = page.getByPlaceholder("email@example.com");

    // get "Phone Number" field
    this.getUserMobileInput = page.locator('#userMobile');

    // get "Occupation" field
    this.getUsertOcupationSelect = page.locator('.custom-select');

    // get "Male" radio button
    this.getMaleRadioButton = page.locator("//input[@value='Male']" );

    // get "Female" radio button
    this.getFemaleRadioButton = page.locator("//input[@value='Female']");

    // get " 18 year or Older" Checkbox
    this.isEighteenOrOlder=page.getByRole('checkbox');

    // get "Password" field
    this.getUserPasswordInput = page.locator('#userPassword');

    //get "Confirm Password" field
    this.getConfirmUserPasswordInput = page.locator('#confirmPassword');

    // get Error Message Checkbox when register and  isEighteenOrOlder was no selected
    this.getNotOlderThan18Message = page.locator("//div[contains(text(),'*Please check above checkbox')]");
    
    // get "Success Message" after regiter
    this.getAccountCreatedSuccessMessage = page.locator('h1.headcolor');

    // get "Register" button
    this.getRegisterButton = page.locator('#login');

    // get "login" button
    this.getLoginButton = page.locator('#login');
  }

  /**
   * Use a relative path when navigating the page
   */
  async goto() {
    // This will result in https://rahulshettyacademy.com/client/
    await this.page.goto("/client/");
  }

  /**
   * Login receive
   * @param {*} userName 
   * @param {*} password 
   * 
   */
  async login(userName,password){
    await this.getUserEmailInput.fill(userName);
    await this.getUserPasswordInput.fill(password);
    await this.getLoginButton.click();
  }
  
  //Client redirected to Faceboock
  async goToFacebook() {
    await this.facebookLinkIcon.click();
  }

  //Client redirected to Insta
  async goToInsta() {
    await this.instaLinkIcon.click();
  }

  //Client redirected to Tiwtter
  async goToTiwtter() {
    await this.tiwtterLinkIcon.click();
  }

  //Client redirected to Youtube
  async goToYouTube() {
    await this.youTubeLinkIcon.click();
  }

  //Verify that the Registration is working properly for all options
  async userRegister(userParameter){
    // click on Register button
    await this.getRegisterLink.click();

    //fill first name input
    await this.getFirstNameInput.fill(userParameter.FirstName);

    //fill last name input
    await this.getLastNamneInput.fill(userParameter.LastName);

    //Var with random string (To create random email)
    let randomString =(Math.random() + 1).toString(36).substring(7);

    //fill email input
    await this.getUserEmailInput.fill(randomString+"@mail.com");

    //fill phone number input
    await this.getUserMobileInput.fill(userParameter.PhoneNumber);

    //select user Occupation
    await this.getUsertOcupationSelect.selectOption(userParameter.Occupation);

    //validate if user is Male or Female and check Radiobutton
    if(userParameter.Gender === "male"){
      await this.getMaleRadioButton.check();
    }else{
      await this.getFemaleRadioButton.check();
    }

    //fill confirm password input
    await this.getUserPasswordInput.fill(userParameter.Password);

    //fill password input
    await this.getConfirmUserPasswordInput.fill(userParameter.ConfirmPassword);

    //Validate if user is older than 18 and check the checkbox
    if(userParameter.isEighteenOrOlder === "true"){
      await this.isEighteenOrOlder.check();
    }

    //save user registration
    await this.getRegisterButton.click();

    //Validate if customer was registered successfully
    if(userParameter.isEighteenOrOlder === "true"){
      //Return Success Message when user was registered successfully
      return await this.getAccountCreatedSuccessMessage.textContent();
    }else{
      //Return Error Message
      return await this.getNotOlderThan18Message.textContent();
    }
  }

  /**
   * readUserJSON reads a json with a list of customer to be register.
   * @returns jsonFileData
   */
  readUserJSON(){
    const fs=require('fs')
    var jsonFileData=[];
    var fileString=fs.readFileSync("./utils/users.json");
    const jsonData=JSON.parse(fileString);

    jsonData.users.forEach(element=>{
        jsonFileData.push(element);
    })
    return jsonFileData;
  }

}