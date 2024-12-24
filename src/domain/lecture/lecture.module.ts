import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureController } from './controller/lecture.controller';
import { LectureService } from './service/lecture.service';
import { Lecture } from '../../common/entity/lecture.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Lecture])],
  exports: [TypeOrmModule],
  controllers: [LectureController],
  providers: [LectureService]
})
export class LectureModule {}
