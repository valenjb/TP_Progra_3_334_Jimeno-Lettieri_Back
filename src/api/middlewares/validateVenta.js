// Middleware que valida el body al confirmar una compra (POST /api/ventas)
const validateVenta = (req, res, next) => {
    const { client_name, items } = req.body;
    const errores = [];

    if (!client_name || typeof client_name !== "string" || client_name.trim().length === 0) {
        errores.push("El nombre del cliente es obligatorio");
    }

    if (!Array.isArray(items) || items.length === 0) {
        errores.push("El carrito debe tener al menos un producto");
    } else {
        items.forEach((item, index) => {
            if (!item.producto_id || isNaN(Number(item.producto_id))) {
                errores.push(`Item ${index}: producto_id invalido`);
            }
            if (!item.quantity || isNaN(Number(item.quantity)) || Number(item.quantity) <= 0) {
                errores.push(`Item ${index}: quantity invalida`);
            }
        });
    }

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    next();
};

export default validateVenta;
