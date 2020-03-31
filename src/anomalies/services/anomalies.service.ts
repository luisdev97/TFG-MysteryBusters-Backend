import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anomaly } from '../entities/anomaly.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AnomalyInput } from '../graphql/inputs/anomaly.input';
import { UpdateAnomalyArgs } from '../constants/types/update-anomaly.args';

@Injectable()
export class AnomaliesService {
    constructor(@InjectRepository(Anomaly) private readonly anomalyRepository: Repository<Anomaly>){}

    findAll(): Promise<Anomaly[]>{
        return this.anomalyRepository.find();
    }

    findOnE(id: number): Promise<Anomaly>{
        return this.anomalyRepository.findOne(id);
    }

    findAllAnomalyPostedByResearcher(id: number): Promise<Anomaly[]> {
        return this.anomalyRepository.find({ where: { researcher_id: id}});
    }

    createAnomaly(anomaly: AnomalyInput): Promise<Anomaly>{
        let newAnomaly = new Anomaly();
        newAnomaly.researcher_id = anomaly.researcher_id;
        newAnomaly.type = anomaly.type;
        newAnomaly.description = anomaly.description;
        return this.anomalyRepository.save(newAnomaly);
    }


    async deleteAnomaly(id: number){
        const result = await this.anomalyRepository.delete(id)
        return result.affected;
    }
    
    //args: UpdateAnomalyArgs
    async updateAnomaly({ id, input }: UpdateAnomalyArgs): Promise<Anomaly>{
        const actualAnomaly = await this.anomalyRepository.findOne(id);
        return this.anomalyRepository.save({...actualAnomaly, ...input });;
    }


  
}
