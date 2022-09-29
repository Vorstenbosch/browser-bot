import { until, WebDriver } from "selenium-webdriver";
import locator from "../selector"
import { ActionResult } from "./../types/action"

export default async (driver: WebDriver, xpath: string): Promise<ActionResult> => {
    // we will wait for up to one second to locate the data field
    const element = await driver.wait(until.elementLocated(locator(xpath)), 1000)
    const data = await element.getText()
    if (data) {
        return {
            data: data
        }
    }

    return {}
}