import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { BorrowingBookDto } from './borrowing-book.dto';
import { ReturnBookDto } from './return-book.dto';

@Controller('api/book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getBooks(): Promise<any> {
    return this.bookService.getBooks();
  }

  @Post()
  async bookBorrowing(@Body() req: BorrowingBookDto): Promise<any> {
    return await this.bookService.borrowingBooks(req);
  }
  @Post('return')
  async bookReturn(@Body() req: ReturnBookDto): Promise<any> {
    return this.bookService.returnBooks(req);
  }
}
