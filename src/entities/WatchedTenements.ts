import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { GlobalTenements } from './GlobalTenements';

@Entity("WatchedTenements")
export class WatchedTenements {

    @PrimaryGeneratedColumn("uuid")
    public watchId: String;

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
    public watchStartDate: Date;

    @Column("timestamp", {
        default: () => `now()`,
        name: "watch_last_update",  
        nullable: true,
    })
    public watchLastUpdate: Date;

    @ManyToOne(()=> GlobalTenements, tenement => tenement.tenementId)
    public tenement: GlobalTenements;
}