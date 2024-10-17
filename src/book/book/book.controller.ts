import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookModel } from './models/book.model';

@Controller('api/book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async bookBorrowing(@Body() req): Promise<any> {
    return this.bookService.borrowingBooks(req);
  }
  @Post('return')
  async bookReturn(@Body() req): Promise<any> {
    return this.bookService.returnBooks(req);
  }
}
