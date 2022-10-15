export type Action = {
    type: ActionType,
    parameters?: ElementParameters | NavigationParameters | SendKeysParameters | GetDataParameters
    allowedToFail?: boolean
}

export type ActionResult = {
    data?: string,
    exists?: boolean
}

export type ElementParameters = {
    xpath: string,
}

export type NavigationParameters = {
    url: string
}

export type SendKeysParameters = {
    text: string
}

export type GetDataParameters = {
    dataKey: string
}

export type ActionType = "CLICK" | "NAVIGATE" | "TEXT_INPUT" | "GET_DATA" | "CLOSE" | "EXISTS"