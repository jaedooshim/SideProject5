import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPayload } from './types/payload.interface';
import { verify, sign } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService) {}

  sign(member: IPayload): string {
    const { id, email, name } = member;
    return sign({ id, email, name }, this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY')!, {
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN')!,
    });
  }

  verify(accessToken: string): IPayload | string {
    try {
      return verify(accessToken, this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY')!) as IPayload;
    } catch (err) {
      // console.error(err);
      return err.message as string;
    }
  }
}
