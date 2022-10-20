import { WebDriver } from "selenium-webdriver";

export default async (driver: WebDriver) => {
  await driver.close();
};
