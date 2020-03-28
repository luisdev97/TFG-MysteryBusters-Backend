import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Researcher } from './entities/researcher.entity';
import { Repository } from 'typeorm';
import { ReseartcherInput } from './inputs/ResearcherInput';

@Injectable()
export class ResearchersService {

    constructor(@InjectRepository(Researcher) private readonly researcherRepository: Repository<Researcher>){}

    async findAll(): Promise<Researcher[]> {
        return await this.researcherRepository.find();
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
        console.log(newResearcher);

        return await this.researcherRepository.save(newResearcher);
    }
}
