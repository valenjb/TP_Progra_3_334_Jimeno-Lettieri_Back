// import { Router } from "express";
import productosRoutes from "./productos.routes.js";
import ventasRoutes from "./ventas.routes.js";
import authRoutes from "./auth.routes.js";
import viewRoutes from "./view.routes.js";

// const router = Router();

// router.use("/productos", productosRoutes);
// router.use("/ventas", ventasRoutes);
// router.use("/dashboard", viewRoutes);
// router.use("/login", authRoutes);

export {
    productosRoutes,
    ventasRoutes,
    authRoutes,
    viewRoutes
};
