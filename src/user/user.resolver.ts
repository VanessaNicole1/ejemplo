import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GetUser } from '../common/decorators/get-user.decorator';
import { GqlAuthGuard } from '../common/guards/gql-auth.guard';
import { User } from './user.entity';
import { UpdatePasswordInput } from './input/update-user-password.input';
import { UserService } from './user.service';
import { UserType } from './user.type';
import { UpdateUserInput } from './input/update-user.input';

/**
* User Resolver
 * Contains all GraphQL root types.
 */
@Resolver(of => UserType)
export class UserResolver {

    constructor(private userService : UserService){}

    /**
     * Uses the getUser method of the UserService service
     * to obtain a specific user.
     * @param id user id
     */
    @Query(returns => UserType)
    @UseGuards(GqlAuthGuard)
    user(
        @Args('id') id : number,
        @GetUser() user: User
    ){
        return this.userService.getUser(id, user);
    }

    /**
     * Uses the getUser method of the UserService service
     * to update a specific user.
     * @param id user id
     * @param updateUserInput
     */
    @Mutation(returns => UserType)
    @UseGuards(GqlAuthGuard)
    updateUser(
        @Args('id') id  : number,
        @Args('updateUserInput') updateUserInput : UpdateUserInput,
        @GetUser() user: User 
    ) : Promise<User>{        
        return this.userService.updateUser(id ,updateUserInput, user);
    }

    /**
     * Uses the updateUserPassword method of the UserService
     * service to update a user's password
     * @param id user id
     * @param updatePasswordInput Fields that are necessary to
     * update password user's, these are in UpdatePasswordInput.
     */
    @Mutation(returns => Boolean)
    @UseGuards(GqlAuthGuard)
    updateUserPassword(
        @Args('id') id: number,
        @Args('password') updatePasswordInput : UpdatePasswordInput,
        @GetUser() user: User
    ) : Promise<Boolean>{
        return this.userService.updateUserPassword(id, updatePasswordInput, user);
    }
}
