import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { GlobalTenements } from './GlobalTenements';

@Entity("WatchedTenements")
export class WatchedTenements {

    @PrimaryGeneratedColumn("uuid")
    public watchId: String;

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
        name: "watchLastUpdate",  
        nullable: true,
    })
    public watchLastUpdate: Date;

    @ManyToOne(()=> GlobalTenements, tenement => tenement.tenementId)
    public tenement: GlobalTenements;
}