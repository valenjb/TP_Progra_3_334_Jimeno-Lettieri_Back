/*===================================
    Controladores de autenticacion
===================================*/

import connection from "../database/db.js";

import bcrypt from "bcrypt";

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

        // SIN BCRYPT
        // const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
        // const [rows] = await connection.query(sql, [email, password]);

        const sql = "SELECT * FROM usuarios WHERE email = ?";
        const [rows] = await connection.query(sql, [email]);

        if (rows.length === 0) {
            return res.render("login", {
                title: "Login · LVTech Admin",
                about: "Ingresá tu email y contraseña",
                error: "Credenciales incorrectas"
            });
        }

        const user = rows[0];

        console.table(user);
        console.table(password);

        const match = await bcrypt.compare(password, user.password);
        console.log(match);
        // Hasheamos la clave en "https://bcrypt-generator.com/"

        if (match) {
            req.session.user = {
                id: user.id,
                nombre: user.nombre,
                email: user.email
            };

            return res.redirect("/dashboard/index");

        } else {
            return res.render("login", {
                title: "Login · LVTech Admin",
                about: "Ingresá tu email y contraseña",
                error: "Credenciales incorrectas"
            });

        }
    } catch (error) {
        console.log(error);
    }
};

// POST logout
export const destroySession = (req, res) => {
    req.session.destroy((err) => {

        // Si hubiera algun error, mandamos un aviso por consola y por un alert y retornamos un error 500
        if (err) {
            console.error("Error al destruir la sesion: ", err);
            alert("Error al destruir la sesion: ", err);

            return res.status(500).json({
                message: "Error al cerrar sesion"
            })
        }

        // Si no existiera ningun error, redirigimos a la pagina de login
        res.redirect("/login");
    })
}