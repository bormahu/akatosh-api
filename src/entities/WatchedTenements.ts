import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Length } from 'class-validator'

@Entity("WatchedTenements")
export class WatchedTenements {

    @PrimaryGeneratedColumn("uuid")
    watch_id: String;

    @Column("uuid", {
        name: "tenement_id",
        nullable: false
    })
    tenement_id: String;

    @Column("uuid", {
        name: "owner_id",
        nullable: false
    })
    owner_id: String;

    @Column("timestamp", {
        name: "watch_start_date",  
        nullable: true,
        default: () => `now()`,
    })
    watch_start_date: Date;

    @Column("timestamp", {
        name: "watch_last_update",  
        nullable: true,
        default: () => `now()`,
    })
    watch_last_update: Date;
}