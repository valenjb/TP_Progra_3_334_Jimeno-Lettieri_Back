import ventasModel from "../models/ventas.model.js";

// POST /api/ventas  (se llama al confirmar la compra desde el carrito)
async function createVenta(req, res) {
    try {
        const venta = await ventasModel.create(req.body);

        res.status(201).json({
            message: "Venta registrada con exito",
            payload: venta
        });

    } catch (error) {
        console.log("Error registrando venta: ", error.message);
        res.status(400).json({
            message: error.message || "Error al registrar la venta"
        });
    }
}

// GET /api/ventas
async function getVentas(req, res) {
    try {
        const ventas = await ventasModel.getAll();

        res.status(200).json({
            total: ventas.length,
            payload: ventas
        });

    } catch (error) {
        console.log("Error obteniendo ventas: ", error.message);
        res.status(500).json({
            message: "Error interno al obtener las ventas"
        });
    }
}

// GET /api/ventas/:id  (la venta junto con sus productos asociados)
async function getVentaById(req, res) {
    try {
        const venta = await ventasModel.getById(req.id);

        if (!venta) {
            return res.status(404).json({
                error: `No se encontro venta con id ${req.id}`
            });
        }

        res.status(200).json({ payload: venta });

    } catch (error) {
        console.log("Error obteniendo venta: ", error.message);
        res.status(500).json({
            message: "Error interno al obtener la venta"
        });
    }
}

export default { createVenta, getVentas, getVentaById };
