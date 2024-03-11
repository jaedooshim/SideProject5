import { Injectable } from '@nestjs/common';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../_common/prisma/prisma.service';

@Injectable()
export class SnsService {
  private snsClient: SNSClient;

  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');

    console.log(`Access Key ID: ${accessKeyId}`);
    console.log(`Secret Access Key: ${secretAccessKey}`);

    this.snsClient = new SNSClient({
      region: 'ap-northeast-1',
      credentials: { accessKeyId, secretAccessKey },
    });
  }

  async sendMessage(phoneNumber: string, message: string) {
    const verifyPasswordCode = this.verifyCode();
    console.log(verifyPasswordCode);

    await this.prismaService.verifyPhone.create({
      data: {
        phoneNumber,
        verifyCode: verifyPasswordCode,
        phoneExpired: new Date(Date.now() + 180 * 1000),
      },
    });
    const params = {
      Message: message,
      PhoneNumber: '+82' + phoneNumber,
    };

    try {
      const command = new PublishCommand(params);
      const data = await this.snsClient.send(command);
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    return '메세지 전송이 완료되었습니다.';
  }

  verifyCode(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
