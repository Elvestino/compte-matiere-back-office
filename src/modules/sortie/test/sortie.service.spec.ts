import { Test, TestingModule } from '@nestjs/testing';
import { SortieService } from '../service/sortie.service';

describe('SortieService', () => {
  let service: SortieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SortieService],
    }).compile();

    service = module.get<SortieService>(SortieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
