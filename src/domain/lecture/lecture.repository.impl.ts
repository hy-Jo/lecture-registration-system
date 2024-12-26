import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { ILectureRepository } from './lecture.repository';
import { Lecture } from './entity/lecture.entity';

@Injectable()
export class LectureRepositoryImpl implements ILectureRepository {
  constructor(
    @InjectRepository(Lecture)
    private readonly lecturesRepository: Repository<Lecture>
  ) {}

  findAll(): Promise<Lecture[]> {
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

  findAvailableLectures(): Promise<Lecture[]> {
    return this.lecturesRepository.find({ where: { occupiedSeats: LessThan(30) } });
  }
}