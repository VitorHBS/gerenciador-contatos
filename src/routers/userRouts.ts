import { Router } from "express";
import { createPostForUser, createUser, deleteUser, getAllUser, updateUser } from "../controllers/userController.js";

export const mainRouter = Router();

mainRouter.post("/user", createUser);

mainRouter.post("/user/:id/post", createPostForUser);

mainRouter.get("/users", getAllUser);

mainRouter.put("/user/:id", updateUser);

mainRouter.delete("/user/:id", deleteUser);

