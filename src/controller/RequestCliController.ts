import { AppDataSource } from "../db/data-source"
import { NextFunction, Request, Response } from "express"
import { Requests_clients } from '../Models/Requests_clients';

export class RequestCliController {

    private Request_ClientsRepository = AppDataSource.getRepository(Requests_clients)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.Request_ClientsRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const requests_clients = await this.Request_ClientsRepository.findOne({
            where: { id }
        })

        if (!requests_clients) {
            return "Requisição não registrada!!!"
        }
        return requests_clients
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id_client, data_abertura, items } = request.body;

        const requests = Object.assign(new Requests_clients(), {
            id_client,  
            data_abertura, 
            items
        })

        return this.Request_ClientsRepository.save(requests)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let requestsToRemove = await this.Request_ClientsRepository.findOneBy({ id })

        if (!requestsToRemove) {
            return "Este cliente não existe!!!"
        }

        await this.Request_ClientsRepository.remove(requestsToRemove)

        return "O cliente foi removido!!!"
    }

}