/*===============================
    Controladores de vistas
================================*/

import productosModel from "../models/productos.model.js";

// Vista index - muestra todos los productos
export const indexView = async (req, res) => {
    try {
        const resultado = await productosModel.getAll({ onlyActive: false,  limit: 100});

        res.render("index", {
            title: "Dashboard · LVTech Admin",
            about: "Todos los productos",
            productos: resultado.data
        });

    } catch (error) {
        console.log(error);
    }
};

// Vista GET - consultar producto por id
export const getView = (req, res) => {
    res.render("get", {
        title: "Consultar · LVTech Admin",
        about: "Consultar producto por id"
    });
};

// Vista POST - crear producto
export const createView = (req, res) => {
    res.render("post", {
        title: "Crear · LVTech Admin",
        about: "Crear producto"
    });
};

// Vista PUT - modificar producto
export const updateView = (req, res) => {
    res.render("put", {
        title: "Modificar · LVTech Admin",
        about: "Modificar producto"
    });
};

// Vista DELETE - desactivar producto
export const deleteView = (req, res) => {
    res.render("delete", {
        title: "Desactivar · LVTech Admin",
        about: "Desactivar / Reactivar producto"
    });
};