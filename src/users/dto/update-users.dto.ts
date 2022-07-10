import {Transform} from 'class-transformer';

export class UpdateUsersDto {
    changes: Change[]
}

class Change {

    @Transform(value => Number(value.value))
    userId: number;

    @Transform(value => Number(value.value))
    unitId: number;
}


