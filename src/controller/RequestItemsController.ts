import { AppDataSource } from "../db/data-source"
import { NextFunction, Request, Response } from "express"
import { Request_items } from '../Models/Request_items';

export class RequestItemsController {

    private Request_ItemsRepository = AppDataSource.getRepository(Request_items)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.Request_ItemsRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const requests_items = await this.Request_ItemsRepository.findOne({
            where: { id }
        })

        if (!requests_items) {
            return "Item não registrado!!!"
        }
        return requests_items
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id_system, ocorrencia, requis } = request.body;

        const items = Object.assign(new Request_items(), {
            id_system, 
            ocorrencia,
            requis
        })

        return this.Request_ItemsRepository.save(items)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let itemsToRemove = await this.Request_ItemsRepository.findOneBy({ id })

        if (!itemsToRemove) {
            return "Este item não existe!!!"
        }

        await this.Request_ItemsRepository.remove(itemsToRemove)

        return "O item foi removido!!!"
    }

}