import { Injectable } from "@nestjs/common";
import { ILectureRepository } from "./interface/lecture.repository";
import { Enrollment } from "src/common/entity/enrollment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Lecture } from "src/common/entity/lecture.entity";
import { Repository } from "typeorm";

// lecture.repository.impl.ts
@Injectable()
export class LectureRepositoryImpl implements ILectureRepository {
    constructor(
        @InjectRepository(Lecture)
        private readonly lectureRepository: Repository<Lecture>
    ) {}
    findEnrollment(userId: number, lectureId: number): Promise<Enrollment> {
        throw new Error("Method not implemented.");
    }

    async findById(id: number): Promise<Lecture> {
        return this.lectureRepository.findOne({
            where: { id },
            lock: { mode: 'pessimistic_write' }
        });
    }

    async save(lecture: Lecture): Promise<void> {
        await this.lectureRepository.save(lecture);
    }
}