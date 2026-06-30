/*=========================
    Rutas de vistas
==========================*/

import { Router } from "express";
import { indexView, getView, createView, updateView, deleteView } from "../controllers/view.controller.js";
import requireLogin from "../middlewares/validateSession.js";

const router = Router();

// Vista principal del dashboard
router.get("/index", requireLogin, indexView);

// Vista consultar producto
router.get("/get", requireLogin, getView);

// Vista crear producto
router.get("/post", requireLogin, createView);

// Vista modificar producto
router.get("/put", requireLogin, updateView);

// Vista desactivar producto
router.get("/delete", requireLogin, deleteView);

export default router;