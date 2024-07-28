import {test, expect} from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html/');
})

test('TC001 - Verify sort by price', async ({ page }) => {

  //select "sort by price (low to high

  await test.step('Select "sort by price (low to high)', async() => {
    await page.locator(`//select[@data-test='product-sort-container']`).selectOption('lohi');
    await page.selectOption('.product_sort_container', 'lohi');
  })
  
  // Validate the sort works correctly
  await test.step('Validate the sort works correctly', async() => {
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const pricesAsNumbers = prices.map(price => parseFloat(price.replace('$', '')));
    const isSorted = pricesAsNumbers.every((price, i, arr) => !i || arr[i - 1] <= price);
    expect(isSorted).toBeTruthy();
  })

});

test('TC002 - Verify user can order product', async ({ page }) => {

  // Step 2: On the first item, click "Add to cart"
  await page.click('.inventory_item:first-child button');

  // Validate the button text changed into "Remove" and there is a number '1' on the cart
  await expect(page.locator('.inventory_item:first-child button')).toHaveText('Remove');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Step 3: Click on the cart
  await page.click('.shopping_cart_link');

  // Validate pre-added item is visible
  await expect(page.locator('.cart_item')).toHaveCount(1);

  // Step 4: Click checkout, input all required fields
  await page.click('#checkout');

  // Fill in the required fields
  await page.fill('#first-name', 'Quyen');
  await page.fill('#last-name', 'Doan');
  await page.fill('#postal-code', '12345');

  // Validate the corresponding fields display input text
  await expect(page.locator('#first-name')).toHaveValue('Quyen');
  await expect(page.locator('#last-name')).toHaveValue('Doan');
  await expect(page.locator('#postal-code')).toHaveValue('12345');

  // Step 5: Click Continue
  await page.click('#continue');

  // Validate checkout page has item added earlier
  await expect(page.locator('.cart_item')).toHaveCount(1);

  // Step 6: Click Finish
  await page.click('#finish');

  // Validate thank you message
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  await expect(page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});