import { Enrollment } from "./entrollment.entity";


export interface IEnrollmentsRepository {
  findOne(userId: number, lectureId: number): Promise<Enrollment | null>;
  save(enrollment: Enrollment): Promise<void>;
}