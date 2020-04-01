import { Resolver, Query, Args, Mutation, ResolveField, Parent, Int } from '@nestjs/graphql';
import { Incident } from '../entities/incident.entity';
import { IncidentsService } from '../services/incidents.service';
import { Researcher } from 'src/researchers/entities/researcher.entity';
import { ResearchersService } from 'src/researchers/researchers.service';
import { IncidentInput } from '../graphql/inputs/incident.input';

@Resolver('Incident')
export class IncidentsResolver {
        
    constructor(
        private readonly incidentsService: IncidentsService,
        private readonly researchersService: ResearchersService
    ){}

    @Query(returns => [Incident])
    async getIncidents(): Promise<Incident[]>{
        return await this.incidentsService.findAll();
    }

    @Query(returns => Incident)
    async getIncident(@Args('id') id: Incident['id']): Promise<Incident>{
        return await this.incidentsService.findOne(id);
    }

    @ResolveField(returns => [Researcher])
    async assigned_researchers(@Parent() getIncidents: Incident): Promise<Researcher[]> {
        const { id } = getIncidents;
        return await this.researchersService.findAssignedResearcherToAIncident(id);
    }

    @Mutation()
    async createIncident(@Args('input') input: IncidentInput){
        return await this.incidentsService.create(input);
    }

    @Mutation()
    async deleteIncident(@Args('id') id: Incident['id']): Promise<number> {
        return this.incidentsService.deleteIncident(id);
    }
    
    
  
}
