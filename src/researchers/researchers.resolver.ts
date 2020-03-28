import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ResearchersService } from './researchers.service';
import { ReseartcherInput } from './inputs/ResearcherInput';

@Resolver('Researcher')
export class ResearchersResolver {

    constructor(private readonly researchersService: ResearchersService){}

    @Query()
    async getResearchers(){
        return this.researchersService.findAll();
    }
 

    @Mutation()
    async createResearcher(@Args('input') input: ReseartcherInput){
        return this.researchersService.createResearcher(input);
    }
}
