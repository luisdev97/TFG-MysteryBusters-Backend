import { Resolver, Query, Args, Mutation, ResolveField, Parent, Int } from '@nestjs/graphql';
import { Incident } from '../entities/incident.entity';
import { IncidentsService } from '../services/incidents.service';
import { Researcher } from 'src/researchers/entities/researcher.entity';
import { ResearchersService } from 'src/researchers/researchers.service';
import { IncidentInput } from '../graphql/inputs/incident.input';
import { UpdateIncidentArgs } from '../constants/types/update-incident-args';
import { Anomaly } from '../entities/anomaly.entity';
import { AnomaliesService } from '../services/anomalies.service';
import { AssignResearcherArgs } from './resolvers_args/incidents/assign_researcher.args';
import { NotFoundException } from '@nestjs/common';

@Resolver('Incident')
export class IncidentsResolver {

    constructor(
        private readonly incidentsService: IncidentsService,
        private readonly researchersService: ResearchersService,
        private readonly anomaliesService: AnomaliesService
    ) { }

    @Query(returns => [Incident])
    async getIncidents(): Promise<Incident[]> {
        return await this.incidentsService.findAll();
    }

    @Query(returns => Incident)
    async getIncident(@Args('id') id: Incident['id']): Promise<Incident> {
        return await this.incidentsService.findOne(id);
    }

    
    
    @ResolveField(returns => Anomaly)
    async belong_to_anomaly(@Parent() { anomaly_id: id }: Incident): Promise<Anomaly> {
        return await this.anomaliesService.findOnE(id);
    }

    @ResolveField(returns => [Researcher])
    async researchers(@Parent() { id } : Incident): Promise<Researcher[]> {
        return await this.incidentsService.findAssignedResearchers(id);
    }


    @Mutation()
    async createIncident(@Args('input') input: IncidentInput) {
        return await this.incidentsService.create(input);
    }

    @Mutation()
    async deleteIncident(@Args('id') id: Incident['id']): Promise<number> {
        return this.incidentsService.delete(id);
    }

    @Mutation()
    async updateIncident(@Args() args: UpdateIncidentArgs): Promise<Incident> {
        const result = await this.incidentsService.update(args);
        return result;
    }

    @Mutation()
    async assignResearcher(@Args() args: AssignResearcherArgs): Promise<string> {
        try{
            await this.incidentsService.assignNewResearcher(args)
            return "OKAY";
        }catch(err){
            throw new NotFoundException(" no se ha agregado nada");
        }

    }

    @Mutation()
    async unsignResearcher(@Args() args: AssignResearcherArgs): Promise<string> {
        try{
            await this.incidentsService.unsignResearcher(args)
            return "OKAY";
        }catch(err){
            throw new NotFoundException("No se ha dado de baja el investigador del incidente");
        }

    }





}
