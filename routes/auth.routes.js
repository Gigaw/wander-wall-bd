import { Router } from "express";
import userController from "../controller/user.controller.js";
import { body, check } from "express-validator";

const router = new Router();

router.post(
  "/signup",
  body("name").trim().isLength({ min: 3, max: 20 }),
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 20 }),
  body("phone").isMobilePhone().isLength({ min: 10, max: 15 }),
  userController.signUp
);
router.post(
  "/signin",
  body("email", 'Email is not correct').isEmail(),
  body("password", 'Password is not correct').isLength({ min: 4, max: 20 }),
  userController.signIn
);

const authRouter = router;

export default authRouter;
