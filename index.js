import express from "express";
import cors from "cors";
import session from "express-session";
import environments from "./src/api/config/environments.js";
import { productosRoutes, ventasRoutes, authRoutes, viewRoutes } from "./src/api/routes/index.routes.js";
import { join, __dirname } from "./src/api/utils/index.js";

const app = express();
const { port, session_key } = environments;
const PORT = port;

// ---------- Configuracion de vistas EJS ----------
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

// ---------- Middlewares ----------
app.use(cors());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "src/public")));

app.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: true
}));

// ---------- Rutas ----------
app.get("/", (req, res) => {
    res.send("API de LVTech funcionando correctamente");
});

// app.use("/api", apiRoutes);
// app.use("/dashboard", viewRoutes);
// app.use("/login", authRoutes);

app.use("/api/productos", productosRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/dashboard", viewRoutes);
app.use("/login", authRoutes);    

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});