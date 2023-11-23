import { Router } from "express";
import { List } from "./controllers/list";
import { Crud } from "./controllers/crud";

const router = Router();

const list = new List();
const crud = new Crud();

router.get("/:id", list.getList);
router.post("/", list.createList);

router.post("/crud/:id", crud.create);
router.get("/crud/:id", crud.read);
router.put("/crud/:id", crud.update);
router.delete("/crud/:id", crud.delete);
router.put("/crud/vote/:id", crud.vote);
export { router };
