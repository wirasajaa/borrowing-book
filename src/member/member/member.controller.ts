import { Controller, Get } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('api/member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  async getMember(): Promise<any> {
    return await this.memberService.memberCheck();
  }
}
