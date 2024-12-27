import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { Lecture } from './entity/lecture.entity';
import { Enrollment } from '../enrollment/entity/entrollment.entity';
import { LectureRepositoryImpl } from './lecture.repository.impl';


@Module({
  imports: [TypeOrmModule.forFeature([Lecture, Enrollment])],
  controllers: [LectureController],
  providers: [
    LectureService,
    {
      provide: 'ILectureRepository',
      useClass: LectureRepositoryImpl,
    },
  ],
})
export class LectureModule {}