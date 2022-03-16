import { Request, Response } from "express";
import tracksModel from "../models/tracks"

async function getItems(req: Request, res: Response): Promise<void> {
    try {
        const data = await tracksModel.findAllData();
        res.send({ data });
      } catch (e) {
        res.status(500)
        res.send({error:'ERROR_GET_ITEMS'})
      }
}


async function getItem(req: Request, res: Response):Promise<void> {
  try {
    const data = await tracksModel.findOne();
    res.send({ data });
  } catch (e) {
    res.status(500)
    res.send({error:'ERROR_GET_ITEMS'})
  }
}
export { getItems, getItem };
