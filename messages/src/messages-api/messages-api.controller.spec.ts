import { Test, TestingModule } from '@nestjs/testing';
import { MessagesApiController } from './messages-api.controller';

describe('MessagesApiController', () => {
  let controller: MessagesApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesApiController],
    }).compile();

    controller = module.get<MessagesApiController>(MessagesApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
