import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Researcher } from './entities/researcher.entity';
import { Repository } from 'typeorm';
import { ResearcherInput } from './inputs/ResearcherInput';
import { ResearcherCompetencie as Competencie } from './entities/researcherCompetencie.entity';
import { createObject } from '../shared/helpers/AutoAssignFields';
import { Incident } from 'src/anomalies/entities/incident.entity';
const bcrypt = require('bcrypt')


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
        object.password = bcrypt.hashSync(object.password, 10)
        return this.researcherRepository.save(object);
    }

    findResearcherCompetencies(researcherId: number): Promise<Competencie[]> {
        return this.competenciesRepository
        .createQueryBuilder("researcher_competencies")
        .innerJoin("researcher_competencies.researchers", "researcher")
        .where(`researcher.id = ${researcherId}`)
        .getMany();;
    }

    findAssignedIncidents(researcherId: number): Promise<Incident[]> {   
        return this.incidentsRepository
        .createQueryBuilder("incident")
        .innerJoin("incident.researchers", "researcher")
        .where(`researcher.id = ${researcherId}`)
        .getMany();
    }
}
