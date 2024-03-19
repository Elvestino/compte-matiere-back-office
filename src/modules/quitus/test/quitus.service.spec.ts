import { Test, TestingModule } from '@nestjs/testing';
import { QuitusService } from '../service/quitus.service';

describe('QuitusService', () => {
  let service: QuitusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuitusService],
    }).compile();

    service = module.get<QuitusService>(QuitusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
