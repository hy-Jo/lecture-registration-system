import { Injectable, Inject } from '@nestjs/common';
import { ILectureRepository } from './lecture.repository';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from '../enrollment/entity/entrollment.entity';
import { User } from '../user/entity/user.entity';
import { Lecture } from './entity/lecture.entity';

@Injectable()
export class LectureService {
  constructor(
    @Inject('ILectureRepository')
    private readonly lectureRepository: ILectureRepository,
    @InjectRepository(Enrollment)
    private enrollmentsRepository: Repository<Enrollment>, // 새로운 리포지토리 추가
    @InjectRepository(User)
    private usersRepository: Repository<User> // User 리포지토리 추가
  ){}

  findAvailableLectures(): Promise<Lecture[]> {    
    return this.lectureRepository.findAvailableLectures();
  }

  findAll(): Promise<Lecture[]> {
    return this.lectureRepository.findAll();
  }

  findOne(id: number): Promise<Lecture> {
    return this.lectureRepository.findOne(id);
  }

  async create(lecture: Lecture): Promise<void> {
    await this.lectureRepository.create(lecture);
  }

  async update(id: number, lecture: Lecture): Promise<void> {
    await this.lectureRepository.update(id, lecture);
  }

  async remove(id: number): Promise<void> {
    await this.lectureRepository.remove(id);
  }

  
}