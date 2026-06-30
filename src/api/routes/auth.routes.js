/*===========================
    Rutas de autenticacion
============================*/

import { Router } from "express";
import { loginView, getAdminUser } from "../controllers/auth.controller.js";

const router = Router();

// Vista login
router.get("/", loginView);

// POST login
router.post("/", getAdminUser);

export default router;