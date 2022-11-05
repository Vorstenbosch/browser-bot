import { WebDriver, By, WebElement } from "selenium-webdriver";

export default async (
  driver: WebDriver,
  xpath: string,
  action: (element: WebElement, driver: WebDriver) => Promise<boolean>
): Promise<void> => {
  const elements = await driver.findElements(By.xpath(xpath));
  let stop = false;
  for (let i = 0; i < elements.length && !stop; i++) {
    const e = elements[i];
    stop = !(await action(e, driver));
  }
};
