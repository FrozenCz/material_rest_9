import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/**
 * AuthService
 * sluzba starajici se o operace nad uzivateli
 * @author: Milan Knop@2020
 */
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  sign(payload): string {
    return this.jwtService.sign(payload);
  }
}
