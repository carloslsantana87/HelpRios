import { AppDataSource } from "../db/data-source"
import { NextFunction, Request, Response } from "express"
import { Technicians } from '../Models/technicians';
import { Addresstech } from '../Models/Adresstech';





export class techniciansController {

    private techniciansRepository = AppDataSource.getRepository(Technicians)
    private adresstechRepository = AppDataSource.getRepository(Addresstech)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.techniciansRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const technicians = await this.techniciansRepository.findOne({
            where: { id }
        })

        if (!technicians) {
            return "Técnico não registrado!!!"
        }
        return technicians
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const { nome, cpf, techAd } = request.body;

        const items = Object.assign(new Technicians(), { 
            nome, 
	        cpf, 
            techAd,
	       
        })

        return this.techniciansRepository.save(items)
    }

    /*async update(request: Request, response: Response, next: NextFunction) {
        const  id  = parseInt(request.params.id);
        const { nome, cpf, techAd, cep, logradouro, numero, complemento, bairro, cidade, uf, fone_contato } = request.body;
       
        const findTech = await this.techniciansRepository.findOneBy({id});
        const findAdress = await this.adresstechRepository.findOneBy({ techAd: [{id}] });
       

        if (!findTech) {
            return "Técnico não encontrado!";
        }

        findAdress.cep = cep,
        findAdress.logradouro = logradouro,
        findAdress.numero = numero,
        findAdress.complemento = complemento,
        findAdress.bairro = bairro,
        findAdress.cidade = cidade,
        findAdress.uf = uf,
        findAdress.fone_contato = fone_contato    

        findTech.nome = nome;
        findTech.cpf = cpf;
        findTech.techAd = techAd;
       
       
        findAdress.cep = cep,
        findAdress.logradouro = logradouro,
        findAdress.numero = numero,
        findAdress.complemento = complemento,
        findAdress.bairro = bairro,
        findAdress.cidade = cidade,
        findAdress.uf = uf,
        findAdress.fone_contato = fone_contato      
      
        await this.techniciansRepository.save(findTech);
       

        return "Dado (s) do ténico atualizado com sucesso!";

    }*/

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const { nome, cpf, techAds } = request.body;
    
        try {
          // Encontrar o técnico existente com as relações
          const technician = await this.techniciansRepository.findOneBy( { id });
    
          if (!technician) {
            return response.status(404).json({ message: 'Técnico não encontrado!' });
          }
    
          // Atualizar os campos do técnico
          technician.nome = nome;
          technician.cpf = cpf;
    
          // Limpar as relações existentes (opcional, dependendo dos requisitos)
          technician.techAd.forEach(async techAd => {
            await this.adresstechRepository.remove(techAd);
          });
    
          // Adicionar as novas relações
          if (techAds && techAds.length > 0) {
            techAds.forEach(async techAdData => {
              const newTechAd = new Addresstech();
              newTechAd.cep = techAdData.cep;
              // Outras atribuições para TechAd, se necessário
              technician.techAd.push(newTechAd);
            });
          }
    
          // Salvar as alterações no banco de dados
          await this.techniciansRepository.save(technician);
    
          return response.status(200).json({ message: 'Técnico atualizado com sucesso!' });
        } catch (error) {
          console.error('Erro ao atualizar o técnico:', error);
          return response.status(500).json({ message: 'Erro interno do servidor.' });
        }
      }
    

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let techniciansToRemove = await this.techniciansRepository.findOneBy({ id })

        if (!techniciansToRemove) {
            return "Este técnico não existe!!!"
        }

        await this.techniciansRepository.remove(techniciansToRemove)

        return "O técnico foi removido!!!"
    }

}