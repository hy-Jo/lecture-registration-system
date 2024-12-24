import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn } from 'typeorm';
import { Lecture } from '../lecture/lecture.entity';

@Entity()
@Unique(['userId', 'lectureId']) // 인덱스 설정
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => Lecture, lecture => lecture.id)
  lectureId: number;

  @CreateDateColumn()
  enrollmentDate: Date;

  @Column({ default: false })
  isSpecial: boolean; // 특강 신청 여부를 나타내는 필드 추가
}