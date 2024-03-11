import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MemberModule } from '../member/member.module';
import { BcryptModule } from '../_common/bcrypt/bcrypt.module';
import { JwtModule } from '../_common/jwt/jwt.module';

@Module({
  imports: [MemberModule, BcryptModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
