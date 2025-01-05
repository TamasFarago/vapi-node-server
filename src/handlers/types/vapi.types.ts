/* eslint-disable @typescript-eslint/no-explicit-any */

export enum VapiWebhookEnum {
  TOOL_CALL = "tool-calls",
}

// Add your Vapi tool names here
export type ToolCallName = "checkOrderStatus";

interface BaseVapiPayload {
  call: VapiCall;
}

export interface FunctionCallPayload extends BaseVapiPayload {
  type: VapiWebhookEnum.TOOL_CALL;
  toolCalls: any;
  toolWithToolCallList: any;
}

export interface VapiCall {}
export type VapiPayload = FunctionCallPayload;

export type ToolCall = {
  id: string;
  type: string;
  function: {
    name: ToolCallName;
    arguments: any;
  };
};

export type ToolCallResponse = {
  results: [
    {
      toolCallId: string;
      result: any;
    }
  ];
};

export type VapiResponse = ToolCallResponse;
