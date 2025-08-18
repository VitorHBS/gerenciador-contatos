import {Router} from "express";
import { createUser, deleteUser, getAllUser, updateUser } from "../controllers/userController.js";

export const mainRouter = Router();

mainRouter.post("/user", createUser);

mainRouter.get("/users", getAllUser);

mainRouter.put("/user/:id", updateUser);

mainRouter.delete("/user/:id", deleteUser);