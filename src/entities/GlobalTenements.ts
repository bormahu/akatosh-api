import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Length } from 'class-validator';
import { WatchedTenements } from './WatchedTenements';

@Entity("GlobalTenements")
export class GlobalTenements {

    @PrimaryGeneratedColumn("uuid")
    public tenementId: String;

    @Column("varchar", {
        length: 120, 
        name: "licence", 
        nullable: false
    })
    public licence: String;

    @Column("varchar", {
        length: 120, 
        name: "licenceSpecial", 
        nullable: true,
    })
    public licenceSpecial: String;

    @Column("varchar", {
        length: 120, 
        name: "surveyStatus", 
        nullable: false,
    })
    public surveyStatus: String;

    @Column("varchar", {
        length: 120, 
        name: "tenementStatus", 
        nullable: false,
    })
    public tenementStatus: String;

    @Column("datetime", {
        name: "licenceStartDate",  
        nullable: true,
    })
    public licenceStartDate: Date;

    @Column("datetime", {
        name: "licenceEndDate",  
        nullable: true,
    })
    public licenceEndDate: Date;

    @Column("datetime", {
        name: "licenceGrantDate",  
        nullable: true,
    })
    public licenceGrantDate: Date;

    @Column("varchar", {
        length: 120, 
        name: "primaryTenementHolder", 
        nullable: true,
    })
    public primaryTenementHolder: String;

    @Column("decimal", {
        default: 0.0,
        name: "tenementArea", 
    })
    public tenementArea: Number;

    // geometry column may have to be adjusted to allow for correct support for geometries. 
    @Column("geometry", {
        name: "tenementGeometry",
        nullable: true,
    })
    public tenementGeometry: String;

    @OneToMany(()=> WatchedTenements, watchedTenement => watchedTenement.tenement)
    public watchedTenements: Array<WatchedTenements>;
}