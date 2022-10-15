import { WebDriver, By } from "selenium-webdriver";
import { ActionResult } from "../types/action";

export default async (driver: WebDriver, xpath: string): Promise<ActionResult>=> {
    const element = await driver.findElement(By.xpath(xpath))
    if (element) {
        return {
            exists: true
        }
    }

    return {
        exists: false
    }
}