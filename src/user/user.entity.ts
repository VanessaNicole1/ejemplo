import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'
import * as bcrypt from 'bcryptjs';
/**
 * User Entity
 * Contains the all properties a user will have.
 */
@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({
        type: "varchar",
        length: 60
    })
    firstNames : string;

    @Column({
        type: "varchar",
        length: 80
    })
    lastNames:  string;

    @Column("varchar")
    password : string;

    @Column("text")
    description : string;

    @Column({
        type: "varchar",
        length: 50,
        unique: true
    })
    email : string;

    @Column({
        type: "varchar",
        length: 30
    })
    country: string;

    @Column({
        type: "varchar",
        length: 30
    })
    city: string;

    @Column({
        type: "varchar",    
        length: 100,
        nullable: true
    })
    address : string

    @Column({
        type: "varchar",    
        nullable: true
    })
    image : string

    async validatePassword(password : string) : Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}