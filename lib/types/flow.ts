import { Action } from "./../types/action"

export type Flow = {
    name: string
    actions: Action[]
}

export type FlowResult = {
    name: string
    success: boolean
    data: {[key: string]: string}
    error?: any
}