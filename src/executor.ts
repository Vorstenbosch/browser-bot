import { WebDriver } from "selenium-webdriver";
import click from "./actions/click";
import getData from "./actions/get-data";
import navigate from "./actions/navigate";
import textInput from "./actions/text-input";
import close from "./actions/close-browser";
import { FlowResult, Flow } from "./types/flow";
import {
  ActionResult,
  ElementExists,
  ElementImage,
  ElementParameters,
  ElementText,
  NavigationParameters,
  SendKeysParameters,
} from "./types/action";
import exists from "./actions/element-exists";

export default async (driver: WebDriver, flow: Flow): Promise<FlowResult> => {
  const flowResult: FlowResult = {
    name: flow.name,
    success: true,
    actionResults: [],
  };

  for (let i = 0; i < flow.actions.length; i++) {
    const action = flow.actions[i];
    const actionResult: ActionResult = {
      data: {},
      action: action,
      continue: true,
    };

    try {
      switch (action.type) {
        case "CLICK":
          await click(driver, (action.parameters as ElementParameters).xpath);
          break;
        case "CLOSE":
          await close(driver);
          break;
        case "GET_DATA":
          (actionResult.data as ElementText).textFound = await getData(
            driver,
            (action.parameters as ElementParameters).xpath
          );
          break;
        case "NAVIGATE":
          await navigate(
            driver,
            (action.parameters as NavigationParameters).url
          );
          break;
        case "TEXT_INPUT":
          await textInput(
            driver,
            (action.parameters as ElementParameters).xpath,
            (action.parameters as SendKeysParameters).keys
          );
          break;
        case "EXISTS":
          (actionResult.data as ElementExists).exists = await exists(
            driver,
            (action.parameters as ElementParameters).xpath
          );
          break;
        case "IMAGE":
          (actionResult.data as ElementImage).image = await exists(
            driver,
            (action.parameters as ElementParameters).xpath
          );
          break;
        default:
          throw Error(`unsupported action type '${action.type}' received`);
      }
    } catch (e) {
      actionResult.error = `action '${i}' of type '${
        action.type
      }' with parameters '${JSON.stringify(
        action.parameters
      )}' failed due to '${e}'`;
    }

    if (actionResult.error && !action.allowedToFail) {
      actionResult.continue = false;
    }

    flowResult.actionResults.push(actionResult);

    if (!actionResult.continue) {
      flowResult.success = false;
      break;
    }
  }

  return flowResult;
};
