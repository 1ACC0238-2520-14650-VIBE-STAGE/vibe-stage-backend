import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: number;
  id?: number; // Añado 'id' como opcional
  email: string;
  role?: string;
}

interface ValidatedUser {
  id: number;
  email: string;
  role?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'fallback-secret',
    });
  }

  validate(payload: JwtPayload): ValidatedUser {
    return {
      id: payload.id || payload.sub, // Soportar ambos formatos
      email: payload.email,
      role: payload.role,
    };
  }
}
