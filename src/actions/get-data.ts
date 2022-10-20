import { WebDriver, By } from "selenium-webdriver";

export default async (driver: WebDriver, xpath: string): Promise<string> => {
  return await driver.findElement(By.xpath(xpath)).getText();
};
