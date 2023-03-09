import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Api } from '../api';
export declare class AuthController {
    private api;
    constructor(api: Api);
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
