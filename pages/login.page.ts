import { Locator, Page } from "@playwright/test";

export class LoginPage{
    readonly page: Page;
    readonly username_txt: Locator;
    readonly password_txt: Locator;
    readonly login_btn: Locator;
    constructor(page: Page){
        this.page = page;
        this.username_txt = page.locator('#user-name');
        this.password_txt = page.locator('#password');
        this.login_btn = page.locator('#login-button');
    }

    async login(username: string, password: string){
        await this.username_txt.fill(username);
        await this.password_txt.fill(password);
        await this.login_btn.click();
    }
}


