import { Lecture } from './lecture.entity';

export interface ILectureRepository {
  findAll(): Promise<Lecture[]>;
  findOne(id: number): Promise<Lecture>;
  create(lecture: Lecture): Promise<void>;
  update(id: number, lecture: Lecture): Promise<void>;
  remove(id: number): Promise<void>;
  findAvailableLectures(): Promise<Lecture[]>;
}