import { ArgsType } from "@nestjs/graphql";

export type loginInput = {
    email: string;
    password: string;
}


@ArgsType()
export class LoginArgs {
    input: loginInput
}