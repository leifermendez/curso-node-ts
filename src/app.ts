import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import openApiConfiguration from "./docs/swagger";
import dbConnectNoSql from "./config/mongo";
import routes from "./routes";

const app = express();

const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const port = process.env.PORT || 3000;
/**
 * Definir ruta de documentación
 */

app.use(
  "/documentation",
  swaggerUI.serve,
  swaggerUI.setup(openApiConfiguration)
);

// /**
//  * Aqui invocamos a las rutas! 😎
//  */
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Lista por el puerto ${port}`);
});

dbConnectNoSql().then(() => {
  console.log("Conexion es correcta!");
});

export default app;
