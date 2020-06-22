import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';

import { UploadImageInput } from './input/upload-image.input';
import { UploadImageUtils } from '../utils/upload-image.utils';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserUtils } from '../utils/user.utils';

@Injectable()
export class UploadImageService {
    
    constructor(
        private userRepository: UserRepository,
        private uploadImageUtils : UploadImageUtils
    ){}
    
    /**
     * Uses the addCustomNameFileToImage method of the 
     * UploadImageUtils utils to name the image, also
     * uses the updateUserPhoto method of the UserService
     * to add image for the user.
     * @param uploadImageInput Fields that are necessary to
     *  upload the image, these are in UploadImageInput.
     * @param image user image
     */
    async uploadImage(uploadImageInput: UploadImageInput, image: FileUpload, user: User): Promise<Boolean> {
        
        const { id, type } = uploadImageInput;

        UserUtils.verifyCurrentUser(id, user.id);
        
        const newImageName = this.uploadImageUtils.addCustomNameFileToImage(id, type, image);

        if(type.toString() === "users"){
            await this.userRepository.updateUserPhoto(id, newImageName, type);
        }else if(type.toString() === "projects"){
            console.log('Aun se necesita programar esa parte - Modulo Project');
        }
        return true;
    }


}
