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
        name: "licence_special", 
        nullable: true,
    })
    public licenceSpecial: String;

    @Column("varchar", {
        length: 120, 
        name: "survey_status", 
        nullable: false,
    })
    public surveyStatus: String;

    @Column("varchar", {
        length: 120, 
        name: "tenement_status", 
        nullable: false,
    })
    public tenementStatus: String;

    @Column("datetime", {
        name: "licence_start_date",  
        nullable: true,
    })
    public licenceStartDate: Date;

    @Column("datetime", {
        name: "licence_end_date",  
        nullable: true,
    })
    public licenceEndDate: Date;

    @Column("datetime", {
        name: "licence_grant_date",  
        nullable: true,
    })
    public licenceGrantDate: Date;

    @Column("varchar", {
        length: 120, 
        name: "primary_tenement_holder", 
        nullable: true,
    })
    public primaryTenementHolder: String;

    @Column("decimal", {
        default: 0.0,
        name: "tenement_area", 
    })
    public tenementArea: Number;

    // geometry column may have to be adjusted to allow for correct support for geometries. 
    @Column("geometry", {
        name: "tenement_geometry",
        nullable: true,
    })
    public tenementGeometry: String;

    @OneToMany(()=> WatchedTenements, watchedTenement => watchedTenement.tenement)
    public watchedTenements: Array<WatchedTenements>;
}