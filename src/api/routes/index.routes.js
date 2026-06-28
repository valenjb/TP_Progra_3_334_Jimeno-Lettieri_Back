import { Router } from "express";
import productosRoutes from "./productos.routes.js";
import ventasRoutes from "./ventas.routes.js";

const router = Router();

router.use("/productos", productosRoutes);
router.use("/ventas", ventasRoutes);

export default router;
