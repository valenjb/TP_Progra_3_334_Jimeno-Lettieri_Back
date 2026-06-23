import { Router } from "express";
import productosController from "../controllers/productos.controller.js";

const router = Router();

router.get("/", productosController.getProductos);

export default router;
