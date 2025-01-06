import { readFileSync } from "fs";
import { google } from "googleapis";
import { join } from "path";

type CheckOrderStatusParams = {
  toolCallparameters: any;
};

export const checkOrderStatus = async ({
  toolCallparameters,
}: CheckOrderStatusParams) => {
  console.log("trigger checkOrderStatus", toolCallparameters);
};
