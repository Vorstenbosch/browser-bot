import { Builder, WebDriver } from "selenium-webdriver";

export default async (): Promise<WebDriver> => {
    // initializing chrome driver 
    const driver = new Builder().forBrowser("chrome").build()

    // maximizing chrome browser 
    driver.manage().window().maximize()
    
    return driver
}