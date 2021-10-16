import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity("AreaOfInterest")
export class AreaOfInterest {

    @PrimaryGeneratedColumn("uuid")
    aoi_id: String;

    @Column("uuid", {
        name: "owner_id",
        nullable: false
    })
    owner_id: String;

    @Column("timestamp with time zone", {
        name: "watch_start_date",  
        nullable: true,
        default: () => `now()`,
    })
    creation_date: Date;

    @Column("timestamp with time zone", {
        name: "last_update",  
        nullable: true,
        default: () => `now()`,
    })
    last_update: Date;

    @Column("varchar", {
        name: "aoi_jurisdiction", 
        length: 120, 
        nullable: true,
    })
    jurisdiction: String;

    @Column("decimal", {
        name: "aoi_area", 
        default: 0.0,
    })
    area: Number;

    @Column("polygon", {
        name: "aoi_geometry",
        nullable: true,
    })
    geometry: Object;
}