import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserSubscriber } from '../subscribers/user.subscriber';

/**
 * Allows import and export all files for build User.
 */
@Module({
    imports : [
        TypeOrmModule.forFeature([UserRepository]),
    ],
    providers: [
        UserResolver,
        UserService,
        UserSubscriber,
    ],
    exports: [
        TypeOrmModule
    ]
})
export class UserModule {}

