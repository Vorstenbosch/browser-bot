import { WebDriver, By, WebElement } from "selenium-webdriver";

export default async (driver: WebDriver, xpath: string): Promise<WebElement> => {
    let e = await driver.findElement(By.xpath(xpath))
    await scrollToElement(driver, e)
    e = await driver.findElement(By.xpath(xpath))
    return e
}

const scrollToElement = async (driver: WebDriver, element: WebElement) => {
    await driver.executeScript("arguments[0].scrollIntoView()", element);
    await driver.sleep(300);
}