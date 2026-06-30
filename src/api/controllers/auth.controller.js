/*===================================
    Controladores de autenticacion
===================================*/

import connection from "../database/db.js";

// Vista Login
export const loginView = (req, res) => {
    res.render("login", {
        title: "Login · LVTech Admin",
        about: "Ingresá tu email y contraseña"
    });
};

// POST Login
export const getAdminUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login", {
                title: "Login · LVTech Admin",
                about: "Ingresá tu email y contraseña",
                error: "Todos los campos son obligatorios"
            });
        }

        const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
        const [rows] = await connection.query(sql, [email, password]);

        if (rows.length === 0) {
            return res.render("login", {
                title: "Login · LVTech Admin",
                about: "Ingresá tu email y contraseña",
                error: "Credenciales incorrectas"
            });
        }

        const user = rows[0];

        req.session.user = {
            id: user.id,
            nombre: user.nombre,
            email: user.email
        };

        res.redirect("/dashboard/index");

    } catch (error) {
        console.log(error);
    }
};