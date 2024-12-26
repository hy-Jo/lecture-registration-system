import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Lecture } from '../../lecture/entity/lecture.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
@Unique(['userId', 'lectureId']) // 인덱스 설정
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @ManyToOne(() => Lecture, lecture => lecture.id)
  @JoinColumn({ name: 'lectureId' })
  lectureId: Lecture;

  @Column()
  enrollment_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}