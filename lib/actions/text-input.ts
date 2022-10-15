import { WebDriver, By } from "selenium-webdriver";

export default async (driver: WebDriver, xpath: string, text: string) => {
   const element = await driver.findElement(By.xpath(xpath))
    element.sendKeys(text)
}