import { Request, Response } from "express";
import { VapiPayload, VapiWebhookEnum } from "../types/vapi.types";
import { toolCallHandler } from "./toolCall";

export const webhookHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const payload = req.body.message as VapiPayload;
    switch (payload.type) {
      case VapiWebhookEnum.TOOL_CALL:
        return res.status(201).json(await toolCallHandler(payload));
      default:
        throw new Error(`Unhandled message type`);
    }
  } catch (error) {
    // console.log('lmao', error);
    return res.status(500).send(error.message);
  }
};
