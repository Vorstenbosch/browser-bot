import { WebDriver } from "selenium-webdriver";
import locator from "../selector"

export default async (driver: WebDriver, xpath: string) => {
    await driver.findElement(locator(xpath)).click()
}