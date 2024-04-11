import { Router } from "express";
import userController from "../controller/user.controller.js";
import { body } from "express-validator";

const router = new Router();

router.post(
  "/signup",
  body("name").trim().isLength({ min: 3, max: 20 }),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 4, max: 20 }),
  body("phone").isMobilePhone(),
  userController.signUp
);
router.post(
  "/signin",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 4, max: 20 }),
  userController.signIn
);
// router.post("/signout", userController.signOut);

const authRouter = router;

export default authRouter;
