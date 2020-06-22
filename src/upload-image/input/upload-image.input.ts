import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsIn } from "class-validator";

import { UploadImageTypes } from '../upload-image-types.enum';

@InputType()
export class UploadImageInput{

    @IsNotEmpty({
        message:  'El identificador de la persona es necesario'
    })
    @IsNumber({maxDecimalPlaces : 0}, {message: 'Es necesario un numero entero'})
    @Field()
    id : number;

    @IsNotEmpty({
        message: 'Es necesario el tipo de imagen a guardar'
    })
    @IsIn([UploadImageTypes.USERS, UploadImageTypes.PROJECTS], {
        message: 'El tipo de imagen no existe'
    })
    @Field()
    type: UploadImageTypes;

}