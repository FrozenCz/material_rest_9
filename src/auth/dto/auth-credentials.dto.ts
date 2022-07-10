import {IsString, Matches, MaxLength, MinLength} from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9&_]*$/, {message: 'username must contain only letters and numbers and must be without space'})
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'password must contain lower and upper case letters and at least one number or special character' }
        )
    password: string;
}
