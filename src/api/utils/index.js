//////////////////////////////
// Importamos los modulos para trabajar con rutas

// Convierte una URL de archivo (file://) a una ruta del sistema de archivos
import { fileURLToPath } from "url"; 

// dirname resuelve el directorio padre de una ruta
// join Une segmentos de ruta de forma segura
import { dirname, join } from "path";


// Vamos a obtener el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url); // Proporcionamos la URL del modulo actual y transformamos esa URL de archivo (de nuestro modulo) en una URL de sistema

/*
Pasamos de

import.meta.url
    file:///home/user/proyecto/src/api/utils/index.js

fileURLToPath
    /home/user/proyecto/src/api/utils/index.js
*/

// Obtenemos el directorio del archivo actual
const __dirname = join(dirname(__filename), "../../../");

// Gracias a esto, podremos construir rutas relativas desde la raiz de nuestro servidor
export {
    __dirname,
    join
}
