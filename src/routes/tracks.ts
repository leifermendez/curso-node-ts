import express from "express";
const router = express.Router();
import { getItems } from "../controllers/tracks";

/**
 * Get all tracks
 * @openapi
 * /tracks:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Listar canciones"
 *      description: Obten todas las listas de las canciones
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la listas de las canciones.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/track'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", getItems);

export {router};
