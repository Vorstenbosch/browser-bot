import { Action, ActionResult } from "./../types/action";

export type Flow = {
  name: string;
  actions: Action[];
};

export type FlowResult = {
  name: string;
  success: boolean;
  actionResults: ActionResult[];
};
