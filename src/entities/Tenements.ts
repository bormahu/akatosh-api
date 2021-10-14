import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Length } from 'class-validator'

@Entity("Tenements")
export class Tenements {



    @PrimaryGeneratedColumn("uuid")
    tenement_id: String;

    @Column("varchar", {
        name: "licence", 
        length: 120, 
        nullable: false
    })
    licence: String;

    @Column("varchar", {
        name: "licence_special", 
        length: 120, 
        nullable: true,
    })
    licence_special: String;

    @Column("varchar", {
        name: "survey_status", 
        length: 120, 
        nullable: false,
    })
    survey_status: String;

    @Column("varchar", {
        name: "tenement_status", 
        length: 120, 
        nullable: false,
    })
    tenement_status: String;

    @Column("timestamp", {
        name: "licnece_start_date",  
        nullable: true,
    })
    licence_start_date: Date;

    @Column("timestamp", {
        name: "licence_end_date",  
        nullable: true,
    })
    licence_end_date: Date;

    @Column("timestamp", {
        name: "licence_grant_date",  
        nullable: true,
    })
    licence_grant_date: Date;

    @Column("varchar", {
        name: "primary_tenement_holder", 
        length: 120, 
        nullable: true,
    })
    primary_tenement_holder: String;

    @Column("decimal", {
        name: "tenement_area", 
        default: 0.0,
    })
    tenement_area: Number;

    // geometry column may have to be adjusted to allow for correct support for geometries. 
    @Column("geometry", {
        name: "tenement_geometry",
        nullable: true,
    })
    tenement_geometry: Object;
}