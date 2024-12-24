import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { Lecture } from './lecture.entity';

@Controller('lectures')
export class LectureController {
    constructor(
        private lectureService: LectureService) {};
    
    @Get()
    findAll(): Promise<Lecture[]> {
        return this.lectureService.findAll();
    }       
      
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Lecture> {
        return this.lectureService.findOne(id); 
    }                     
    @Post()
    Create(@Body() lecture: Lecture){
        return this.lectureService.create(lecture);
    
    }
    @Delete(':id')
    Remove(@Param('id') id: number){
        return this.lectureService.remove(id);
    }
    @Put(':id') 
    Update(@Param('id') id: number, @Body() lecture: Lecture){
         this.lectureService.update(id, lecture);
        return `This action updates a #${id} lecture`;
    }

    // 신청 여부 조회 API
    @Get('enrollment/:id/:userId')
    async checkEnrollment(
        @Param('id') lectureId: number,
        @Param('userId') userId: number
    ): Promise<boolean> {
        return this.lectureService.checkEnrollment(userId, lectureId);
    }

    // 남은 자리 확인 API
    @Get(':id/seat-left')
    async checkSeatLeft(@Param('id') lectureId: number): Promise<number> {
        return this.lectureService.checkSeatLeft(lectureId);
    }

   // 새로운 특강 신청 API
   @Post(':id/enroll')
   async enrollLecture(
       @Param('id') lectureId: number,
       @Body() userId: number
   ): Promise<void> {
       await this.lectureService.enrollLecture(userId, lectureId);
   }
}
