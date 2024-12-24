import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecture } from '../component/entity/lectures.entity';

@Injectable()
export class LecturesService {
  constructor(
    @InjectRepository(Lecture)
    private lecturesRepository: Repository<Lecture>
  ){}

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

  

}
