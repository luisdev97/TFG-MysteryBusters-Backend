import { Injectable } from '@nestjs/common';
import { ResearchersService } from 'src/researchers/researchers.service';
import { buildSchemaFromTypeDefinitions } from 'graphql-tools';
import { Researcher } from 'src/researchers/entities/researcher.entity';
import * as jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {

    constructor(private readonly researcherService: ResearchersService) { }


    private createToken({ id, firstname, lastname, email, role }: Researcher) {
        return jwt.sign({ id, firstname, lastname, email, role }, 'secret');
    }

    private comparePassword(inputPassword: string, researcherPassword: string): Promise<boolean> {
        return bcrypt.compare(inputPassword, researcherPassword);
    }

    async login(input: any) {
        let error: string;
        const researcher = await this.researcherService.findResearcherByEmail(input.email);

        if (!researcher) {
            error = "No existe un investigador con ese email";
        } else {
            const areEqualsPasswords = await this.comparePassword(input.password, researcher.password);
            if (!areEqualsPasswords) {
                error = "Las claves no coinciden"
            }
        }
        
        if (!error) return this.createToken(researcher);
        throw new Error(error);
    }

}
