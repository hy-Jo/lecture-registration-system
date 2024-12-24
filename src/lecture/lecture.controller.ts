import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateLectureDto } from './CreateLectureDto';
import { LectureService } from './lecture.service';
import { Lecture } from './lecture.entity';

@Controller('lectures')
export class LectureController {
    constructor(private readonly lectureService: LectureService) {

    }
    @Get()
    findAll() : Lecture[] {
        return this.lectureService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) : string {
        return `This action returns ${id} lecture`;
    }

    @Post()
    Create(@Body() CreateLectureDto: Lecture){
        return this.lectureService.create(CreateLectureDto);
    
    }

    @Put(':id')
    Update(@Param('id') id: string, @Body() UpdateLectureDto: CreateLectureDto){
        return `This action updates ${id} lecture`;
    }

    @Delete(':id')
    Remove(@Param('id') id: string){
        return `This action removes ${id} lecture`;
    }


}
