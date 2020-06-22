import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GetUser } from '../common/decorators/get-user.decorator';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { UploadImageInput } from './input/upload-image.input';
import { UploadImageService } from './upload-image.service';
import { User } from '../user/user.entity';

/**
 * UploadImage Resolver
 * Contains all GraphQL root types.
 */
@Resolver('UploadImage')
export class UploadImageResolver {
    
    constructor(private uploadImageService : UploadImageService){}
    
    /**
     * Allows to verify if the photo was saved successfully,
     * using uploadImage the  method found in uploadImageService.
     * @param uploadImageInput Fields that are necessary to save the
     * image, these are in UploadImageInput.
     * @param image user image
     */
    @Mutation(returns => Boolean)
    @UseGuards(GqlAuthGuard)
    async addPhoto(
        @Args('uploadImageInput') uploadImageInput : UploadImageInput,
        @Args({ name: 'picture', type: () => GraphQLUpload, nullable: true}) image: FileUpload,
        @GetUser() user : User
    ): Promise<Boolean> {       
        return await this.uploadImageService.uploadImage(uploadImageInput, image, user);
    }

}
