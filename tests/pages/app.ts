import {Page, Locator, expect} from '@playwright/test';

export class Home{
    page: Page;

    /**
     * 
     * @param page - page fixture from the test 
     */
    constructor(page:Page){
        this.page = page;
    }

    /**
     * 
     * @param url - url to navigate to
     */
    async goToUrl(url: string){
        this.page.goto(url);
    }

    /**
     * 
     * @param selector - any valid selctor for locator method
     * @param value - value to fill inside the text box
     */
    async fillTextField(selector:string, value:string){
        const element: Locator = await this.page.locator(selector);
        await expect(element).toBeVisible();
        await expect(element).toBeEditable();
        await element.fill(value);
    }

    /**
     * 
     * @param emailText - fills email field in the login form
     */
    async fillEmail(emailText:string){
        await this.fillTextField("#email", emailText);
    }

    /**
     * 
     * @param passwordText - fills password field in the login form
     */
    async fillPassword(passwordText:string){
        await this.fillTextField("#password", passwordText)
    }

    /**
     * 
     * @param expectedText - validates all the expected text in a the success message field
     */
    async validateInnerText(selector:string, ...expectedText:string[]){
        const element: Locator = await this.page.locator(selector);
        await expect(element).toBeVisible();
        await expectedText.forEach(async (text) => await expect(element).toContainText(text));
    }

    /**
     * 
     * @param selector - opens the given link on page
     */
    async openLink(selector:string){
        await this.page.locator(selector).click();
    }

    /**
     * 
     * @param jsclick - use javascript for executing click or normal click as default
     */
    async login(jsclick:boolean=false){
        const submitSelector = `#submitButton`;
        if (jsclick){
            await this.page.evaluate(`document.querySelector('${submitSelector}').click()`);
        }
        else{
            const submit: Locator = await this.page.locator(submitSelector);
            await expect(submit).toBeEnabled() 
            await submit.click();
        }
    }

    /**
     * opens menu bar post successful login
     */
    async openMenu(){
        const menuButton: Locator = await this.page.locator(`#menuButton`)
        await expect(menuButton).toBeEnabled();
        await expect(menuButton).toHaveAttribute('data-initialized', 'true');
        await menuButton.click();
    }

    /**
     * opens profile menu post successful login
     */
    async openProfile(){
        const profileButton: Locator = await this.page.locator(`#profileButton`)
        await expect(profileButton).toBeEnabled();
        await profileButton.click();
    }

    /**
     * logouts the user from menu
     */
    async logout(){
        const logoutButton: Locator = await this.page.locator(`#logoutOption`)
        await expect(logoutButton).toBeEnabled();
        await logoutButton.click();
    }

    /**
     * clicks on forgot password link
     */
    async forgotPassword(){
        await this.page.getByRole('button', { name: 'Forgot Password?' }).click();
        const btol: Locator = await this.page.locator('a.back-to-login')
        await expect(btol).toBeAttached()
    }

    /**
     * clicks on reset password link
     */
    async resetPassword(){
        await this.page.getByRole('button', { name: 'Reset Password' }).click();
        await expect(this.page.getByRole('heading', { name: 'Success!' })).toBeVisible();
    }

    /**
     * waits for application to be ready for user interactions
     */
    async waitForAppReady(){
        await this.page.waitForFunction('window.isAppReady === true');
    }
}