import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from '../entities/incident.entity';
import { Repository, createQueryBuilder } from 'typeorm';
import { IncidentInput } from '../graphql/inputs/incident.input';
import { UpdateIncidentArgs } from '../constants/types/update-incident-args';
import { createObject } from '../../shared/helpers/AutoAssignFields';
import { CreateIncidentInput } from '../../schema.graphql';
import { ResearchersService } from '../../researchers/researchers.service';
import { Researcher } from '../../researchers/entities/researcher.entity';

@Injectable()
export class IncidentsService {
    constructor(
        @InjectRepository(Incident) private readonly incidentsRepository: Repository<Incident>,
        @InjectRepository(Researcher) private readonly researcherRepository: Repository<Researcher>
    ){}

    findAll(): Promise<Incident[]>{
        return  this.incidentsRepository.find(/*{ relations: ["researchers"]}*/);
    }

    findOne(id: number): Promise<Incident> {
        return this.incidentsRepository.findOne(id);
    }
    
    findAllByAnomaliyId(id: number): Promise<Incident[]>{
        return this.incidentsRepository.find({ where: { anomalyId: id } });
    }
    
    create(input: IncidentInput): Promise<Incident> {
        const object: Incident = createObject<Incident, IncidentInput>(input);
        return this.incidentsRepository.save(object);
    }

    async delete(id: Incident['id']): Promise<number> {
        const result = await this.incidentsRepository.delete(id);
        return result.affected;
    }

    async update({ id, input} : UpdateIncidentArgs){
        const actualyIncident: Incident = await this.incidentsRepository.findOne(id);
        return this.incidentsRepository.save({...actualyIncident, ...input});
    }

    async findAssignedResearchers(id: number): Promise<Researcher[]> {
       
    const result = await this.researcherRepository  // repositorio de lo que quieres obtener
        .createQueryBuilder("researcher") // tabla de la que quieres obtener cosas
        .innerJoin("researcher.incidents", "incident")
        .where(`incident.id = ${id}`)
        .getMany();
        console.log(result);  
    return result ;
    }

/*const result = await this.competenciesRepository // repositorio de lo que quieres obtener
            .createQueryBuilder("researcher_competencies") // tabla de la que quieres obtener cosas
            .innerJoin("researcher_competencies.researchers", "researcher") 
            .where(`researcher.id = ${id}`)
            .getMany();
        return result;
}*/

 /*aconst result = await createQueryBuilder("user")
 .innerJoin("user.photos", "photo")
 .where("user.name = :name", { name: "Timber" })
 .getOne();
 console.log(result); 
}*/

}
