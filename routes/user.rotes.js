import { Router } from "express";
import userController from "../controller/user.controller.js";

const router = new Router();

router.get("/users/:id", userController.getUser);
router.post("/users", userController.createUser);
router.delete("/users/:id", userController.deleteUser);
router.put("/users/:id", userController.updateUser);

const userRouter = router;

export default userRouter;
