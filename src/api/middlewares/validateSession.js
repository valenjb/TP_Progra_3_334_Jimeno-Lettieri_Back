// Middleware para proteger rutas del panel admin
// Si no hay sesion activa, redirige al login
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
};

export default requireLogin;