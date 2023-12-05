import { AppDataSource } from "../db/data-source"
import { NextFunction, Request, Response } from "express"
import { Address } from '../Models/Address';

export class ClientController {

    private AddressRepository = AppDataSource.getRepository(Address)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.AddressRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const address = await this.AddressRepository.findOne({
            where: { id }
        })

        if (!address) {
            return "Endereço não registrado!!!"
        }
        return address
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { cep, logradouro, numero, complemento, bairro, cidade, uf} = request.body;

        const address = Object.assign(new Address(), {
            cep, 
            logradouro, 
            numero, 
            complemento, 
            bairro,     
            cidade,     
            uf, 
        })

        return this.AddressRepository.save(address)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let addressToRemove = await this.AddressRepository.findOneBy({ id })

        if (!addressToRemove) {
            return "Este endereço não existe!!!"
        }

        await this.AddressRepository.remove(addressToRemove)

        return "O endereço foi removido!!!"
    }

}