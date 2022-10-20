import { WebDriver, By } from "selenium-webdriver";
import { ActionResult } from "../types/action";

export default async (driver: WebDriver, xpath: string): Promise<boolean> => {
  try {
    const element = await driver.findElement(By.xpath(xpath));
    if (element) {
      return true;
    }
  } catch (e) {
    // guess not
  }

  return false;
};
