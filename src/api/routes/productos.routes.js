import { Router } from "express";
import productosController from "../controllers/productos.controller.js";
import validateId from "../middlewares/validateId.js";

const router = Router();

router.get("/", productosController.getProductos);
router.get("/:id", validateId, productosController.getProductoById);

export default router;
