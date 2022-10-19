import { Builder, ITimeouts, WebDriver } from "selenium-webdriver";

export default async (timeouts: ITimeouts): Promise<WebDriver> => {
  // initializing chrome driver
  const driver = new Builder().forBrowser("chrome").build();
  await driver.manage().setTimeouts(timeouts);

  // maximizing chrome browser
  driver.manage().window().maximize();

  return driver;
};
