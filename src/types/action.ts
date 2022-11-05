import { WebElement } from "selenium-webdriver";

export type Action = {
  type: ActionType;
  parameters: ActionParameters;
  allowedToFail?: boolean;
};

export type ActionResult = {
  action: Action;
  error?: string;
  data: ResultData;
  continue: boolean;
};

export type ResultData = {} | ElementText | ElementExists | ElementImage;

export type DoOnAllParameters = {
  action: (element: WebElement) => Promise<boolean>;
};

export type ElementText = {
  textFound: string;
};

export type ElementImage = {
  image: string;
};

export type ElementExists = {
  exists: boolean;
};

export type ActionParameters =
  | ElementParameters
  | NavigationParameters
  | SendKeysParameters
  | GetDataParameters
  | DoOnAllParameters
  | null;

export type ElementParameters = {
  xpath: string;
};

export type NavigationParameters = {
  url: string;
};

export type GetDataParameters = {
  attribute: string;
};

export type SendKeysParameters = {
  keys: string;
} & ElementParameters;

export type ActionType =
  | "CLICK"
  | "NAVIGATE"
  | "TEXT_INPUT"
  | "GET_DATA"
  | "CLOSE"
  | "EXISTS"
  | "IMAGE"
  | "DO_ON_ALL";
