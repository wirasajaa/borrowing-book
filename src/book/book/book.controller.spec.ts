import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { Book } from '@prisma/client';
import { BorrowingBookDto } from './borrowing-book.dto';
import { ReturnBookDto } from './return-book.dto';
import { any, string } from 'joi';

describe('BookController', () => {
  let controller: BookController;
  let bookService: BookService;
  const mockBooksService = {
    borrowingBooks: jest.fn(),
    returnBook: jest.fn(),
    getBooks: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService, PrismaService],
    }).compile();

    controller = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should borrowing book', async () => {
    const mockBookResponse = {
      statusCode: 200,
      message: 'successfully borrowed books.',
    };
    const bookDto = {
      books: ['TW-11'],
      quantity: [1],
      member_penalized: false,
    } as BorrowingBookDto;

    jest
      .spyOn(mockBooksService, 'borrowingBooks')
      .mockReturnValue(mockBookResponse);
    const result = await controller.bookBorrowing(bookDto);

    expect(result).toEqual(mockBookResponse);
  });

  it('should return book', async () => {
    const dateNow = new Date();
    const borrowedDate = new Date('8/12/2024');
    const totalDay = await bookService.countDays(borrowedDate, dateNow);
    await (totalDay > 7 && dateNow.setDate(dateNow.getDate() + 3));

    const mockBookResponse = {
      statusCode: 200,
      message: 'successful book return.',
      data: {
        penalty: true,
        penaltyTimeout: dateNow,
      },
    };
    const bookDto = {
      book_code: 'SHR-1',
      quantity: 1,
      member_code: 'M001',
    } as ReturnBookDto;

    jest
      .spyOn(mockBooksService, 'returnBook')
      .mockReturnValue(mockBookResponse);
    const result = await controller.bookReturn(bookDto);

    expect(result).toEqual(mockBookResponse);
  });

  it('check book', async () => {
    const mockBookResponse = [
      {
        code: 'JK-45',
        title: 'Harry Potter',
        author: 'J.K Rowling',
        stock: 1,
      },
      {
        code: 'SHR-1',
        title: 'A Study in Scarlet',
        author: 'Arthur Conan Doyle',
        stock: 1,
      },
      {
        code: 'TW-11',
        title: 'Twilight',
        author: 'Stephenie Meyer',
        stock: 1,
      },
      {
        code: 'HOB-83',
        title: 'The Hobbit, or There and Back Again',
        author: 'J.R.R. Tolkien',
        stock: 1,
      },
      {
        code: 'NRN-7',
        title: 'The Lion, the Witch and the Wardrobe',
        author: 'C.S. Lewis',
        stock: 1,
      },
    ];

    jest.spyOn(mockBooksService, 'getBooks').mockReturnValue(mockBookResponse);
    const result = await controller.getBooks();

    expect(result).toEqual(mockBookResponse);
  });
});
