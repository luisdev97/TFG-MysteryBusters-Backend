import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Researcher } from './entities/researcher.entity';
import { Repository } from 'typeorm';
import { ResearcherInput } from './inputs/ResearcherInput';
import { ResearcherCompetencie as Competencie } from './entities/researcherCompetencie.entity';
import { createObject } from '../shared/helpers/AutoAssignFields';
import { Incident } from 'src/anomalies/entities/incident.entity';

@Injectable()
export class ResearchersService {

    constructor(
        @InjectRepository(Researcher) private readonly researcherRepository: Repository<Researcher>,
        @InjectRepository(Competencie) private readonly competenciesRepository: Repository<Competencie>,
        @InjectRepository(Incident) private readonly incidentsRepository: Repository<Incident>
    ) { }

    findAll(): Promise<Researcher[]> {
        return this.researcherRepository.find();
    }

    findOneById(id: number): Promise<Researcher> {
        return this.researcherRepository.findOne(id)
    }

    createResearcher(input: ResearcherInput): Promise<Researcher> {
        const object: Researcher = createObject<Researcher, ResearcherInput>(input);
        return this.researcherRepository.save(object);
    }

    async findResearcherCompetencies(researcherId: number): Promise<Competencie[]> {
        const result = await this.competenciesRepository
            .createQueryBuilder("researcher_competencies")
            .innerJoin("researcher_competencies.researchers", "researcher")
            .where(`researcher.id = ${researcherId}`)
            .getMany();
        return result;
    }

    async findAssignedIncidents(researcherId: number): Promise<Incident[]> {
        console.log("ss");
        const result = await this.incidentsRepository
            .createQueryBuilder("incident")
            .innerJoin("incident.researchers", "researcher")
            .where(`researcher.id = ${researcherId}`)
            .getMany()
        console.log(result);
        return result;
    }
}
