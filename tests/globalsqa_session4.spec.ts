import {test, expect} from '@playwright/test'

test.beforeEach (async ({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows/');
});

// TC004 - Verify Frames (alternative)
test('TC004a - Verify Frames (alternative)', {tag: '@regression' }, async ({ page }) => {
   
    await expect(page.locator('h1')).toHaveText('Frames And Windows');
  
    await page.click('text=Iframe');
    const frame = page.frameLocator('iframe[name="globalSqa"]');
  
    const searchInput = frame.locator('#s');
    await searchInput.fill('Playwright');
    
    await frame.getByRole('button').click();
    await expect(frame.locator('ol')).toHaveText('Sorry, no posts matched your criteria.');
  });