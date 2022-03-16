import { readdirSync } from "fs";
import express, { Router } from "express";
const router: Router = express.Router();

const PATH_ROUTES = __dirname;

function removeExtension(fileName: string): string {
  const cleanFileName = <string>fileName.split(".").shift();
  return cleanFileName;
}

/**
 *
 * @param file tracks.ts
 */
function loadRouter(file: string): void {
  const name = removeExtension(file);
  if (name !== "index") {

    import(`./${file}`).then((routerModule) => {
        console.log(`Cargando rutan ${name}`);
        //TODO localhost/tracks
        router.use(`/${name}`, routerModule.router);
    });

  }
}

readdirSync(PATH_ROUTES).filter((file) => loadRouter(file));

export default router;
