import { WebDriver } from "selenium-webdriver";
import locator from "../selector"

export default async (driver: WebDriver, xpath: string, text: string) => {
    driver.findElement(locator(xpath)).then(e => {
        e.sendKeys(text)
    })
}