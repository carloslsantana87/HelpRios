//import * as express from "express"
import express from 'express'
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from '../src/db/data-source';
import { Routes } from "../src/Routes/Requests_clients_routes"
import { Requests_clients } from "../src/Models/Requests_clients"
import { Request_items} from "../src/Models/Request_items"


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
    app.listen(8080)

    const item1 = new Request_items()
          item1.id_system = 1;
          await AppDataSource.manager.save(item1);
    
    const item2 = new Request_items()
          item2.id_system = 3;
          await AppDataSource.manager.save(item2);
    
    await AppDataSource.manager.save(
        AppDataSource.manager.create(Requests_clients, { 
            
            
            id_client: 1,  
            data_abertura: "02/12/2023", 
            ocorrencia: "NÃO EMITE NOTA FISCAL",  
            items: [item1,item2]

            
        })
    )

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
