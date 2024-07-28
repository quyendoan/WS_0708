import { Locator, Page } from "@playwright/test";

export class BasePage{
    readonly page: Page;
    readonly url: Locator;
    
    constructor(page: Page){
        this.page = page;
        
    }

    // go to url
    async goto_url(url: string){
        await this.page.goto(url);
    }
}


