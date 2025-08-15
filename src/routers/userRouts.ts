import {Router} from "express";
import { createUser, getAllUser, updateUser } from "../controllers/userController.js";

export const mainRouter = Router();


mainRouter.get("/ping", (req, res) => {
    res.json({ pong: true})
})

mainRouter.post("/user", createUser)

mainRouter.get("/users", getAllUser);

mainRouter.put("/user/:id", updateUser)