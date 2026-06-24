import { Router } from "express";
import productosController from "../controllers/productos.controller.js";
import validateId from "../middlewares/validateId.js";
import validateProducto from "../middlewares/validateProducto.js";

const router = Router();

router.get("/", productosController.getProductos);
router.get("/:id", validateId, productosController.getProductoById);
router.post("/", validateProducto, productosController.createProducto);
router.put("/:id", validateId, validateProducto, productosController.updateProducto);
router.patch("/:id/desactivar", validateId, productosController.deactivateProducto);
router.patch("/:id/activar", validateId, productosController.activateProducto);

export default router;
