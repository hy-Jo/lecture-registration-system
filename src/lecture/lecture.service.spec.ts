import { Test, TestingModule } from '@nestjs/testing';
<<<<<<<< HEAD:src/domain/lecture/lectures.service.spec.ts
import { LectureService } from './service/lecture.service';

describe('LectureService', () => {
  let service: LectureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectureService],
    }).compile();

    service = module.get<LectureService>(LectureService);
========
import { UsersService } from './lecture.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
>>>>>>>> parent of 70796d6 (패키징 구조 변경 및 lecture 기능 구현):src/lecture/lecture.service.spec.ts
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
