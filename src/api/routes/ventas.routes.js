import { Router } from "express";
import ventasController from "../controllers/ventas.controller.js";
import validateId from "../middlewares/validateId.js";
import validateVenta from "../middlewares/validateVenta.js";

const router = Router();

router.post("/", validateVenta, ventasController.createVenta);
router.get("/", ventasController.getVentas);
router.get("/:id", validateId, ventasController.getVentaById);

export default router;
