import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from '../entities/incident.entity';
import { Repository, createQueryBuilder, SelectQueryBuilder } from 'typeorm';
import { IncidentInput } from '../graphql/inputs/incident.input';
import { UpdateIncidentArgs } from '../constants/types/update-incident-args';
import { createObject } from '../../shared/helpers/AutoAssignFields';
import { Researcher } from '../../researchers/entities/researcher.entity';
import { AssignResearcherArgs } from '../resolvers/resolvers_args/incidents/assign_researcher.args';
import { PaginateIncidentsArgs } from '../constants/types/paginate-incidents.args';

@Injectable()
export class IncidentsService {
    constructor(
        @InjectRepository(Incident) private readonly incidentsRepository: Repository<Incident>,
        @InjectRepository(Researcher) private readonly researcherRepository: Repository<Researcher>
    ) { }






    findAll(paginate: PaginateIncidentsArgs = null): Promise<Incident[]> {
        if (!paginate)
            return this.incidentsRepository.find();

        return this.incidentsRepository
            .createQueryBuilder("incidents")
            .skip(paginate.offset)
            .take(paginate.limit)
            .orderBy("id", "DESC")
            .getMany()

    }






    findOne(id: number): Promise<Incident> {
        return this.incidentsRepository.findOne(id);
    }

    findAllByAnomaliyId(id: number): Promise<Incident[]> {
        return this.incidentsRepository.find({ where: { anomalyId: id } });
    }

    create(input: IncidentInput): Promise<Incident> {
        const object: Incident = createObject<Incident, IncidentInput>(input);
        return this.incidentsRepository.save(object);
    }

    async delete(id: Incident['id']): Promise<number> {
        const result = await this.incidentsRepository.delete(id);
        return result.affected;
    }

    async update({ id, input }: UpdateIncidentArgs) {
        const actualyIncident: Incident = await this.incidentsRepository.findOne(id);
        return this.incidentsRepository.save({ ...actualyIncident, ...input });
    }

    async findAssignedResearchers(id: number): Promise<Researcher[]> {
        return this.researcherRepository  // repositorio de lo que quieres obtener
        .createQueryBuilder("researcher") // tabla de la que quieres obtener cosas
        .innerJoin("researcher.assigned_incidents", "incident")
        .where(`incident.id = ${id}`)
        .getMany();
    }

    async assignNewResearcher({ incident_id, researcher_id }: AssignResearcherArgs) {
        const incident = await this.incidentsRepository.findOne(incident_id, { relations: ["researchers"] });
        const researcher = await this.researcherRepository.findOne(researcher_id);
        incident.researchers.push(researcher);
        return this.incidentsRepository.save(incident);
    }

    async unsignResearcher({ incident_id, researcher_id }: AssignResearcherArgs) {
        const incident = await this.incidentsRepository.findOne(incident_id, { relations: ["researchers"] });
        incident.researchers = incident.researchers.filter(researcher => {
            return researcher.id != researcher_id;
        });
        return this.incidentsRepository.save(incident);
    }
}
