import { Resolver } from '@nestjs/graphql';
import { AnomaliesService } from './anomalies.service';

@Resolver('Anomalies')
export class AnomaliesResolver {
    constructor(private readonly anomaliesService: AnomaliesService){}

}
