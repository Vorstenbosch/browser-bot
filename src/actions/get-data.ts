import { WebDriver, By } from "selenium-webdriver";

export default async (
  driver: WebDriver,
  xpath: string,
  attribute?: string
): Promise<string> => {
  if (attribute) {
    return await driver.findElement(By.xpath(xpath)).getAttribute(attribute);
  } else {
    return await driver.findElement(By.xpath(xpath)).getText();
  }
};
