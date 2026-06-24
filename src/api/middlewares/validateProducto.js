const CATEGORIAS_VALIDAS = ["hardware", "software"];

// valida los datos del producto antes de llegar al controller
const validateProducto = (req, res, next) => {
    const { name, image, category, subcategory, price } = req.body;
    const errores = [];

    if (!name || typeof name !== "string" || name.trim().length === 0) {
        errores.push("El nombre es obligatorio");
    }

    if (!image || typeof image !== "string" || image.trim().length === 0) {
        errores.push("La imagen es obligatoria");
    }

    if (!CATEGORIAS_VALIDAS.includes(category)) {
        errores.push(`La categoria debe ser una de: ${CATEGORIAS_VALIDAS.join(", ")}`);
    }

    if (price === undefined || price === null || isNaN(Number(price)) || Number(price) <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    next();
};

export default validateProducto;
