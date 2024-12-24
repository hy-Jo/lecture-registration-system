import { Injectable } from '@nestjs/common';
import { Lecture } from './lecture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Enrollment } from 'src/enrollment/entrollment.entity';


@Injectable()
export class LectureService {
  enrollmentsRepository: any;
  constructor(
    @InjectRepository(Lecture)
    private lecturesRepository: Repository<Lecture>
  ){}

  findAvailableLectures(): Promise<Lecture []> {    
    return this.lecturesRepository.find({ where: { occupiedSeats: LessThan(30) } });
  }


  findAll(): Promise<Lecture []>  {
    return this.lecturesRepository.find();
  }
  findOne(id: number): Promise<Lecture> {
    return this.lecturesRepository.findOneBy({ id });
  }
  async create(lecture: Lecture): Promise<void> {
    await this.lecturesRepository.save(lecture);
  }
  async update(id: number, lecture: Lecture): Promise<void> {
    const existedLecture = await this.lecturesRepository.findOneBy({ id });
    if (existedLecture) {
      await this.lecturesRepository.update(id, lecture);
    }
    
  }
  async remove(id: number): Promise<void> {
    await this.lecturesRepository.delete(id);
  }
  // 새로운 강의 신청 로직
  async enrollLecture(userId: number, lectureId: number): Promise<void> {
    const lecture = await this.lecturesRepository.findOneBy({ id: lectureId });
    
    if (lecture.occupiedSeats >= lecture.capacity) {
      throw new Error('Lecture is full');
    }

    const existingEnrollment = await this.enrollmentsRepository.findOne({
      where: { userId, lectureId }
    });

    if (existingEnrollment) {
      throw new Error('Already enrolled');
    }

    lecture.occupiedSeats += 1;
    await this.lecturesRepository.save(lecture);

    const enrollment = new Enrollment();
    enrollment.userId = userId;
    enrollment.lectureId = lectureId;
    await this.enrollmentsRepository.save(enrollment);
  }

  async checkSeatLeft(lectureId: number): Promise<number> {
    const lecture = await this.lecturesRepository.findOneBy({ id: lectureId });
    if (!lecture) {git
      throw new Error('Lecture not found');
    }
    return lecture.capacity - lecture.occupiedSeats;
  }

  // 신청 여부 조회 로직
  async checkEnrollment(userId: number, lectureId: number): Promise<boolean> {
    const enrollment = await this.enrollmentsRepository.findOne({
      where: { userId, lectureId }
    });
    return !!enrollment;
  }
}
