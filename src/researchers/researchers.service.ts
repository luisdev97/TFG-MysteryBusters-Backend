import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Researcher } from './entities/researcher.entity';
import { Repository } from 'typeorm';
import { ResearcherInput } from './inputs/ResearcherInput';
import { ResearcherCompetencie as Competencie } from './entities/researcherCompetencie.entity';

@Injectable()
export class ResearchersService {

    constructor(
        @InjectRepository(Researcher) private readonly researcherRepository: Repository<Researcher>,
        @InjectRepository(Competencie) private readonly competenciesRepository: Repository<Competencie>
    ){}

    findAll(): Promise<Researcher[]> {
        return this.researcherRepository.find();
    }

    findOneById(id: number): Promise<Researcher> {
        return this.researcherRepository.findOne(id)
    }

    findAssignedResearcherToAIncident(id: number): Promise<Researcher[]> {
        return this.researcherRepository.find({ where: { id }})
    }

    createResearcher(researcher: ResearcherInput): Promise<Researcher> {
        let newResearcher = new Researcher()
        const { firstname, lastname, username, email, password, age} = researcher;
        newResearcher.firstname = firstname;
        newResearcher.lastname = lastname;
        newResearcher.username = username
        newResearcher.age = age;
        newResearcher.email = email;
        newResearcher.password = password;
        return this.researcherRepository.save(newResearcher);
    }

    findResearcherCompetencies(id: number): Promise<Competencie[]> {
        return this.competenciesRepository.find({ where: { researcherCompetenciesId: id}});
    }
}
