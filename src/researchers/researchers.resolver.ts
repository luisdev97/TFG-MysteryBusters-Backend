import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ResearchersService } from './researchers.service';
import { ReseartcherInput } from './inputs/ResearcherInput';
import { Researcher } from './entities/researcher.entity';

@Resolver('Researcher')
export class ResearchersResolver {

    constructor(private readonly researchersService: ResearchersService){}

    @Query(returns => [Researcher])
    async getResearchers(){
        return this.researchersService.findAll();
    }

    @Query(returns => Researcher)
    async getResearcher(@Args('id') id: number){
        return this.researchersService.findOneById(id);
    }

    @Mutation()
    async createResearcher(@Args('input') input: ReseartcherInput){
        return this.researchersService.createResearcher(input);
    }


}
