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

// GET /api/productos/:id
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

// POST /api/productos
async function createProducto(req, res) {
    try {
        const id = await productosModel.create(req.body);

        res.status(201).json({
            message: "Producto creado con exito",
            id
        });

    } catch (error) {
        console.log("Error creando producto: ", error.message);
        res.status(500).json({
            message: "Error interno al crear el producto"
        });
    }
}

// PUT /api/productos/:id
async function updateProducto(req, res) {
    try {
        await productosModel.update(req.id, req.body);

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.log("Error actualizando producto: ", error.message);
        res.status(500).json({
            message: "Error interno al actualizar el producto"
        });
    }
}

// PATCH /api/productos/:id/desactivar  (baja logica)
async function deactivateProducto(req, res) {
    try {
        await productosModel.setActive(req.id, false);

        res.status(200).json({
            message: "Producto desactivado correctamente"
        });

    } catch (error) {
        console.log("Error desactivando producto: ", error.message);
        res.status(500).json({
            message: "Error interno al desactivar el producto"
        });
    }
}

// PATCH /api/productos/:id/activar
async function activateProducto(req, res) {
    try {
        await productosModel.setActive(req.id, true);

        res.status(200).json({
            message: "Producto activado correctamente"
        });

    } catch (error) {
        console.log("Error activando producto: ", error.message);
        res.status(500).json({
            message: "Error interno al activar el producto"
        });
    }
}

export default {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deactivateProducto,
    activateProducto
};
