import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity("Company")
export class Company {

    @PrimaryGeneratedColumn("uuid")
    public companyId: String;

    @Column("varchar", {
        length: 100, 
        name: "companyName", 
    })
    public companyName: String;

    @Column("varchar", {
        length: 100,
        name: "companySize", 
    })
    public companySize: String;

    @Column("varchar", {
        length: 100,
        name: "companyLocation", 
    })
    public companyLocation: String;

    @Column("timestamp", {
        default: () => `now()`,
        name: "companyAccountCreationDate",
        nullable: false,
    })
    public companyAccountCreationDate: Date;

    @Column("integer",{
        default: 1,
        name: "activeUserAccounts",
        nullable: false
    })
    public activeUserAccounts: Number;
}