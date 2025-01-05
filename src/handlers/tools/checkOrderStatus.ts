import { readFileSync } from "fs";
import { google } from "googleapis";
import { join } from "path";

type CheckOrderStatusParams = {
  toolCallparameters: any;
};

export const checkOrderStatus = async ({
  toolCallparameters,
}: CheckOrderStatusParams) => {
  console.log("trigger", toolCallparameters);
  try {
    const credentialsPath = join(
      __dirname,
      "..",
      "..",
      "..",
      "google-credentials.json"
    );
    const credentials = JSON.parse(readFileSync(credentialsPath, "utf8"));

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1Z5esaEs8yQzLGQgoMFIr3O3WmaUaYpIcmtloy_XCsi8",
      range: "Sheet1",
    });

    const headers = response.data.values[0];
    const orderIdIndex = headers.indexOf("Order ID");
    const statusIndex = headers.indexOf("Order Status");
    const orderID = toolCallparameters.orderID;

    // Search for the order by ID
    for (let i = 1; i < response.data.values.length; i++) {
      if (response.data.values[i][orderIdIndex] === orderID) {
        console.log("Order found", response.data.values[i][statusIndex]);
        return `Order Status: ${response.data.values[i][statusIndex]}`;
      }
    }
    return "Order ID not found";
  } catch (error) {
    console.error("Error:", error);
  }
};
