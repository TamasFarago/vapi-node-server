import { checkOrderStatus } from "../tools/checkOrderStatus";
import { ToolCall } from "../types/vapi.types";

export const toolCallHandler = async (payload: any) => {
  const { toolCalls } = payload;

  const getToolCallResult = async () => {
    const toolCall: ToolCall = toolCalls[0];
    const {
      function: { name, arguments: toolCallparameters },
    } = toolCall;

    switch (name) {
      case "checkInfo":
        return await checkOrderStatus({
          toolCallparameters,
        });
      default:
        throw new Error(`Function ${name} not found`);
    }
  };

  const result = await getToolCallResult();

  return {
    results: [
      {
        toolCallId: toolCalls[0].id,
        result: result,
      },
    ],
  };
};
