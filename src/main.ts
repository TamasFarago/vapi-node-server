import express, { json } from "express";
import cors from "cors";
import { router } from "./router";
import bodyParser from "body-parser";

const host = "localhost";
const port = 8080;

const app = express();

app.use(json());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello API" });
});

app.use("/api", router);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
