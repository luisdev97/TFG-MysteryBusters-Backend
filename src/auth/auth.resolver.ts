import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginArgs } from './types/Auth.args';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {

    constructor(private readonly authService: AuthService){}

    @Mutation()
    async login(@Args('input') input: LoginArgs){
        return this.authService.login(input);
    }
}
