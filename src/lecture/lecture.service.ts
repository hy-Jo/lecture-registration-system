import { Injectable } from '@nestjs/common';
import { Lecture } from './lecture.entity';

@Injectable()
export class LectureService {
  private readonly lectures: Lecture[] = [];

  create(lecture: Lecture) {
    this.lectures.push(lecture);
  }

  findAll(): Lecture[] {
    return this.lectures;
  }

  findOne(id: number): Lecture {
    return this.lectures[id];
  }

  update(id: number, lecture: Lecture) {
    this.lectures[id] = lecture;
  }

  remove(id: number) {
    this.lectures.splice(id, 1);
  }
}
