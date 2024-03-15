import { Test, TestingModule } from '@nestjs/testing';
import { OrdreController } from '../controller/ordre.controller';
import { OrdreService } from '../service/ordre.service';

describe('OrdreController', () => {
  let controller: OrdreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdreController],
      providers: [OrdreService],
    }).compile();

    controller = module.get<OrdreController>(OrdreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
