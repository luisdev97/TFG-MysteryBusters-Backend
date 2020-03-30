import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anomaly } from '../entities/anomaly.entity';
import { Repository } from 'typeorm';
import { AnomalyInput } from '../graphql/inputs/anomaly.input';

@Injectable()
export class AnomaliesService {
    constructor(@InjectRepository(Anomaly) private readonly anomalyRepository: Repository<Anomaly>){}

    async findAll(){
        return await this.anomalyRepository.find();
    }

    async createAnomaly(anomaly: AnomalyInput): Promise<Anomaly>{
        let newAnomaly = new Anomaly();
        newAnomaly.researcher_id = anomaly.researcher_id;
        newAnomaly.type = anomaly.type;
        newAnomaly.description = anomaly.description;
        return await this.anomalyRepository.save(newAnomaly);
    }


    async deleteAnomaly(id: number){
        const result = await this.anomalyRepository.delete(id)
        return result.affected;
    }


  
}
