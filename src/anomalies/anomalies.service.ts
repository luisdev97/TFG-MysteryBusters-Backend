import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anomaly } from './entities/anomaly.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnomaliesService {
    constructor(@InjectRepository(Anomaly) private readonly anomalyRepository: Repository<Anomaly>){}
}
