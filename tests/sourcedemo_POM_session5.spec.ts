import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { BasePage } from '../pages/base.page';
import { CartPage } from '../pages/cart.page';


// TC001 - Verify error message appears when login with invalid user
test('TC001 - Verify error message appears when login with invalid user', async ({ page }) => {

    const login_page = new  LoginPage(page);
    const base_page = new BasePage(page);

    await base_page.goto_url('https://www.saucedemo.com/')
    await login_page.login('locked_out_user', 'secret_sauce')
   
    // Verify that the error message “Epic sadface: Sorry, this user has been locked out.” is displayed
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });  

// TC002 - Verify user can order product successfully
test('TC002 - Verify user can order product successfully', async ({ page }) => {

    const base_page = new BasePage(page);
    const cart_page = new CartPage(page);

    await base_page.goto_url('https://www.saucedemo.com/inventory.html/')

    await cart_page.add_to_cart();
    await cart_page.checkout_and_finish_order('Quyen', 'Doan', '12345')
 
    // Validate thank you message
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  });
