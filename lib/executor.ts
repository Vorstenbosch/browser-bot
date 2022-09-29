import { WebDriver } from "selenium-webdriver"
import click from "./actions/click"
import getData from "./actions/get-data"
import navigate from "./actions/navigate"
import textInput from "./actions/text-input"
import close from "./actions/close-browser"
import { FlowResult, Flow } from "./types/flow"

export default async (driver: WebDriver, flow: Flow): Promise<FlowResult> => {
    let data: { [key: string]: string } = {};
    let error

    for (let i = 0; i < flow.actions.length && !error; i++) {
        const action = flow.actions[i]
        let actionResult

        try {
            switch(action.type) {
                case "CLICK":
                    actionResult = await click(driver, action.parameters!.xpath)
                    break
                case "CLOSE":
                    actionResult = await close(driver)
                    break
                case "GET_DATA":
                    actionResult = await getData(driver, action.parameters!.xpath)
                    break
                case "NAVIGATE":
                    actionResult = await navigate(driver, action.parameters!.url)
                    break
                case "TEXT_INPUT":
                    actionResult = await textInput(driver, action.parameters!.xpath, action.parameters!.text)
                    break
                default:
                    throw Error(`unsupported action type '${action.type}' received`)
            }
        } catch (e) {
            if (action.allowedToFail) {
                console.info(`action '${i}' of type '${action.type}' with parameters '${JSON.stringify(action.parameters)}' failed due to '${e}' but was allowed to do so`)
            } else {
                error = `action '${i}' of type '${action.type}' with parameters '${JSON.stringify(action.parameters)}' failed due to '${e}'`
            }
        }

        if (actionResult && actionResult.data) {
            data = {
                ...data,
                [action.parameters!.dataKey]: actionResult.data
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