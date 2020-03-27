import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Researcher } from './entities/researcher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResearchersService {

    constructor(@InjectRepository(Researcher) private readonly researcherRepository: Repository<Researcher>){}

    async findAll(): Promise<Researcher[]> {
        return await this.researcherRepository.find();
    }
}
