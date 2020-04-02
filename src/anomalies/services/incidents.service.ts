import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from '../entities/incident.entity';
import { Repository } from 'typeorm';
import { IncidentInput } from '../graphql/inputs/incident.input';
import { Anomaly } from '../entities/anomaly.entity';
import { UpdateIncidentArgs } from '../constants/types/update-incident-args';
import { createObject } from '../../shared/helpers/AutoAssignFields';
import { CreateIncidentInput } from '../../schema.graphql';

@Injectable()
export class IncidentsService {
    constructor(@InjectRepository(Incident) private readonly incidentsRepository: Repository<Incident>){}

    findAll(): Promise<Incident[]>{
        return  this.incidentsRepository.find();
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

    
}
