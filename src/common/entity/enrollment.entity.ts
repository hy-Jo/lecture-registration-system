import { Entity, PrimaryGeneratedColumn, Column, Unique, Index } from 'typeorm';


@Entity()
export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    lectureId: number;

    @Column()
    enrollmentDate: Date;

    @Unique(['userId', 'lectureId'])
    @Index()
    userLectureIndex: string;
}