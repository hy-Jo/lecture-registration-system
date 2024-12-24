import { Module } from '@nestjs/common';
import { LecturesController } from './presentation/controllers/lectures.controller';
import { LecturesService } from './domain/service/lectures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './domain/component/entity/lectures.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture])],
  exports: [TypeOrmModule],
  controllers: [LecturesController],
  providers: [LecturesService]
})
export class LecturesModule {}
