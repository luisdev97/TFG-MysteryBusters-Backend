import { Resolver, Query, Args, Mutation, ResolveField, Parent, Int } from '@nestjs/graphql';
import { Incident } from '../entities/incident.entity';
import { IncidentsService } from '../services/incidents.service';

@Resolver('Incidents')
export class IncidentsResolver {
        
    constructor(private readonly incidentsService: IncidentsService){}

    @Query(returns => [Incident])
    async getIncidents(): Promise<Incident[]>{
        return this.incidentsService.findAll();
    }


}
