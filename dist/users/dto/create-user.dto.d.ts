import { AuthCredentialsDto } from "../../auth/dto/auth-credentials.dto";
export declare class CreateUserDto extends AuthCredentialsDto {
    name: string;
    surname: string;
    unitId?: number;
}
