import { Test, TestingModule } from '@nestjs/testing';
import { LecturesController } from '../src/lectures/presentation/controllers/lectures.controller';

describe('LecturesController', () => {
  let controller: LecturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LecturesController],
    }).compile();

    controller = module.get<LecturesController>(LecturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
