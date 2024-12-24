import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ILectureRepository } from '../repository/interface/lecture.repository';

@Injectable()
export class LectureService {
    constructor(
        @Inject('ILectureRepository')
        private readonly lectureRepository: ILectureRepository
    ) {}

    async enrollLecture(userId: number, lectureId: number): Promise<void> {
        const lecture = await this.lectureRepository.findById(lectureId);
        
        if (lecture.currentEnrollment >= lecture.capacity) {
            throw new Error('Lecture is full');
        }

        const existingEnrollment = await this.lectureRepository
            .findEnrollment(userId, lectureId);

        if (existingEnrollment) {
            throw new Error('Already enrolled');
        }

        lecture.currentEnrollment += 1;
        await this.lectureRepository.save(lecture);
    }
}
