import { Injectable } from '@nestjs/common';
import { ResearchersService } from 'src/researchers/researchers.service';
import { buildSchemaFromTypeDefinitions } from 'graphql-tools';
import { Researcher } from 'src/researchers/entities/researcher.entity';
import * as jwt from 'jsonwebtoken';

const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {

    constructor(private readonly researcherService: ResearchersService) { }


    private createToken({ id, firstname, lastname, role }: Researcher){
        return jwt.sign({ id, firstname, lastname, role }, 'secret');
    }

    private async comparePassword(inputPassword: string, researcherPassword: string): Promise<boolean> {
        return await bcrypt.compare(inputPassword, researcherPassword);
    }

    async login(input: any) {
        let error: string;
        const researcher = await this.researcherService.findResearcherByEmail(input.email);

        if(!researcher)
            error = "No existe un investigador con ese email";
        else
            this.comparePassword(input.password, researcher.password) 
                ? null 
                : error = "Las claves no coinciden";

        return error ? error : this.createToken(researcher);
    }

}
