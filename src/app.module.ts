import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Lecturemodule } from './lecture/lecture.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [Lecturemodule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware)
    .forRoutes('lectures');
  }
}
