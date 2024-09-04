import { AuthenticationService } from './authentication.service';
import { Hash } from 'src/common/hash';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { jwtConstants } from 'src/utility/constants';

@Module({
  controllers: [],
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthenticationService, Hash],
  exports: [AuthenticationService, Hash],
})
export class AuthenticationModule {}
