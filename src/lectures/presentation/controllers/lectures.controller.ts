import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LecturesService } from '../../domain/service/lectures.service';
import { Lecture } from '../../domain/component/entity/lectures.entity';


@Controller('lectures')
export class LecturesController {
    constructor(
        private lectureService: LecturesService) {};
    
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
}
