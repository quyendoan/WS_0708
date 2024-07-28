import { Locator, Page } from "@playwright/test";

export class CartPage{
    readonly page: Page;
    readonly item: Locator;
    readonly cart_link: Locator;
    readonly cart_item: Locator;
    readonly checkout_btn: Locator;
    readonly firstname_txt: Locator;
    readonly lastname_txt: Locator;
    readonly postal_code_txt: Locator;
    readonly continue_btn: Locator;
    readonly finish_btn: Locator;
    constructor(page: Page){
        this.page = page;
        this.item = page.locator('.inventory_item:first-child button');
        this.cart_link = page.locator('.shopping_cart_link')
        this.cart_item = page.locator('.cart_item')
        this.checkout_btn = page.locator('#checkout');
        this.firstname_txt = page.locator('#first-name');
        this.lastname_txt = page.locator('#last-name');
        this.postal_code_txt = page.locator('#postal-code');
        this.continue_btn = page.locator('#continue');
        this.finish_btn = page.locator('#finish');
    }

    async add_to_cart() {
        await this.item.click();
        await this.cart_link.click();
        await this.cart_item.click();
    }
    
    async checkout_and_finish_order(frist_name: string, last_name: string, postal_code: string){
        await this.checkout_btn.click();
        await this.firstname_txt.fill(frist_name);
        await this.lastname_txt.fill(last_name);
        await this.postal_code_txt.fill(postal_code);
        await this.continue_btn.click();
        await this.finish_btn.click();
    }

}


