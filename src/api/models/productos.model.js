import connection from "../database/db.js";

// Trae productos con filtros opcionales por categoria/subcategoria y paginacion
async function getAll({ category, page = 1, limit = 8, onlyActive = true } = {}) {
    const condiciones = [];
    const params = [];

    if (onlyActive) {
        condiciones.push("active = 1");
    }

    if (category) {
        condiciones.push("category = ?");
        params.push(category);
    }

    const where = condiciones.length > 0 ? `WHERE ${condiciones.join(" AND ")}` : "";

    // Contamos el total para poder calcular cuantas paginas hay
    const [countRows] = await connection.query(
        `SELECT COUNT(*) AS total FROM productos ${where}`,
        params
    );
    const total = countRows[0].total;

    const limitNum = Number(limit) || 8;
    const pageNum = Number(page) || 1;
    const offset = (pageNum - 1) * limitNum;

    const [rows] = await connection.query(
        `SELECT * FROM productos ${where} ORDER BY id ASC LIMIT ? OFFSET ?`,
        [...params, limitNum, offset]
    );

    return {
        data: rows,
        pagination: {
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.max(1, Math.ceil(total / limitNum))
        }
    };
}

async function getById(id) {
    const sql = "SELECT * FROM productos WHERE id = ?";
    const [rows] = await connection.query(sql, [id]);
    return rows[0];
}

async function create(data) {
    const { name, description, image, category, price } = data;

    const sql = `
        INSERT INTO productos (name, description, image, category, price, active)
        VALUES (?, ?, ?, ?, ?, 1)
    `;

    const [result] = await connection.query(sql, [
        name,
        description || null,
        image,
        category,
        price
    ]);

    return result.insertId;
}

async function update(id, data) {
    const { name, description, image, category, price } = data;

    const sql = `
        UPDATE productos
        SET name = ?, description = ?, image = ?, category = ?, price = ?
        WHERE id = ?
    `;

    await connection.query(sql, [
        name,
        description || null,
        image,
        category,
        price,
        id
    ]);
}

// Baja logica / reactivacion (no borramos filas, solo cambiamos el flag active)
async function setActive(id, active) {
    const sql = "UPDATE productos SET active = ? WHERE id = ?";
    await connection.query(sql, [active ? 1 : 0, id]);
}

export default { getAll, getById, create, update, setActive };
