import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity("AreaOfInterest")
export class AreaOfInterest {

    @PrimaryGeneratedColumn("uuid")
    public aoiId: String;

    @Column("uuid", {
        name: "owner_id",
        nullable: false
    })
    public ownerId: String;

    @Column("timestamp", {
        default: () => `now()`,
        name: "watch_start_date",  
        nullable: true,
    })
    public creationDate: Date;

    @Column("timestamp", {
        default: () => `now()`,
        name: "last_update",  
        nullable: true,
    })
    public lastUpdate: Date;

    @Column("varchar", {
        length: 120, 
        name: "aoi_jurisdiction", 
        nullable: true,
    })
    public jurisdiction: String;

    @Column("decimal", {
        default: 0.0,
        name: "aoi_area", 
    })
    public area: Number;

    @Column("geometry", {
        name: "aoi_geometry",
        nullable: true,
    })
    public geometry: String;
}