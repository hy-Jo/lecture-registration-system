import { Enrollment } from "src/common/entity/enrollment.entity";
import { Lecture } from "src/common/entity/lecture.entity";

export interface ILectureRepository {
    findById(id: number): Promise<Lecture>;
    save(lecture: Lecture): Promise<void>;
    findEnrollment(userId: number, lectureId: number): Promise<Enrollment>;
}