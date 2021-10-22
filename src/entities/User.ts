'use strict'

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Length } from 'class-validator';

@Entity("User")
export class User{

    @PrimaryGeneratedColumn("uuid")
    public userId: String;

    @Column("varchar", {
        length: 50, 
        name: "username", 
        nullable: false,
        unique: true,
    })
    public username: String;

    @Column("varchar", {
        length: 50,
        name: "first_name",
        nullable: false,
    })
    public firstName: String;

    @Column("varchar", {
        length: 50,
        name: "last_name",
        nullable: false,
    })
    public lastName: String;

    @Column("varchar", {
        length: 100,
        name: "email",
        nullable: false,
        unique: true,
    })
    public email: String;

    @Column("varchar", {
        length: 100, 
        name: "password",
        nullable: false
    })
    @Length(8, 100)
    public password: String

    @Column("varchar", {
        length: 60,
        name: "user_company",
    })
    public userCompany: String;

    @Column("varchar", {
        length: 60,
        name: "user_type",
    })
    public userType: String;

    @Column("boolean", {
        default: false, 
        name: "verified", 
        nullable: false,
    })
    public verified: Boolean;

    @Column("timestamp", {
        default: () => `now()`,
        name: "account_creation",
        nullable: false,
    })
    public accountCreation: Date;

    @Column("timestamp", {
        default: () => `now()`,
        name: "account_verified",
        nullable: false,
    })
    public accountVerified: Date;

    @Column("timestamp", {
        default: () => `now()`,
        name: "latest_signin",
        nullable: false,
    })
    public latestSignin: Date;
}