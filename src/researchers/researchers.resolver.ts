import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ResearchersService } from './researchers.service';

@Resolver('Researcher')
export class ResearchersResolver {

    constructor(private readonly researchersService: ResearchersService){}

    @Query()
    async getResearchers(){
        return this.researchersService.findAll();
    }
 

    @Mutation()
    async createResearcher(@Args('input') input: any){
        
    }
}
