import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity("Company")
export class Company {

    @PrimaryGeneratedColumn("uuid")
    company_id: String;

    @Column("varchar", {
        name: "company_name", 
        length: 100, 
    })
    company_name: String;

    @Column("varchar", {
        name: "company_size", 
        length: 100 
    })
    company_size: String;

    @Column("varchar", {
        name: "company_location", 
        length: 100 
    })
    company_location: String;

    // @Column("varchar", {
    //     name: "company_signup_user_id", 
    //     length: 100,
    //     nullable: false,
    //     unique: true,
    // })
    // company_signup_user_id: String;

    @Column("timestamp", {
        name: "company_account_creation_date",
        default: () => `now()`,
        nullable: false,
    })
    company_account_creation_date: Date;

    @Column("integer",{
        name: "active_user_accounts",
        default: 1,
        nullable: false
    })
    active_user_accounts: Number;
}