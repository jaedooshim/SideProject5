import { Module } from '@nestjs/common';
import { SnsService } from './sns.service';
import { SnsController } from './sns.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [SnsService],
  controllers: [SnsController],
})
export class SnsModule {}
