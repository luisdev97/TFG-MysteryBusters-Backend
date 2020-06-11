import { Resolver, Mutation, Args, Context,Query } from '@nestjs/graphql';
import { LoginArgs } from './types/Auth.args';
import { AuthService } from './auth.service';
import { Researcher } from 'src/researchers/entities/researcher.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Resolver('Auth')
export class AuthResolver {

    constructor(private readonly authService: AuthService){}

    @Query()
    @UseGuards(new AuthGuard())
    me(@Context('researcher') researcher: Researcher){
        return researcher;
    }

    @Mutation()
    async login(@Args('input') input: LoginArgs){
        return this.authService.login(input);
    }
}
