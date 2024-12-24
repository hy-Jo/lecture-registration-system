import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LectureService } from '../service/lecture.service';
import { Lecture } from '../../../common/entity/lecture.entity';


@Controller('lectures')
export class LectureController {
    constructor(private readonly lectureService: LectureService) {}

    @Post(':id/enroll')
    async enrollLecture(
        @Param('id') lectureId: number,
        @Body('userId') userId: number
    ): Promise<void> {
        await this.lectureService.enrollLecture(userId, lectureId);
    }
}