export type Action = {
    type: ActionType,
    parameters?: { [key: string]: string };
    returnsData?: boolean
    allowedToFail?: boolean
}

export type ActionResult = {
    data?: string
}

export type ActionType = "CLICK" | "NAVIGATE" | "TEXT_INPUT" | "GET_DATA" | "CLOSE"