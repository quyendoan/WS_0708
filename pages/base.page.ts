import { Locator, Page } from "@playwright/test";
import { expect } from '@playwright/test';

export class BasePage{
    readonly page: Page;
    readonly url: Locator;
    readonly error_text: Locator;
    readonly complete_header: Locator;
    readonly complete_text: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.error_text = page.locator('[data-test="error"]')
        this.complete_header = page.locator('.complete-header')
        this.complete_text = page.locator('.complete-text')
    }

    // go to url
    async goto_url(url: string){
        await this.page.goto(url);
    }

    async verify_error_text(){
        await expect(this.error_text).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    }

    async verify_complete_header() {
        await expect(this.complete_header).toHaveText('Thank you for your order!');
    }

    async verify_complete_text() {
        await expect(this.complete_text).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    }

}


