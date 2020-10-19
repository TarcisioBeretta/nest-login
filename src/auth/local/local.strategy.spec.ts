import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';

describe('LocalService', () => {
  let service: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy],
    }).compile();

    service = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
