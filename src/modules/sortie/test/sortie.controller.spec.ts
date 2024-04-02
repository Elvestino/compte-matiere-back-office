import { Test, TestingModule } from '@nestjs/testing';
import { SortieController } from '../controller/sortie.controller';
import { SortieService } from '../service/sortie.service';

describe('SortieController', () => {
  let controller: SortieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SortieController],
      providers: [SortieService],
    }).compile();

    controller = module.get<SortieController>(SortieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
