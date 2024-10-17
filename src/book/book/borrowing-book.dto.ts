import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BorrowingBookDto {
  @ApiProperty({
    example: ['TW-11'],
  })
  @IsNotEmpty()
  @IsString()
  books: string[];

  @ApiProperty({
    example: [1],
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number[];

  @ApiProperty({
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  member_penalized: boolean;
}
