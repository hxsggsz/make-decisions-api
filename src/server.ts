import cors from "cors";
import Express from "express";
import { router } from "./routes";

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const port = process.env.PORT || 3000;

const app = Express();

app.use(Express.json());

app.use(cors(corsOptions));

app.use(router);

app.listen(port, () => console.log(`🚀runnig on http://localhost:${port}`));
