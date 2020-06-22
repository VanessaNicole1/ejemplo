import { BadRequestException, InternalServerErrorException, RequestTimeoutException } from '@nestjs/common';
import { createWriteStream  } from 'fs';
import { FileUpload } from 'graphql-upload';

import { ShareUtils } from './share.utils';

export class UploadImageUtils{

    extensionFile: string = "";

    checkImage(image : FileUpload) : boolean{

        if(!image || !image.filename){
            throw new BadRequestException("No se ha seleccionado ninguna imagen, Debe seleccionar una imagen");
        }

        this.extensionFile = this.getExtensionFile(image.filename);        
        let isValidExtension = this.isValidExtensionFile(this.extensionFile);
        
        if(!isValidExtension){
            throw new BadRequestException('Extensión de imagen no válida');
        }
        return true;
    }

    
    getExtensionFile(fileName : string) : string{

        let splitFileName = fileName.split('.');

        return splitFileName[splitFileName.length - 1]; 
    }

    isValidExtensionFile(extensionFile) : boolean{
    
        let validExtensions = ['png', 'jpg', 'gif', 'jpeg'];

        return validExtensions.indexOf(extensionFile) < 0 ? false : true;
    }


    addCustomNameFileToImage(id: number, type: string, image: FileUpload){

        this.checkImage(image);

        let newName = `${id}-${new Date().getMilliseconds()}.${this.extensionFile}`;
        let isFileMoved : any = this.moveFileToServer(type, newName, image);

        if(!isFileMoved){
            throw new RequestTimeoutException("Se agoto el tiempo de espera");
        }

        return newName;
    }

    moveFileToServer(type : string, newNameFile : string, image: FileUpload){

        try{
            //TODO mejorar método de acuerdo a lo visto en TEMP files.
            image.createReadStream().pipe(createWriteStream( ShareUtils.getImagePath(type, newNameFile)))
                                .on('error', (error)=> { console.log('FALLO',error ); return false});

            return true;
            
        }catch(error){
            throw new InternalServerErrorException("Ocurrio algo malo con el server");
        }
    }
}