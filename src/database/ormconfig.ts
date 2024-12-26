import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Enrollment } from 'src/domain/enrollment/entity/entrollment.entity';
import { Lecture } from 'src/domain/lecture/entity/lecture.entity';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [Lecture, Enrollment],
  synchronize: true, // Don't use this in production
};

export default ormconfig;