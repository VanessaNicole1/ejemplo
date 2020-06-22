import { Module } from '@nestjs/common';

import { UploadImageResolver } from './upload-image.resolver';
import { UploadImageService } from './upload-image.service';
import { UploadImageUtils } from '../utils/upload-image.utils';
import { UserModule } from '../user/user.module';

/**
 * Allows import and export all files for build UploadImage.
 */
@Module({
  imports : [
    UserModule
  ],
  providers: [
    UploadImageResolver,
    UploadImageService, 
    UploadImageUtils   
  ]
})
export class UploadImageModule {}
