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

export type ElementText = {
  textFound: string;
};

export type ElementImage = {
  image: any;
};

export type ElementExists = {
  exists: boolean;
};

export type ActionParameters =
  | ElementParameters
  | NavigationParameters
  | SendKeysParameters
  | null

export type ElementParameters = {
  xpath: string;
};

export type NavigationParameters = {
  url: string;
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
  | "IMAGE";
