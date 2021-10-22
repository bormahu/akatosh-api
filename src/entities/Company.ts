import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity("Company")
export class Company {

    @PrimaryGeneratedColumn("uuid")
    public companyId: String;

    @Column("varchar", {
        length: 100, 
        name: "company_name", 
    })
    public companyName: String;

    @Column("varchar", {
        length: 100,
        name: "company_size", 
    })
    public companySize: String;

    @Column("varchar", {
        length: 100,
        name: "company_location", 
    })
    public companyLocation: String;

    @Column("timestamp", {
        default: () => `now()`,
        name: "company_account_creation_date",
        nullable: false,
    })
    public companyAccountCreationDate: Date;

    @Column("integer",{
        default: 1,
        name: "active_user_accounts",
        nullable: false
    })
    public activeUserAccounts: Number;
}