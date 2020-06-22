import { Repository, EntityRepository } from 'typeorm';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

import { AuthCredentialsInput } from '../auth/input/auth-credentials.input';
import { CreateUserInput } from './input/create-user.input';
import { ShareUtils } from '../utils/share.utils';
import { UpdatePasswordInput } from './input/update-user-password.input';
import { UpdateUserInput } from './input/update-user.input';
import { User } from './user.entity';
import { UserUtils } from '../utils/user.utils';

/**
 * User Repository
 * Contains all the methods that directly manipulate
 * the database.
 */
@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    /**
     * Get a specific user from the database
     * @param id  user id
     */
    async getUser(id: number, user: User): Promise<User> {
        
        UserUtils.verifyCurrentUser(id, user.id);

        const currentUser : User = await this.findOne({id});        
        
        if(!currentUser){
            throw new NotFoundException(`El usuario no existe`);
        }
        return currentUser;
    }

    /**
     * Create a new user in the database
     * @param createUserInput Fields that are necessary to
     * create an user, these are in CreateUserInput.
     */
    async createUser(createUserInput: CreateUserInput) : Promise<User>{

        const user = UserUtils.getUser(createUserInput);

        return await UserUtils.tryToSaveUser(user);
    }

    /**
     * Updating an existing database user
     * @param id  user id
     * @param updateUserInput Fields that are necessary to
     * update an user, these are in UpdatePasswordInput.
     */
    async updateUser(id: number, updateUserInput: UpdateUserInput, user : User): Promise<User> {

        let currentUser = await this.getUser(id, user);    

        const updateUser = UserUtils.getUser(updateUserInput);
        
        currentUser = UserUtils.updateCurrentUser(currentUser, updateUser);
        
        return await UserUtils.tryToSaveUser(currentUser);
    }

    /**
     * Update user's password in the database.
     * @param id user id
     * @param updatePasswordInput Fields that are necessary to
     * update password user's, these are in UpdatePasswordInput.
     */
    async updateUserPassword(id: number, updatePasswordInput: UpdatePasswordInput, user : User): Promise<Boolean> {
        
        let currentUser = await this.getUser(id, user);  

        const { password } = updatePasswordInput;
        
        user.password = await UserUtils.encryptPassword(password);

        try{
            return await user.save() ? true : false;
        }catch(error){            
            throw new InternalServerErrorException(`Ocurrió un error con el servidor`);
        }
    }

    /**
     * Update user's image in the database.
     * @param id user id
     * @param imagePath
     */
    async updateUserPhoto(id: number, imagePath : string, type: string){
        
        let currentUser = await this.findOne({id});

        let currentPhoto = currentUser.image;
        
        ShareUtils.deleteIfExistsCurrentImage(type, currentPhoto);
        
        currentUser.image = imagePath;

        return await UserUtils.tryToSaveUser(currentUser);
    }

    async validateUserPassword(authCredentialsInput : AuthCredentialsInput) : Promise<User>{

        const { email, password } = authCredentialsInput;
 
        const user : User= await this.findOne({email});
        
        if (user && await user.validatePassword(password)){
            return user;
        }else{
            return null;
        }
    }
}