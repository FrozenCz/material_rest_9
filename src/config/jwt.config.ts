import {JwtModuleOptions} from "@nestjs/jwt";

export const jwtModuleOptions: JwtModuleOptions = {
    secret: 'MilanKnop@BP-evMajetku2020devel@uhk.cz',
    signOptions: {
        expiresIn: 3600*24*365,
    }
}
