
import { browser, element, until, ExpectedConditions, $, By, Builder, Key } from 'protractor';
import { Driver } from 'selenium-webdriver/chrome';


describe("google tests", () => {
    it('should navigate to home page', async () => {
        browser.driver.get("https://www.google.com");
        expect(browser.driver.getTitle()).toContain("Google");
        console.log(`getTitle() : ${browser.driver.getTitle()}`);
    });

    it('should search for the term TypeScript', async () => {
        browser.driver.get("https://www.google.com");

        await browser.driver.findElement(By.id("lst-ib")).sendKeys("TypeScript");
        await browser.driver.findElement(By.xpath('//*[@id="lst-ib"]')).sendKeys(Key.ENTER);

        browser.sleep(5000);

    });
});

//*[@id="q"]
//*[@id="lst-ib"]