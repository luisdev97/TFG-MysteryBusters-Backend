import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Researcher } from './entities/researcher.entity';
import { Repository } from 'typeorm';
import { ReseartcherInput } from './inputs/ResearcherInput';
import { ResearcherCompetencie } from './entities/researcherCompetencie.entity';

@Injectable()
export class ResearchersService {

    constructor(
        @InjectRepository(Researcher) private readonly researcherRepository: Repository<Researcher>,
        /*@InjectRepository(ResearcherCompetencie) private readonly competencieRepository: Repository<ResearcherCompetencie>*/
    ){}

    async findAll(): Promise<Researcher[]> {
        return await this.researcherRepository.find({ relations: ["competencies"] });
    }

    async findOneById(id: number): Promise<Researcher> {
        return await this.researcherRepository.findOne({ where: { id }, relations: ["competencies"] })
    }

    async createResearcher(researcher: ReseartcherInput): Promise<Researcher> {
        let newResearcher = new Researcher()
        const { firstname, lastname, username, email, password, age} = researcher;
        newResearcher.firstname = firstname;
        newResearcher.lastname = lastname;
        newResearcher.username = username
        newResearcher.age = age;
        newResearcher.email = email;
        newResearcher.password = password;
        return await this.researcherRepository.save(newResearcher);
    }

    /*async findResearcherCompetencies(idResarcher: number): Promise<ResearcherCompetencie[]> {
        return this.competencieRepository.find();
    }*/
}
