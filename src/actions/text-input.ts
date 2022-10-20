import { WebDriver, By } from "selenium-webdriver";

export default async (driver: WebDriver, xpath: string, text: string) => {
  await driver.findElement(By.xpath(xpath)).sendKeys(text);
};
