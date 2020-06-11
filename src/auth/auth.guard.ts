import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {

    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context).getContext();
        if (!ctx.headers.authorization) {
            return false;
        }
        ctx.researcher = await this.validateToken(ctx.headers.authorization);
        return true;
    }

    async validateToken(auth: string) {
        const [tokenType, token] = auth.split(" ");
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
        }
        try {
            return await jwt.verify(token, 'secret');;
        } catch (error) {
            throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
        }
    }
}