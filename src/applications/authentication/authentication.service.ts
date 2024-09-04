import {
  Context,
  TokenParams,
} from 'src/core/interfaces/token-params.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Hash } from '../../common/hash';
import { JwtService } from '@nestjs/jwt';
import { TempRepository } from 'src/adapters/persistence/repositories/temp.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly hash: Hash,
    private readonly repo: TempRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<TokenParams> {
    const user = await this.repo.findFirst({ where: { email: email } });
    if (!user)
      throw new UnauthorizedException({ error_code: 'invalid_credentials' });

    const { password: encryptedPassword, id, uuid } = user;

    let isInvalidCreds: boolean = false;

    if (!(await this.hash.comparePassword(password, encryptedPassword))) {
      isInvalidCreds = true;
    }

    if (isInvalidCreds)
      throw new UnauthorizedException({ error_code: 'invalid_credentials' });

    return {
      context: Context.login,
      email,
      id,
      uuid,
    };
  }

  async authenticated(params: TokenParams): Promise<{ accessToken: string }> {
    const accessToken = await this.jwtService.sign(params);
    return { accessToken };
  }
}
