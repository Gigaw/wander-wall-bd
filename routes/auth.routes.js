import { Router } from "express";
import userController from "../controller/user.controller.js";
import { check } from "express-validator";

const router = new Router();
  // console.log(check)
router.post(
  "/signup",
  check("name").trim().isLength({ min: 3, max: 20 }),
  check("email").isEmail().normalizeEmail(),
  check("password").isLength({ min: 4, max: 20 }),
  check("phone").isMobilePhone().isLength({ min: 10, max: 15 }),
  userController.signUp
);
router.post(
  "/signin",
  check("email", 'Email is not correct').isEmail().normalizeEmail(),
  check("password", 'Password is not correct').isLength({ min: 4, max: 20 }),
  userController.signIn
);
// router.post("/signout", userController.signOut);

const authRouter = router;

export default authRouter;
