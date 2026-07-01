/*===========================
    Rutas de autenticacion
============================*/

import { Router } from "express";
import { loginView, getAdminUser, destroySession } from "../controllers/auth.controller.js";

const router = Router();

// Vista login
router.get("/", loginView);

// POST login
router.post("/", getAdminUser);

// POST logout
router.post("/destroy", destroySession);


export default router;