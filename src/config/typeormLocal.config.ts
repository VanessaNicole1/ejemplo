import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserSubscriber } from '../subscribers/user.subscriber';

/**
 * Database configuration
 */
export const typeOrmConfigLocal : TypeOrmModuleOptions = {

    type : 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'jcaopsql',
    password: 'psqljcao',
    database: 'portfolio',
    entities : [
        User
    ],
    synchronize:  true,
    subscribers: [
        UserSubscriber
    ]

};