import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { CreateUserInput } from '../user/input/create-user.input';
import { UpdateUserInput } from '../user/input/update-user.input';
import { User } from '../user/user.entity';

import * as bcrypt from 'bcryptjs';

export class UserUtils{

    
    static verifyCurrentUser(idUserSearch : number, idCurrentUser : number) : boolean{
        
        if(idUserSearch  !== idCurrentUser){
            throw new UnauthorizedException('Solicitud no permitida');
        }
        return true;
    }
    
    /**
     * This method allows you to return a user to either
     * create or update with their respective properties.
     * @param createOrUpdateUserInput 
     */
    static getUser(createOrUpdateUserInput : CreateUserInput | UpdateUserInput) : User {
        
        const { 
            firstNames,
            lastNames,
            description,
            country,
            city,
            address,
        } = createOrUpdateUserInput;

        const user = new User();
    
        if(createOrUpdateUserInput.hasOwnProperty('email')){
            user.email = createOrUpdateUserInput['email'];
            user.password = createOrUpdateUserInput['password'];
        }

        user.firstNames = firstNames;
        user.lastNames = lastNames;
        user.description = description;
        user.country = country;
        user.city = city;
        user.address = address;
      
        return user;
    }


    /**
     * In this method the current user is modified in memory
     * with the new parameters.
     * @param currentUser current user
     * @param updateUser updated user
     */
    static updateCurrentUser(currentUser : User, updateUser : User){
        
        currentUser.firstNames = updateUser.firstNames;
        currentUser.lastNames = updateUser.lastNames;
        currentUser.description = updateUser.description;
        currentUser.country = updateUser.country;
        currentUser.city = updateUser.city;
        currentUser.address = updateUser.address;
        
        return currentUser;
    }

    /**
     * This method allows you to save a user and error message
     * will be sent if the email already exists
     * @param user
     */
    static async tryToSaveUser(user: User){
         
        try{        
            return await user.save();        
        }catch(error){
            
            if(error.code === '23505'){
                throw new ConflictException(`Ese email ya existe`);
            }else{
                throw new InternalServerErrorException(`Ocurrió un error con el servidor`);
            }
        }
    }

    static async encryptPassword(password : string) : Promise<string>{
        return await bcrypt.hash(password, 12);
    }

}