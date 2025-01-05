import { Router } from "express";
import { webhookHandler } from "./handlers/webhook";

const router = Router();

router.post("/webhook", webhookHandler);

export { router };
