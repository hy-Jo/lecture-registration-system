import { Test, TestingModule } from '@nestjs/testing';
import { LectureService } from './lecture.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lecture } from './lecture.entity';
import { Repository } from 'typeorm';
import { Enrollment } from 'src/enrollment/entrollment.entity';

describe('LectureService', () => {
  let service: LectureService;
  let lecturesRepository: Repository<Lecture>;
  let enrollmentsRepository: Repository<Enrollment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectureService,
        {
          provide: getRepositoryToken(Lecture),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Enrollment),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<LectureService>(LectureService);
    lecturesRepository = module.get<Repository<Lecture>>(getRepositoryToken(Lecture));
    enrollmentsRepository = module.get<Repository<Enrollment>>(getRepositoryToken(Enrollment));
  });

  it.only('should throw error if lecture is full', async () => {
    const lecture = new Lecture();
    lecture.occupiedSeats = 30;
    lecture.capacity = 30;
    jest.spyOn(lecturesRepository, 'findOneBy').mockResolvedValue(lecture);

    await expect(service.enrollLecture(1, 1)).rejects.toThrow('Lecture is full');
  });

  it('should throw error if already enrolled', async () => {
    const lecture = new Lecture();
    lecture.occupiedSeats = 0;
    lecture.capacity = 30;
    jest.spyOn(lecturesRepository, 'findOneBy').mockResolvedValue(lecture);
    jest.spyOn(enrollmentsRepository, 'findOne').mockResolvedValue(new Enrollment());

    await expect(service.enrollLecture(1, 1)).rejects.toThrow('Already enrolled');
  });

  it('should check seat left', async () => {
    const lecture = new Lecture();
    lecture.occupiedSeats = 10;
    lecture.capacity = 30;
    jest.spyOn(lecturesRepository, 'findOneBy').mockResolvedValue(lecture);

    expect(await service.checkSeatLeft(1)).toBe(20);
  });

  it('should throw error if lecture not found when checking seat left', async () => {
    jest.spyOn(lecturesRepository, 'findOneBy').mockResolvedValue(null);

    await expect(service.checkSeatLeft(1)).rejects.toThrow('Lecture not found');
  });

  it('should check enrollment', async () => {
    jest.spyOn(enrollmentsRepository, 'findOne').mockResolvedValue(new Enrollment());

    expect(await service.checkEnrollment(1, 1)).toBe(true);
  });

  it('should return false if not enrolled', async () => {
    jest.spyOn(enrollmentsRepository, 'findOne').mockResolvedValue(null);

    expect(await service.checkEnrollment(1, 1)).toBe(false);
  });
});