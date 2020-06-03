import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const RolesKey = 'roles';

export type Role =  'admin' | 'basic'| ' unauthenticated';

export const Roles = (...roles: Role[]): CustomDecorator<string> =>
    SetMetadata(RolesKey, roles);