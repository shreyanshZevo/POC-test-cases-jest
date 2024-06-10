import { deleteUser } from "@controller/Delete/Delete.controller";
import { createUser } from "../controller/Create/Create.controller";
import { getALLUser, getUserById } from "../controller/Read/Read.controller";
import express from "express";
import { updateUser } from "../controller/Update/Update.controller";
const appRouter = express.Router();

// appRouter.get("/:id", getUser);
appRouter.get("/", getALLUser);
appRouter.get("/:id", getUserById);
appRouter.post("/", createUser);
appRouter.delete("/:id", deleteUser);
appRouter.put("/:id", updateUser);

export default appRouter;
