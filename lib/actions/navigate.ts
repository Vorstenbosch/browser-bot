import { WebDriver } from "selenium-webdriver";

export default async (driver: WebDriver, url: string) => {
   await driver.get(url)
}