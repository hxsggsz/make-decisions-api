import { Router } from "express";
import { List } from "./controllers/list";

const router = Router();

const list = new List();

router.get("/:id", list.getList);
router.post("/", list.createList);

export { router };
