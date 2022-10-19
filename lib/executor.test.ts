import { describe, expect, test, jest } from "@jest/globals";
import { WebDriver } from "selenium-webdriver";
import executor from "./executor";
import { Flow } from "./types/flow";

describe("execute flow", () => {
  test("executes flow succesfully", async () => {
    // Given
    const flow: Flow = {
      name: "test",
      actions: [
        {
          type: "NAVIGATE",
          parameters: {
            url: "https://example.test",
          },
        },
      ],
    };

    const driver = {
      get: jest.fn(),
    } as unknown as WebDriver;

    // when
    const flowResult = await executor(driver, flow);

    // then
    expect(flowResult).toStrictEqual({
      success: true,
      name: "test",
      actionResults: [
        {
          action: {
            type: "NAVIGATE",
            parameters: {
              url: "https://example.test",
            },
          },
          continue: true,
          data: {},
        },
      ],
    });
  });

  test("fail to execute flow", async () => {
    // Given
    const flow: Flow = {
      name: "test",
      actions: [
        {
          type: "NAVIGATE",
          parameters: {
            url: "https://example.test",
          },
        },
      ],
    };

    const driver = {
      get: () => {
        throw new Error("driver not feeling well");
      },
    } as unknown as WebDriver;

    // when
    const flowResult = await executor(driver, flow);

    // then
    expect(flowResult).toStrictEqual({
      success: false,
      name: "test",
      actionResults: [
        {
          action: {
            type: "NAVIGATE",
            parameters: {
              url: "https://example.test",
            },
          },
          continue: false,
          error:
            "action '0' of type 'NAVIGATE' with parameters '{\"url\":\"https://example.test\"}' failed due to 'Error: driver not feeling well'",
          data: {},
        },
      ],
    });
  });
});
