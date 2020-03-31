import { Resolver, Query, ResolveField, Parent, Mutation, Args } from '@nestjs/graphql';
import { AnomaliesService } from '../services/anomalies.service';
import { Anomaly } from '../entities/anomaly.entity';
import { IncidentsService } from '../services/incidents.service';
import { Incident } from '../entities/incident.entity';
import { thisTypeAnnotation } from '@babel/types';
import { AnomalyInput } from '../graphql/inputs/anomaly.input';
import { Researcher } from '../../researchers/entities/researcher.entity';
import { ResearchersResolver } from 'src/researchers/researchers.resolver';
import { ResearchersService } from '../../researchers/researchers.service';
import { UpdateAnomalyArgs } from '../constants/types/update-anomaly.args';

@Resolver('Anomaly')
export class AnomaliesResolver {
    constructor(
        private readonly anomaliesService: AnomaliesService,
        private readonly incidentsService: IncidentsService,
        private readonly researcherService: ResearchersService
    ) { }

    @Query(returns => [Anomaly])
    async getAnomalies(): Promise<Anomaly[]> {
        return await this.anomaliesService.findAll();
    }

    @Query(returns => Anomaly)
    async getAnomaly(@Args('id') id: number): Promise<Anomaly> {
        return await this.anomaliesService.findOnE(id);
    }

    @ResolveField(returns => [Incident])
    async incidents(@Parent() getAnomalies: Anomaly): Promise<Incident[]> {
        return await this.incidentsService.findAll();
    }


    @ResolveField(returns => Researcher)
    async creator(@Parent() getAnomalies: Anomaly): Promise<Researcher> {
        const { researcher_id } = getAnomalies;
        return await this.researcherService.findOneById(researcher_id);
    }


    @Mutation()
    async createAnomaly(@Args('input') input: AnomalyInput): Promise<Anomaly> {
        const result = await this.anomaliesService.createAnomaly(input);
        return result;
    }

    @Mutation()
    async deleteAnomaly(@Args('id') id: number): Promise<number> {
        return await this.anomaliesService.deleteAnomaly(id);
    }

    @Mutation()
    async updateAnomaly(@Args() args: UpdateAnomalyArgs): Promise<Anomaly> {
        return await this.anomaliesService.updateAnomaly(args);
    }

}
