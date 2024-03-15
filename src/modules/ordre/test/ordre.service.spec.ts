import { Test, TestingModule } from '@nestjs/testing';
import { OrdreService } from '../service/ordre.service';

describe('OrdreService', () => {
  let service: OrdreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdreService],
    }).compile();

    service = module.get<OrdreService>(OrdreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
