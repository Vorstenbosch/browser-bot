import { WebDriver, By } from "selenium-webdriver";
import { ActionResult } from "./../types/action"

export default async (driver: WebDriver, xpath: string): Promise<ActionResult> => {
    const data = await driver.findElement(By.xpath(xpath)).getText()
   
    if (data) {
        return {
            data: data
        }
    }

    return {}
}