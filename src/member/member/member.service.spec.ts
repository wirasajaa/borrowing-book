import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './member.service';
import { BookService } from '../../book/book/book.service';
import { PrismaService } from '../../prisma/prisma/prisma.service';

describe('MemberService', () => {
  let service: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberService, BookService, PrismaService],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
