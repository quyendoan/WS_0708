import {test,expect} from '@playwright/test'

// TC001 - Verify Checkboxes
test('TC001 - Verify Checkboxes', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Checkboxes');

  await expect(page.locator('h3')).toHaveText('Checkboxes');

  const checkbox1 = page.locator('input[type="checkbox"]').nth(0);
  const checkbox2 = page.locator('input[type="checkbox"]').nth(1);

  await checkbox1.check();
  await checkbox2.uncheck();

  await expect(checkbox1).toBeChecked();
  await expect(checkbox2).not.toBeChecked();
});

// TC002 - Verify Drag and Drop
test('TC002 - Verify Drag and Drop', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Drag and Drop');

  await expect(page.locator('h3')).toHaveText('Drag and Drop');

  const columnA = page.locator('#column-a');
  const columnB = page.locator('#column-b');

  await columnA.dragTo(columnB);

  await expect(columnA).toHaveText('B');
  await expect(columnB).toHaveText('A');
});

// TC003 - Verify Dropdown
test('TC003 - Verify Dropdown', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Dropdown');

  await expect(page.locator('h3')).toHaveText('Dropdown List');

  const dropdown = page.locator('#dropdown');

  await dropdown.selectOption({ label: 'Option 2' });
  await expect(dropdown).toHaveValue('2');

  await dropdown.selectOption({ index: 1 });
  await expect(dropdown).toHaveValue('1');

  await dropdown.selectOption({ value: '2' });
  await expect(dropdown).toHaveValue('2');
});


// TC004 - Verify Frames (alternative)
test('TC004a - Verify Frames (alternative)', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows/');
  await expect(page.locator('h1')).toHaveText('Frames And Windows');

  await page.click('text=Iframe');
  const frame = page.frameLocator('iframe[name="globalSqa"]');

  const searchInput = frame.locator('#s');
  await searchInput.fill('Playwright');
  
  await frame.getByRole('button').click();
  await expect(frame.locator('ol')).toHaveText('Sorry, no posts matched your criteria.');
});

// TC005 - Verify Upload file
test('TC005 - Verify Upload file', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=File Upload');

  await expect(page.locator('h3')).toHaveText('File Uploader');

  const filePath = './tests/file.txt';

  await page.setInputFiles('input[type="file"]', filePath);
  await page.click('input[type="submit"]');

  await expect(page.locator('#uploaded-files')).toHaveText('file.txt');
});

// TC006 - Verify Dynamically Loaded Page Elements
test('TC006 - Verify Dynamically Loaded Page Elements', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=Dynamic Loading');

  await expect(page.locator('h3')).toHaveText('Dynamically Loaded Page Elements');

  await page.click('text=Example 1');
  await page.getByRole("button", {name: "Start"}).click();

  const loadingLabel = page.locator("xpath=//div[@id='loading']");
  await loadingLabel.waitFor();
  await loadingLabel.waitFor({state: "hidden"});

  await expect(page.locator("xpath=//div[@id='finish']")).toHaveText("Hello World!");
});

// TC007 - Verify input
test('TC007 - Verify input', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
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
test('TC008 - Verify prompt dialog', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
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