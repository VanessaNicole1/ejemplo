import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule} from '@nestjs/passport';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

import * as config from 'config';
const jwtConfig = config.get('jwt');

@Module({
  imports : [
    JwtModule.register({
      secret : process.env.JWT_SECRET || jwtConfig.secret ,
      signOptions : {
        expiresIn : jwtConfig.expiresIn,
      },
    }),
    PassportModule.register({defaultStrategy: 'jwt'}),   
    UserModule
  ],
  providers: [
    AuthResolver,
    AuthService, 
    JwtStrategy,
  ],
  exports: [
    PassportModule,
    JwtStrategy
  ]
})

export class AuthModule {}
