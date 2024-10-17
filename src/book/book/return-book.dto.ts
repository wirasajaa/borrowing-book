import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReturnBookDto {
  @ApiProperty({
    example: 'SHR-1',
  })
  @IsString()
  @IsNotEmpty()
  book_code: string;

  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 'M001',
  })
  @IsNotEmpty()
  @IsString()
  member_code: string;
}
