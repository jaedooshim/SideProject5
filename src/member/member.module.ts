import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MemberRepository } from './member.repository';
import { PrismaModule } from '../_common/prisma/prisma.module';
import { BcryptModule } from '../_common/bcrypt/bcrypt.module';
import { JwtModule } from '../_common/jwt/jwt.module';

@Module({
  imports: [PrismaModule, BcryptModule, JwtModule],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
  exports: [MemberService],
})
export class MemberModule {}
