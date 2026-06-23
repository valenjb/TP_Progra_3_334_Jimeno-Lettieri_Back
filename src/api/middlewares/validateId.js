// Middleware de ruta para filtrar ids no validos en /api/productos/:id y /api/ventas/:id
const validateId = (req, res, next) => {
    const { id } = req.params;

    // REGEX: solo digitos enteros positivos (filtra "42abc", "0", "-1", espacios, etc)
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({
            error: "El ID debe ser un numero entero positivo"
        });
    }

    const parsedId = parseInt(id, 10);

    if (parsedId === 0) {
        return res.status(400).json({
            error: "El id debe ser mayor a 0"
        });
    }

    req.id = parsedId;

    next();
};

export default validateId;
