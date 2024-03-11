import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor(private configService: ConfigService) {}

  async hash(data: string): Promise<string> {
    return hash(data + this.configService.get<string>('PASSWORD_SECRET_KEY'), 12);
  }

  async compare(reqPassword: string, hashPassword: string): Promise<boolean> {
    return compare(reqPassword + this.configService.get<string>('PASSWORD_SECRET_KEY'), hashPassword);
  }
}
