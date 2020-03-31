import { Resolver, Query, Args, Mutation, ResolveField, Parent, Int } from '@nestjs/graphql';
import { Incident } from '../entities/incident.entity';
import { IncidentsService } from '../services/incidents.service';
import { Researcher } from 'src/researchers/entities/researcher.entity';
import { ResearchersService } from 'src/researchers/researchers.service';

@Resolver('Incident')
export class IncidentsResolver {
        
    constructor(
        private readonly incidentsService: IncidentsService,
        private readonly researchersService: ResearchersService
    ){}

    @Query(returns => [Incident])
    async getIncidents(): Promise<Incident[]>{
        return this.incidentsService.findAll();
    }

    @ResolveField(returns => [Researcher])
    async assigned_researchers(@Parent() getIncidents: Incident): Promise<Researcher[]> {
        const { id } = getIncidents;
        return await this.researchersService.findAssignedResearcherToAIncident(id);
    }
    
}
