import {test, expect} from '@playwright/test'

test.beforeEach (async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/');
});

// TC001 - Verify Checkboxes
test.skip('TC001 - Verify Checkboxes', {tag: ['@regression', '@smoke'] }, async ({ page }) => {
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
test('TC002 - Verify Drag and Drop', {tag: '@regression' }, async ({ page }) => {
  await page.click('text=Drag and Drop');

  await expect(page.locator('h3')).toHaveText('Drag and Drop');

  const columnA = page.locator('#column-a');
  const columnB = page.locator('#column-b');

  await columnA.dragTo(columnB);

  await expect(columnA).toHaveText('B');
  await expect(columnB).toHaveText('A');
});

// TC003 - Verify Dropdown
test.fail('TC003 - Verify Dropdown', {tag: ['@regression', '@smoke'] }, async ({ page }) => {
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

// TC005 - Verify Upload file
test('TC005 - Verify Upload file', {tag: '@regression' }, async ({ page }) => {
    await page.click('text=File Upload');
  
    await expect(page.locator('h3')).toHaveText('File Uploader');
  
    const filePath = './tests/file.txt';
  
    await page.setInputFiles('input[type="file"]', filePath);
    await page.click('input[type="submit"]');
  
    await expect(page.locator('#uploaded-files')).toHaveText('file.txt');
  });
  
  // TC006 - Verify Dynamically Loaded Page Elements
  test('TC006 - Verify Dynamically Loaded Page Elements', {tag: ['@regression', '@smoke'] }, async ({ page }) => {
    await page.click('text=Dynamic Loading');
  
    await expect(page.locator('h3')).toHaveText('Dynamically Loaded Page Elements');
  
    await page.click('text=Example 1');
    await page.getByRole("button", {name: "Start"}).click();
  
    const loadingLabel = page.locator("xpath=//div[@id='loading']");
    await loadingLabel.waitFor();
    await loadingLabel.waitFor({state: "hidden"});
  
    await expect(page.locator("xpath=//div[@id='finish']")).toHaveText("Hello World!");
  });