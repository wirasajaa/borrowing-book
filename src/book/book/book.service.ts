import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookModel } from './models/book.model';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

const bookBorrowed = ['JK-45', 'TW-11'];

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  sumArray(arr): number {
    return arr.reduce((accumulate, current) => accumulate + current);
  }
  containsAny(arr1, arr2) {
    return arr1.some((item) => arr2.includes(item));
  }

  async getBooks(): Promise<BookModel[]> {
    return this.prismaService.book.findMany();
  }

  async getBooksByCode(code) {
    return this.prismaService.book.findMany({
      where: { code: { in: code } },
    });
  }

  async borrowingBooks(req) {
    let totalBooks = this.sumArray(req.quantity);

    // check total book borrowed
    if (totalBooks > 2 || totalBooks < 1) {
      throw new HttpException(
        'maximum number of books borrowed is 2 and minimum is 1',
        HttpStatus.BAD_REQUEST,
      );
    }

    // check book borrowed by other
    if (this.containsAny(bookBorrowed, req.books)) {
      throw new HttpException(
        'books still borrowed by others.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // check book is exist in database
    let findBooks = await this.getBooksByCode(req.books);
    if (findBooks.length < req.books.length) {
      throw new HttpException(
        'book code does not match.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // check member penalized
    if (req.member_penalized == null) {
      throw new HttpException(
        'member penalized field is required.',
        HttpStatus.BAD_REQUEST,
      );
    } else if (req.member_penalized) {
      throw new HttpException('member is penalized.', HttpStatus.FORBIDDEN);
    }
    return {
      statusCode: 200,
      message: 'successfully borrowed books.',
    };
  }
}
