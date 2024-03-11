import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SnsService } from './sns.service';
import { PrismaService } from '../_common/prisma/prisma.service';

@Controller('sns')
export class SnsController {
  constructor(
    private snsService: SnsService,
    private prismaService: PrismaService,
  ) {}

  @Post('send')
  async sendMessage(@Body() body: { phoneNumber: string; message: string }) {
    return await this.snsService.sendMessage(body.phoneNumber, body.message);
  }

  @Get('verify')
  async verifyPassword(@Query('code') query: string) {
    const verifyPassword = await this.prismaService.verifyPhone.findFirst({
      where: { verifyCode: query },
    });

    if (!verifyPassword || verifyPassword.phoneExpired < new Date()) {
      throw new BadRequestException('유효시간이 지났습니다.');
    }
    console.log('인증 코드로 찾은 회원', verifyPassword.phoneNumber);
    const member = await this.prismaService.member.findFirst({
      where: { phoneNumber: verifyPassword.phoneNumber },
    });
    console.log('찾은 회원', member);
    if (!member) throw new BadRequestException('해당 전화번호로 등록된 회원이 없습니다.');

    await this.prismaService.member.update({
      where: { id: member.id },
      data: { isValidPhone: true, verifyPhoneId: verifyPassword.id },
    });

    return { message: '인증이 완료되었습니다.' };
  }
}
