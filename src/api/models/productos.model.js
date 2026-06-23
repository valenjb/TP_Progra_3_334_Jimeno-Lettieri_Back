import connection from "../database/db.js";

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

export default { getAll };