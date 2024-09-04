import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

@Injectable()
export class Hash {
  private readonly saltRounds: number = 10;

  async encryptPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    const encryptPassword = bcrypt.hashSync(password, salt);
    return encryptPassword;
  }

  async comparePassword(
    password: string,
    existingPassword: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(password, existingPassword);
  }
}
