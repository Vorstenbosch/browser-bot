import { WebDriver } from "selenium-webdriver"
import click from "./actions/click"
import getData from "./actions/get-data"
import navigate from "./actions/navigate"
import textInput from "./actions/text-input"
import close from "./actions/close-browser"
import { FlowResult, Flow } from "./types/flow"
import { ActionResult, ElementParameters, GetDataParameters, NavigationParameters, SendKeysParameters } from "./types/action"
import exists from "./actions/element-exists"

export default async (driver: WebDriver, flow: Flow): Promise<FlowResult> => {
    let data: { [key: string]: any } = {};
    let error

    for (let i = 0; i < flow.actions.length && !error; i++) {
        const action = flow.actions[i]
        let actionResult: ActionResult = {}

        try {
            switch(action.type) {
                case "CLICK":
                    await click(driver, (action.parameters as ElementParameters).xpath)
                    break
                case "CLOSE":
                    await close(driver)
                    break
                case "GET_DATA":
                    actionResult = await getData(driver, (action.parameters as ElementParameters).xpath)
                    break
                case "NAVIGATE":
                    await navigate(driver, (action.parameters as NavigationParameters).url)
                    break
                case "TEXT_INPUT":
                    await textInput(driver, (action.parameters as ElementParameters).xpath, (action.parameters as SendKeysParameters).text)
                    break
                case "EXISTS":
                    actionResult = await exists(driver, (action.parameters as ElementParameters).xpath)
                    break
                default:
                    throw Error(`unsupported action type '${action.type}' received`)
            }
        } catch (e) {
            if (!action.allowedToFail) {
                error = `action '${i}' of type '${action.type}' with parameters '${JSON.stringify(action.parameters)}' failed due to '${e}'`
            }
        }

        if (actionResult && actionResult.data) {
            data = {
                ...data,
                [(action.parameters as GetDataParameters).dataKey]: actionResult.data
            }
        }

        if (actionResult && actionResult.exists) {
            data = {
                ...data,
                [(action.parameters as GetDataParameters).dataKey]: actionResult.exists
            }
        }
    }

    if (error) {
        return {
            name: flow.name,
            success: false,
            data: data,
            error: error
        }
    } else {
        return {
            name: flow.name,
            success: true,
            data: data
        }
    }

}