import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookModel } from './models/book.model';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ApiBadRequestResponse } from '@nestjs/swagger';

const bookBorrowed = [
  {
    member_code: 'M001',
    book_code: 'SHR-1',
    qty: '1',
    date_borrowed: '8/12/2024', // mm/dd/yyyy
  },
  {
    member_code: 'M002',
    book_code: 'HOB-83',
    qty: '1',
    date_borrowed: '10/11/2024', // mm/dd/yyyy
  },
];

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  sumArray(arr): number {
    return arr.reduce((a, b) => a + b);
  }
  containsAny(arr1, arr2) {
    return arr1.some((item) => arr2.includes(item));
  }
  extractColumn(arr, col) {
    return arr.map((item) => item[col]);
  }
  countDays(from: Date, to: Date) {
    const millisecondsDiff = to.getTime() - from.getTime();
    // return millisecondsDiff;
    return Math.round(millisecondsDiff / (1000 * 3600 * 24));
  }
  getBorrowingBook() {
    return bookBorrowed;
  }

  async getBooks(): Promise<BookModel[]> {
    return this.prismaService.book.findMany();
  }

  async getBooksByCode(code: any) {
    return this.prismaService.book.findMany({
      where: { code: { in: code } },
    });
  }

  async borrowingBooks(req: any) {
    let totalBooks = this.sumArray(req.quantity);
    // check total book borrowed
    if (totalBooks > 2 || totalBooks < 1) {
      throw new HttpException(
        'maximum number of books borrowed is 2 and minimum is 1',
        HttpStatus.BAD_REQUEST,
      );
    }

    // check book borrowed by other
    if (
      this.containsAny(this.extractColumn(bookBorrowed, 'book_code'), req.books)
    ) {
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

  async returnBooks(req) {
    // check member has borrowed some books
    const findMember = await bookBorrowed.find(
      (item) =>
        item.member_code == req.member_code && item.book_code == req.book_code,
    );
    if (findMember == null) {
      throw new HttpException(
        'borrowing data not found.',
        HttpStatus.BAD_REQUEST,
      );
    }

    //check total days
    const dateNow = new Date();
    const borrowedDate = new Date(findMember.date_borrowed);
    const totalDay = this.countDays(borrowedDate, dateNow);
    totalDay > 7 && dateNow.setDate(dateNow.getDate() + 3); // add 3days if greater then 7 days
    return {
      statusCode: 200,
      message: 'successful book return.',
      data: {
        penalty: totalDay > 7,
        penaltyTimeout: totalDay > 7 ? dateNow : null,
      },
    };
  }
}
