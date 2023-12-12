//import * as express from "express"
import express from 'express'
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "../src/db/data-source"
import { Routes } from "../src/Routes/Clientroutes"
import { Client } from "../src/Models/Client"
import { Client_Systems } from "../src/Models/Client_systems"


AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    const item1 = new Client_Systems()
          item1.nome = "SISTEMA CONTÁBIL";  
          item1.descricao = "SOLUÇÃO PARA CONTABILIDADE"; 
          await AppDataSource.manager.save(item1);
    
    const item2 = new Client_Systems()
          item2.nome = "SISTEMA FISCAL";  
          item2.descricao = "SOLUÇÃO PARA EMPRESAS"; 
          await AppDataSource.manager.save(item2);

    // insert new users for test
    await AppDataSource.manager.save(
        AppDataSource.manager.create(Client, {
            tipo: "PESSOA JURIDICA", 
            cpf: 2187324495, 
            cnpj: 0, 
            nome_razao: "CARLOS LUIZ DE SANTANA", 
            email: "carloslsantana87@gmail.com",
            cep: 50770500, 
            logradouro: "RUA FRANCISCO PORFIRIO",
            numero: 175,   
            complemento: "APT 305", 
            bairro: "AFOGADOS",     
            cidade: "RECIFE", 
            uf: "UF",     
            nome_responsavel: "CARLOS LUIZ DE SANTANA",     
            fone_responsavel: "81-98403-0906", 
            nome_contato_1: "", 
            fone_contato_1: "",     
            nome_contato_2: "",     
            fone_contato_2: "",
            clisystem:[item1,item2] 
            
        })
    )

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
