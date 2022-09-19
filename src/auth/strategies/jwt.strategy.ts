import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtModuleOptions } from '../../config/jwt.config';
import { JwtPayloadInterface } from '../jwt-payload.interface';
import { User } from '../../users/models/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtModuleOptions.secret,
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<User> {
    const { username } = payload;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
