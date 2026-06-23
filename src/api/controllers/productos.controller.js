import productosModel from "../models/productos.model.js";

async function getProductos(req, res) {
    try {
        const { category, page = 1, limit = 8, all } = req.query;

        const resultado = await productosModel.getAll({
            category,
            page,
            limit,
            onlyActive: all !== "true"
        });

        res.status(200).json({
            total: resultado.pagination.total,
            payload: resultado.data,
            pagination: resultado.pagination
        });

    } catch (error) {
        console.log("Error obteniendo productos: ", error.message);
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}

async function getProductoById(req, res) {
    try {
        const producto = await productosModel.getById(req.id);

        if (!producto) {
            return res.status(404).json({
                error: `No se encontro producto con id ${req.id}`
            });
        }

        res.status(200).json({ payload: producto });

    } catch (error) {
        console.log("Error obteniendo producto con id: ", error.message);
        res.status(500).json({
            error: "Error interno al obtener un producto con id"
        });
    }
}


export default {
    getProductos,
    getProductoById
};
