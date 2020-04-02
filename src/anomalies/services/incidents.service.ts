import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from '../entities/incident.entity';
import { Repository } from 'typeorm';
import { IncidentInput } from '../graphql/inputs/incident.input';
import { Anomaly } from '../entities/anomaly.entity';
import { UpdateIncidentArgs } from '../constants/types/update-incident-args';

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
        const { description, location, maxResearchers, date, time, anomaly_id } = input;
        let newIncident = new Incident()
        newIncident.description = description;
        newIncident.location = location;
        newIncident.date = date;
        newIncident.time = time;
        newIncident.maxResearchers = maxResearchers;
        newIncident.anomaly_id = anomaly_id;
        return this.incidentsRepository.save(newIncident);
    }

    async delete(id: Incident['id']): Promise<number> {
        const result = await this.incidentsRepository.delete(id);
        return result.affected;
    }

    async update({ id, input} : UpdateIncidentArgs){
        const { description, location, maxResearchers, date, time } = input;
        const actualyIncident: Incident = await this.incidentsRepository.findOne(id);
        actualyIncident.description = description;
        actualyIncident.location = location;
        actualyIncident.date = date;
        actualyIncident.time = time;
        actualyIncident.maxResearchers = maxResearchers;
        return this.incidentsRepository.save({...actualyIncident, ...input});
    }
}
