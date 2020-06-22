import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdatePasswordInput } from './input/update-user-password.input';
import { UpdateUserInput } from './input/update-user.input';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

/**
 * User Service
 */
@Injectable()
export class UserService {
      
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository
    ){}
        
    /**
     * Uses the getUser method of the
     * UserRepository repository to get a specific user.
     * @param id user id
     */
    async getUser(id: number, user : User) : Promise<User> {
        let currentUser = await this.userRepository.getUser(id, user); 
        //TODO improve this part to return the specific URL.
        currentUser.image = `localhost:4000/api/users/${user.image}`;
        return user;
    }

    
    /**
     * Uses the updateUser method of the
     * UserRepository repository to update a existing user.
     * @param id user id
     * @param updateUserInput 
     */
    async updateUser(id: number, updateUserInput: UpdateUserInput, user: User): Promise<User> {
        return await this.userRepository.updateUser(id, updateUserInput, user);
    }

    async updateUserPassword(id: number, updatePasswordInput: UpdatePasswordInput, user: User): Promise<Boolean> {
        return await this.userRepository.updateUserPassword(id, updatePasswordInput, user);
    }
}
