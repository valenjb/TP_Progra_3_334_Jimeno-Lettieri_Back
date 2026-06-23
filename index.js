
import express from "express";
import cors from "cors";
import environments from "./src/api/config/environments.js";
import apiRoutes from "./src/api/routes/index.routes.js";


const app = express();
const PORT = environments.port;


// Middlewares
app.use(cors()); 

// Logger por consola de cada solicitud
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());


// Endpoints
app.get("/", (req, res) => {
    res.send("API de ByteStop funcionando correctamente");
});

// Todas las rutas de la API quedan agrupadas bajo /api
app.use("/api", apiRoutes);

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
