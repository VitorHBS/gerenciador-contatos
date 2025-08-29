import { Router } from "express";
import { createCommmentForUser, createPostForUser, createUser, deleteUser, getAllPost, getAllUser, updateUser } from "../controllers/userController.js";

export const mainRouter = Router();

mainRouter.post("/user", createUser);

mainRouter.post("/user/:id/post", createPostForUser);

mainRouter.post("/user/:userId/post/:postId", createCommmentForUser);

mainRouter.get("/users", getAllUser);

mainRouter.get("/posts", getAllPost)

mainRouter.put("/user/:id", updateUser);

mainRouter.delete("/user/:id", deleteUser);

