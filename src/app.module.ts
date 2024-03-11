import { Module } from '@nestjs/common';
import { PrismaModule } from './_common/prisma/prisma.module';
import { MemberModule } from './member/member.module';
import { BcryptModule } from './_common/bcrypt/bcrypt.module';
import { JwtModule } from './_common/jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { SnsModule } from './sns/sns.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    MemberModule,
    BcryptModule,
    JwtModule,
    AuthModule,
    SnsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
