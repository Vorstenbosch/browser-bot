import { WebDriver } from "selenium-webdriver";

export default async (driver: WebDriver, url: string) => {
    driver.get(url)
}