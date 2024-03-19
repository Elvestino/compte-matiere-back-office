import { Test, TestingModule } from '@nestjs/testing';
import { QuitusController } from '../controller/quitus.controller';
import { QuitusService } from '../service/quitus.service';

describe('QuitusController', () => {
  let controller: QuitusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuitusController],
      providers: [QuitusService],
    }).compile();

    controller = module.get<QuitusController>(QuitusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
