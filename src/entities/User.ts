'use strict'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Length } from 'class-validator'

@Entity("User")
export class User{

    @PrimaryGeneratedColumn("uuid")
    user_id: String;

    @Column("varchar", {
        name: "username", 
        length: 50, 
        unique: true,
        nullable: false
    })
    username: String;

    @Column("varchar", {
        name: "first_name",
        length: 50,
        nullable: false,
    })
    first_name: String;

    @Column("varchar", {
        name: "last_name",
        length: 50,
        nullable: false,
    })
    last_name: String;

    @Column("varchar", {
        name: "email",
        length: 100,
        unique: true,
        nullable: false,
    })
    email: String;

    @Column("varchar", {
        name: "password",
        length: 100, 
        nullable: false
    })
    @Length(8, 100)
    password: String

    @Column("varchar", {
        name: "user_company",
        length: 60,
    })
    user_company: String;

    @Column("varchar", {
        name: "user_type",
        length: 60,
    })
    user_type: String;

    @Column("boolean", {
        name: "verified", 
        default: false, 
        nullable: false,
    })
    verified: Boolean;

    @Column("timestamp with time zone", {
        name: "account_creation",
        default: () => `now()`,
        nullable: false,
    })
    account_creation: Date;

    @Column("timestamp with time zone", {
        name: "account_verified",
        default: () => `now()`,
        nullable: false,
    })
    account_verified: Date;

    @Column("timestamp with time zone", {
        name: "latest_signin",
        default: () => `now()`,
        nullable: false,
    })
    latest_signin: Date;
}