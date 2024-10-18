import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { BookService } from '../../book/book/book.service';
import { MemberService } from './member.service';
import { PrismaService } from '../../prisma/prisma/prisma.service';

describe('MemberController', () => {
  let controller: MemberController;
  const mockMemberService = {
    memberCheck: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [BookService, MemberService, PrismaService],
    }).compile();

    controller = module.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('check member', async () => {
    const mockMemberResponse = [
      {
        code: 'M001',
        name: 'Angga',
        borrowedBook: 'SHR-1',
      },
      {
        code: 'M002',
        name: 'Ferry',
        borrowedBook: 'HOB-83',
      },
      {
        code: 'M003',
        name: 'Putri',
        borrowedBook: null,
      },
    ];

    jest
      .spyOn(mockMemberService, 'memberCheck')
      .mockReturnValue(mockMemberResponse);
    const result = await controller.getMember();

    expect(result).toEqual(mockMemberResponse);
  });
});
