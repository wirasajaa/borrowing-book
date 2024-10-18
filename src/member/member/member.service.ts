import { Injectable } from '@nestjs/common';
import { BookService } from '../../book/book/book.service';
import { PrismaService } from '../../prisma/prisma/prisma.service';

@Injectable()
export class MemberService {
  constructor(
    private prismaService: PrismaService,
    private readonly bookService: BookService,
  ) {}

  async memberCheck() {
    let member = await this.prismaService.member.findMany(); //get all member
    const borrowedBook = this.bookService.getBorrowingBook();
    member = member.map((val) => {
      const book = borrowedBook.find((item) => item.member_code == val.code);
      return {
        ...val,
        borrowedBook: book ? book.book_code : null,
      };
    });
    return member;
  }
}
