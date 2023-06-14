const { test, expect } = require('@playwright/test');
const { HomePage } = require('../POM/home-page');

test.describe("Client wants to verify that the user is redirected to the client social media pages", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    const homePage = new HomePage(page);
    await homePage.goto();
  });

  test("User is redirected to facebook (login)", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToFacebook();
    await expect(page).toHaveURL(/.*auth/);
  });

 
  test("User is redirected to insta (login)", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToInsta();
    await expect(page).toHaveURL(/.*auth/);
  });

  
  test("User is redirected to tiwtter (login)", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToTiwtter();
    await expect(page).toHaveURL(/.*auth/);
  });

  test("User is redirected to YouTube (login)", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToYouTube();
    await expect(page).toHaveURL(/.*auth/);
  });
  
});