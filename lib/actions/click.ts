import { WebDriver, By } from "selenium-webdriver";
import getElement from "./utils/element";

export default async (driver: WebDriver, xpath: string) => {
  const e = await getElement(driver, xpath);
  await e.click();
};
