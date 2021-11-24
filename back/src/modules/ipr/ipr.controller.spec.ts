import { Test, TestingModule } from '@nestjs/testing';
import { IprController } from './ipr.controller';

describe('IprController', () => {
  let controller: IprController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IprController],
    }).compile();

    controller = module.get<IprController>(IprController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
