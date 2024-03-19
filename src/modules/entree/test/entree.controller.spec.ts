import { Test, TestingModule } from '@nestjs/testing';
import { EntreeController } from '../controller/entree.controller';
import { EntreeService } from '../service/entree.service';

describe('EntreeController', () => {
  let controller: EntreeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntreeController],
      providers: [EntreeService],
    }).compile();

    controller = module.get<EntreeController>(EntreeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
