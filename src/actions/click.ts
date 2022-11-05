import { WebDriver } from "selenium-webdriver";
import { findClickableElement } from "./utils/element";

export default async (driver: WebDriver, xpath: string) => {
  const e = await findClickableElement(driver, xpath);
  await e.click();
};
