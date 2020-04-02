import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anomaly } from '../entities/anomaly.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AnomalyInput } from '../graphql/inputs/anomaly.input';
import { UpdateAnomalyArgs } from '../constants/types/update-anomaly.args';
import { createObject } from 'src/shared/helpers/AutoAssignFields';

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

    createAnomaly(input: AnomalyInput): Promise<Anomaly>{
        const object: Anomaly = createObject<Anomaly, AnomalyInput>(input);
        return this.anomalyRepository.save(object);    
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
