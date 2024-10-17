import { Prisma } from '@prisma/client';

export class BookModel implements Prisma.BookCreateInput {
  code: string;
  title: string;
  author: string;
  stock: number;
}
