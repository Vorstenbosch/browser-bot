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

  test("executes 'GET_DATA' flow without parameter", async () => {
    // Given
    const flow: Flow = {
      name: "test",
      actions: [
        {
          type: "GET_DATA",
          parameters: {
            xpath: "//div",
          },
        },
      ],
    };

    const driver = {
      findElement: jest.fn().mockImplementation(() => {
        return {
          getText: jest.fn().mockImplementation(() => {
            return "testText";
          }),
        };
      }),
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
            type: "GET_DATA",
            parameters: {
              xpath: "//div",
            },
          },
          continue: true,
          data: {
            textFound: "testText",
          },
        },
      ],
    });
  });

  test("executes 'GET_DATA' flow to get title attribute", async () => {
    // Given
    const flow: Flow = {
      name: "test",
      actions: [
        {
          type: "GET_DATA",
          parameters: {
            xpath: "//div",
            attribute: "title",
          },
        },
      ],
    };

    const driver = {
      findElement: jest.fn().mockImplementation(() => {
        return {
          getAttribute: jest.fn().mockImplementation(() => {
            return "testTitle";
          }),
        };
      }),
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
            type: "GET_DATA",
            parameters: {
              xpath: "//div",
              attribute: "title",
            },
          },
          continue: true,
          data: {
            textFound: "testTitle",
          },
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
