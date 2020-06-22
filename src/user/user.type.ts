import { ObjectType, Field} from "@nestjs/graphql";
/**
 * Contains all the user fields for GraphQL
 * documentation
 */
@ObjectType('User')
export class UserType{

    @Field()
    id : number;

    @Field({description: 'Nombres completos de la Persona'})
    firstNames : string;
    
    @Field({description: 'Apellidos completos de la Persona'})
    lastNames : string;

    @Field({description: 'Descripción acerca de la Persona'})
    description : string;

    @Field({description: 'Email de acceso de la Persona'})
    email : string;

    @Field({description: 'País de Residencia de la Persona'})
    country: string;

    @Field({description: 'Ciudad de Residencia de la Persona'})
    city: string;

    @Field({
        description: 'Dirección de la Persona',
        nullable: true
    })
    address : string

    @Field({
        description: 'Imagen de Perfil de la Persona',
        nullable: true
    })
    image : string
}