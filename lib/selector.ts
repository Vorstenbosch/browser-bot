import { Locator, By } from "selenium-webdriver";

export default (xpathSelector: string): Locator => {
    return new By("xpath", xpathSelector)
}