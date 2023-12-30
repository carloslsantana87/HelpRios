import { AppDataSource } from "../db/data-source"
import { NextFunction, Request, Response } from "express"
import { Client } from '../Models/Client';
import { Client } from '../';
import * as nodemailer from 'nodemailer';

export class ClientController {

    private ClientRepository = AppDataSource.getRepository(Client)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.ClientRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const client = await this.ClientRepository.findOne({
            where: { id }
        })

        if (!client) {
            return "Cliente não registrado!!!"
        }
        return client
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const { id,tipo, cpf, cnpj, email, nome_razao, nome_responsavel, fone_responsavel, nome_contato_1, fone_contato_1, nome_contato_2, fone_contato_2, clisystem, clientAd} = request.body;

        const client = Object.assign(new Client(), {
            id,
            tipo, 
            cpf, 
            cnpj, 
            nome_razao, 
            email, 
            nome_responsavel,     
            fone_responsavel, 
            nome_contato_1, 
            fone_contato_1,     
            nome_contato_2,     
            fone_contato_2,
            clientAd,
            clisystem,   
        })

        transporter.sendMail({
            from: "Info Rio - HelpRio <fapsoftexprojetohelpdesk@gmail.com>",
            to: email,
            subject: "Cadastro de Cliente - Info Rio",
            text: `Você fez o seu cadastro na Info RIo.
                   Seus dados foram cadastrados:  
                   Tipo: ${tipo}
                   Numero do cliente: ${id}
                   Nome do cliente: ${nome_razao}
                   cpf: ${cpf}
                   cnpj:${cnpj}
                   Endereço: ${clientAd}
                   Sistemas Contratados: ${clisystem}`
        }).then(message => {
            console.log(message)
        }).catch(err => {
            console.log(err);
        });

        return this.ClientRepository.save(client);
        //await this.ClientRepository.save(client);

    };


    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const { tipo, cpf, cnpj, email, nome_razao, nome_responsavel, fone_responsavel, nome_contato_1, fone_contato_1, nome_contato_2, fone_contato_2, clisystem, clientAd } = request.body;

        const findClient = await this.ClientRepository.findOneBy({ id });

        if (!findClient) {
            return "Cliente não encontrado!";
        }

        const CliSytemAd = Object.assign(findClient, clisystem, clientAd  )

        CliSytemAd.tipo = tipo;
        CliSytemAd.cpf = cpf;
        CliSytemAd.cnpj = cnpj;
        CliSytemAd.nome_razao = nome_razao;
        CliSytemAd.email = email;
        CliSytemAd.nome_responsavel = nome_responsavel; 
        CliSytemAd.fone_responsavel = fone_responsavel;
        CliSytemAd.nome_contato_1 = nome_contato_1;
        CliSytemAd.fone_contato_1 = fone_contato_1;
        CliSytemAd.nome_contato_2 = nome_contato_2;
        CliSytemAd.fone_contato_1 = fone_contato_2;
        CliSytemAd.clisystem = clisystem;
        CliSytemAd.clientAd = clientAd;

        await this.ClientRepository.save(CliSytemAd);

        return "Cliente atualizado com sucesso!";
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let clientToRemove = await this.ClientRepository.findOneBy({ id })

        if (!clientToRemove) {
            return "Este cliente não existe!!!"
        }

        await this.ClientRepository.remove(clientToRemove)

        return "O cliente foi removido!!!"
    }

}