import connection from "../database/db.js";

async function getProductosByIds(ids) {
    if (ids.length === 0) return [];

    const placeholders = ids.map(() => "?").join(", ");
    const sql = `SELECT * FROM productos WHERE id IN (${placeholders})`;
    const [rows] = await connection.query(sql, ids);
    return rows;
}

// Registra una venta junto con el detalle de productos comprados
// items: [{ producto_id, quantity }]
async function create({ client_name, items }) {
    const productoIds = items.map(item => Number(item.producto_id));
    const productos = await getProductosByIds(productoIds);

    let total = 0;

    // Calculamos el total y el detalle EN EL SERVIDOR, usando el precio
    // que esta en la base de datos en este momento. Nunca confiamos en
    // un precio que venga desde el front (podria haber sido manipulado).
    const detalle = items.map(item => {
        const producto = productos.find(p => p.id === Number(item.producto_id));

        if (!producto) {
            throw new Error(`No existe un producto activo con id ${item.producto_id}`);
        }

        const cantidad = Number(item.quantity);
        const subtotal = Number(producto.price) * cantidad;
        total += subtotal;

        return {
            producto_id: producto.id,
            name: producto.name,
            image: producto.image,
            quantity: cantidad,
            unit_price: producto.price
        };
    });

    const [ventaResult] = await connection.query(
        "INSERT INTO ventas (client_name, total) VALUES (?, ?)",
        [client_name, total]
    );

    const ventaId = ventaResult.insertId;

    for (const linea of detalle) {
        await connection.query(
            "INSERT INTO venta_productos (venta_id, producto_id, quantity, unit_price) VALUES (?, ?, ?, ?)",
            [ventaId, linea.producto_id, linea.quantity, linea.unit_price]
        );
    }

    return {
        id: ventaId,
        client_name,
        total,
        date: new Date(),
        productos: detalle
    };
}

async function getAll() {
    const [rows] = await connection.query("SELECT * FROM ventas ORDER BY date DESC");
    return rows;
}

// Trae una venta junto con el listado de productos asociados (JOIN con la tabla intermedia)
async function getById(id) {
    const [ventaRows] = await connection.query("SELECT * FROM ventas WHERE id = ?", [id]);
    const venta = ventaRows[0];

    if (!venta) return null;

    const sql = `
        SELECT vp.quantity, vp.unit_price, p.id AS producto_id, p.name, p.image
        FROM venta_productos vp
        JOIN productos p ON p.id = vp.producto_id
        WHERE vp.venta_id = ?
    `;
    const [detalle] = await connection.query(sql, [id]);

    return { ...venta, productos: detalle };
}

export default { create, getAll, getById };
