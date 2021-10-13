import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Length } from 'class-validator'

// Issue here when Test is passed in directly. 
// Module export might have something to do with typescript. 
@Entity("Test")
export class Test {

    @PrimaryGeneratedColumn("uuid")
    Id: String;

    @Column("varchar", {
        name: "Email", 
        length: 120, 
        unique: true,
        nullable: false
    })
    email: String;

    @Column("varchar", {
        name: 'password',
        length: 100, 
        nullable: false
    })
    @Length(8, 100)
    password: String

    @Column("boolean", {
        name: "registered", 
        default: false, 
        nullable: false,
    })
    registered: Boolean;
}