import { Module } from '@nestjs/common';
import { MemberController } from './member/member.controller';
import { MemberService } from './member/member.service';
import { BookService } from 'src/book/book/book.service';

@Module({
  controllers: [MemberController],
  providers: [MemberService, BookService],
})
export class MemberModule {}
