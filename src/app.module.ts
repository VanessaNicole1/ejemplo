import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from './auth/auth.module';
import { LoadImageModule } from './load-image/load-image.module';
import { typeOrmConfig } from "./config/typeorm.config";
import { typeOrmConfigLocal } from './config/typeormLocal.config';
import { UploadImageModule } from './upload-image/upload-image.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      uploads : {
        maxFieldSize : 10000000,
        maxFiles : 5,
      },
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    LoadImageModule,
    UploadImageModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
