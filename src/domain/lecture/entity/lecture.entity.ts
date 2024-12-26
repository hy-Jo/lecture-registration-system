import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Lecture {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    lecturer: string;

    @Column()
    date: Date;

    @Column({ default: 30 })
    capacity: number;

    @Column({ default: 0 })
    occupiedSeats: number;
}