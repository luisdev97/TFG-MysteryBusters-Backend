import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from '../entities/incident.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IncidentsService {
    constructor(@InjectRepository(Incident) private readonly incidentsRepository: Repository<Incident>){}

    async findAll(){
        return await this.incidentsRepository.find();
    }
    async findAllByAnomaliyId(id: number): Promise<Incident[]>{
        return await this.incidentsRepository.find({ where: { anomalyId: id } });
    }

}
