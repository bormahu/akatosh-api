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
        name: "firstName",
        nullable: false,
    })
    public firstName: String;

    @Column("varchar", {
        length: 50,
        name: "lastName",
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
        name: "userCompany",
    })
    public userCompany: String;

    @Column("varchar", {
        length: 60,
        name: "userType",
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
        name: "accountCreation",
        nullable: false,
    })
    public accountCreation: Date;

    @Column("timestamp", {
        default: () => `now()`,
        name: "accountVerified",
        nullable: false,
    })
    public accountVerified: Date;

    @Column("timestamp", {
        default: () => `now()`,
        name: "latestSignin",
        nullable: false,
    })
    public latestSignin: Date;
}