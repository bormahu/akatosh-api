import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity("AreaOfInterest")
export class AreaOfInterest {

    @PrimaryGeneratedColumn("uuid")
    public aoiId: String;

    @Column("varchar", {
        length: 255,
        name: "ownerId",
        nullable: false
    })
    public ownerId: String;

    @Column("timestamp", {
        default: () => `now()`,
        name: "watchStartDate",  
        nullable: true,
    })
    public watchStartDate: Date;

    @Column("timestamp", {
        default: () => `now()`,
        name: "lastUpdate",  
        nullable: true,
    })
    public lastUpdate: Date;

    @Column("varchar", {
        length: 120, 
        name: "aoiJurisdiction", 
        nullable: true,
    })
    public aoiJurisdiction: String;

    @Column("decimal", {
        default: 0.0,
        name: "aoiArea", 
    })
    public aoiArea: Number;

    @Column("geometry", {
        name: "aoiGeometry",
        nullable: true,
    })
    public aoiGeometry: String;
}