import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './common/entity/lecture.entity';
import { LectureModule } from './domain/lecture/lecture.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [Lecture],
      synchronize: true, // Don't use this in production
    }),
    LectureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware)
    .forRoutes('lectures');
  }
}
