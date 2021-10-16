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
    aoi_creation_date: Date;

    @Column("timestamp with time zone", {
        name: "watch_last_update",  
        nullable: true,
        default: () => `now()`,
    })
    aoi_last_update: Date;

    @Column("varchar", {
        name: "aoi_jurisdiction", 
        length: 120, 
        nullable: true,
    })
    aoi_jurisdiction: String;

    @Column("decimal", {
        name: "aoi_area", 
        default: 0.0,
    })
    aoi_area: Number;

    @Column("polygon", {
        name: "aoi_geometry",
        nullable: true,
    })
    aoi_geometry: Object;
}