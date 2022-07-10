import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {RightsTag} from "../users/config/rights.list";

/**
 * guard kontrolujici zda uzivatel ma prava k akci
 * @class RightsGuard
 * @author Milan Knop
 * @return boolean
 */
@Injectable()
export class RightsGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const rights = this.reflector.get<RightsTag>('RightsAllowed', context.getHandler());

        if (!rights) {
            return false;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.rights) return false;

        return user.rights.some((permission) => permission.tag === rights);
    }

}
