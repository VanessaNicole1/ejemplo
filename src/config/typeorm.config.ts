import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserSubscriber } from '../subscribers/user.subscriber';

import * as config from 'config';

const dbConfig = config.get('database');
/**
 * Database configuration
 */
export const typeOrmConfig : TypeOrmModuleOptions = {

    type : dbConfig.type,
    host :  dbConfig.host,
    port :  dbConfig.port,
    username:  dbConfig.username,
    password:  dbConfig.password,
    database:  dbConfig.name,
    entities : [
        User
    ],
    synchronize: dbConfig.synchronize,
    subscribers: [
        UserSubscriber
    ]
};