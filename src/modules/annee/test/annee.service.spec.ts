import { Test, TestingModule } from '@nestjs/testing';
import { AnneeService } from '../service/annee.service';

describe('AnneeService', () => {
  let service: AnneeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnneeService],
    }).compile();

    service = module.get<AnneeService>(AnneeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
