import {test,expect} from '@playwright/test'

test.beforeEach (async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
});

// TC007 - Verify input
test('TC007 - Verify input', {tag: ['@regression', '@smoke'] }, async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Automation Testing Practice');
  
    const nameInput = page.locator("xpath=//input[@id='name']");
    const addressTextarea = page.locator("xpath=//textarea[@id='textarea']");
  
    await nameInput.fill('John Doe');
    await expect(nameInput).toHaveValue('John Doe');
  
    await addressTextarea.fill('123 Main St');
    await expect(addressTextarea).toHaveValue('123 Main St');
  
    await nameInput.clear();
    await expect(nameInput).toHaveValue('');
  
    await addressTextarea.clear();
    await expect(addressTextarea).toHaveValue('');
  });
  
  // TC008 - Verify prompt dialog
  test('TC008 - Verify prompt dialog', {tag: ['@regression', '@smoke'] }, async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Automation Testing Practice');
  
    const name = "Quyen";
  
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe('Please enter your name:');
      expect(dialog.defaultValue()).toBe('Harry Potter');
      await dialog.accept(name);
    });
  
    await page.click('//button[normalize-space()="Prompt"]');
  
    const resultMessage = await page.locator('#demo').innerText();
    expect(resultMessage).toBe(`Hello ${name}! How are you today?`); 
  
  });