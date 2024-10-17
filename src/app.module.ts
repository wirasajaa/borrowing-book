import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { PrismaModule } from './prisma/prisma.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [BookModule, PrismaModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
