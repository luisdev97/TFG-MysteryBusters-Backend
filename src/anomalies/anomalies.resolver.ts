import { Resolver, Query } from '@nestjs/graphql';
import { AnomaliesService } from './anomalies.service';
import { Anomaly } from './entities/anomaly.entity';

@Resolver('Anomalies')
export class AnomaliesResolver {
    constructor(private readonly anomaliesService: AnomaliesService){}

    @Query(returns => [Anomaly])
    async getAnomalies(){
        console.log("resolver");
        return this.anomaliesService.findAll();
    }
}
