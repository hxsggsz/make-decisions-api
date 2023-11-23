import cors from "cors";
import Express from "express";
import { router } from "./routes";

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = Express();

app.use(Express.json());

app.use(cors(corsOptions));

app.use(router);

app.listen(3333, () => console.log("rodando em http://localhost:3333"));