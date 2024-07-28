import {test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({page}) => {

// Step 1: Go to the Sauce Demo inventory page
 await page.goto('https://www.saucedemo.com');
  
 // Log in with standard user credentials
 await page.fill('#user-name', 'standard_user');
 await page.fill('#password', 'secret_sauce');
 await page.click('#login-button');

 await page.waitForURL('https://www.saucedemo.com/inventory.html');

 await expect(page.locator('.title')).toHaveText('Products');

 await page.context().storageState({path:authFile});
 
})

