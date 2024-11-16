import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsApiService } from './notifications-api.service';

describe('NotificationsApiService', () => {
  let service: NotificationsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsApiService],
    }).compile();

    service = module.get<NotificationsApiService>(NotificationsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
