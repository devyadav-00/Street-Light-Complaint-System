import { Router } from "express";

const router = Router();

import { login, register, logout } from "../controllers/authController.js";

router.get("/", (req, res) => {
  res.send("Auth Route");
});

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

export default router;